import { client } from "@/sanity/sanity";

export interface Slug {
  current: string;
}

export interface Course {
  _id?: string;
  name?: string;
  title?: string;
  category?: string;
  eventDateTime?: string | Date | Array<string | Date>;
  firstDate?: Date | null;

  slug?: Slug;

  image?: {
    alt?: string;
    asset?: unknown;
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

type CacheShape = {
  data: Course[] | null;
  bySlug: Map<string, Course>;
  fetchedAt: number;
};

type FetchResult<T> = { data: T | null; error?: string; isLoading?: boolean };

let __coursesCache: CacheShape = {
  data: null,
  bySlug: new Map(),
  fetchedAt: 0,
};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function toDate(x: string | Date | undefined | null): Date | null {
  if (!x) return null;
  const d = x instanceof Date ? x : new Date(x);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function normalizeCourse(
  course: Course | null | undefined
): Course | null | undefined {
  if (!course) return course;
  const c: Course = { ...course };

  //sort eventDateTime by date ascending
  if (Array.isArray(c.eventDateTime)) {
    const arr = [...c.eventDateTime].map(toDate).filter(Boolean) as Date[];
    arr.sort((a, b) => a.getTime() - b.getTime());
    c.eventDateTime = arr.map((d) => d.toISOString());
  }

  //find firstDate
  const firstISO = Array.isArray(c.eventDateTime)
    ? (c.eventDateTime[0] as string | Date | undefined)
    : c.eventDateTime;
  c.firstDate = toDate(firstISO ?? null);

  return c;
}

export function normalizeArray(
  courses: Course[] = [],
  opts: { dropPast?: boolean } = {}
): Course[] {
  const { dropPast = true } = opts;
  const now = new Date();

  const normalized: Course[] = [];
  for (const raw of courses) {
    const c = normalizeCourse(raw);
    if (!c) continue;
    if (dropPast && c.firstDate && c.firstDate < now) continue;
    normalized.push(c);
  }
  return normalized;
}

function updateCache(courses: Course[] = []): CacheShape {
  const data = normalizeArray(courses, { dropPast: true });
  const bySlug = new Map<string, Course>();
  for (const c of data) {
    const slug = c?.slug?.current;
    if (slug) bySlug.set(slug, c);
  }
  __coursesCache = { data, bySlug, fetchedAt: Date.now() };
  return __coursesCache;
}

export function invalidateCoursesCache(): void {
  __coursesCache = { data: null, bySlug: new Map(), fetchedAt: 0 };
}

function isCacheFresh(): boolean {
  return !!(
    __coursesCache.data && Date.now() - __coursesCache.fetchedAt < CACHE_TTL_MS
  );
}

async function fetchCoursesFromSanity(): Promise<Course[]> {
  const query = `{
    "courses": *[_type == "course"] | order(_createdAt asc)
  }`;

  const res = await client.fetch<{ courses?: Course[] }>(query);
  const fetched = Array.isArray(res?.courses) ? res!.courses! : [];
  return normalizeArray(fetched, { dropPast: true });
}

async function getCourses(prefetched?: Course[]): Promise<Course[]> {
  if (Array.isArray(prefetched)) {
    const normalized = normalizeArray(prefetched, { dropPast: true });
    updateCache(normalized);
    return normalized;
  }
  if (isCacheFresh() && __coursesCache.data) return __coursesCache.data;
  const data = await fetchCoursesFromSanity();
  updateCache(data);
  return data;
}

//check cache, fetch future courses
export const fetchCourses = async (): Promise<FetchResult<Course[]>> => {
  try {
    const data = await getCourses();
    return { data };
  } catch (error) {
    console.error("error fetching courses:", error);
    return { data: null, error: "Kunde inte hämta kurser." };
  }
};

export const fetchCourseBySlug = async (
  slug: string
): Promise<FetchResult<Course>> => {
  if (!slug) return { data: null, error: "no slug provided", isLoading: false };

  try {
    //try cache first
    if (isCacheFresh()) {
      const cached = __coursesCache.bySlug.get(slug);
      if (cached) {
        const detailed = normalizeCourse(cached) as Course;
        return { data: detailed, error: undefined, isLoading: false };
      }
    }

    //sanity fallback
    const query = `*[_type == "course" && slug.current == $slug][0]`;
    const raw = await client.fetch<Course | null>(query, { slug });
    if (!raw)
      return { data: null, error: "Kursen hittades inte", isLoading: false };

    const data = normalizeCourse(raw) as Course;

    //merge cache (only future items are kept by updateCache)
    const newArr =
      isCacheFresh() && Array.isArray(__coursesCache.data)
        ? [...__coursesCache.data]
        : [];
    const idx = newArr.findIndex((c) => c?.slug?.current === slug);
    if (idx >= 0) newArr[idx] = data;
    else newArr.push(data);
    updateCache(newArr);

    return { data, error: undefined, isLoading: false };
  } catch (error) {
    console.error("error fetching course:", error);
    return { data: null, error: "Kunde inte hämta kursen.", isLoading: false };
  }
};

export const fetchEventBySlug = async (
  slug: string
): Promise<FetchResult<Course>> => {
  if (!slug) return { data: null, error: "No slug provided", isLoading: false };

  try {
    const query = `*[_type == "event" && slug.current == $slug][0]`;
    const raw = await client.fetch<Course | null>(query, { slug });
    if (!raw)
      return { data: null, error: "Eventet hittades inte", isLoading: false };

    const data = normalizeCourse(raw) as Course;
    return { data, error: undefined, isLoading: false };
  } catch (error) {
    console.error("error fetching event:", error);
    return { data: null, error: "Kunde inte hämta eventet.", isLoading: false };
  }
};

//return top 5 upcoming courses (prefers cache)
export const fetchUpcomingCourses = async (
  prefetchedCourses?: Course[]
): Promise<FetchResult<Course[]>> => {
  try {
    const courses = await getCourses(prefetchedCourses);
    const sorted = [...courses].sort(
      (a, b) =>
        (a.firstDate?.getTime?.() ?? 0) - (b.firstDate?.getTime?.() ?? 0)
    );
    return { data: sorted.slice(0, 5) };
  } catch (error) {
    console.error("error fetching upcoming courses:", error);
    return { data: null, error: "Kunde inte hämta kommande kurser." };
  }
};

//fetch courses with only one date
export const filterSingleDateCourses = (courses: Course[] = []): Course[] => {
  if (!Array.isArray(courses)) return [];
  return courses.filter(
    (course) =>
      Array.isArray(course?.eventDateTime) && course.eventDateTime.length === 1
  );
};

export type SortByMonthOptions = { grouped?: boolean };

export const sortByMonth = async (
  prefetchedCourses?: Course[],
  options: SortByMonthOptions = { grouped: true }
): Promise<Record<string, Course[]> | Course[]> => {
  const courses = await getCourses(prefetchedCourses);

  const normalized = courses.map((event) => {
    const raw = Array.isArray(event.eventDateTime)
      ? event.eventDateTime[0]
      : event.eventDateTime;
    const d = event.firstDate ?? toDate(raw) ?? new Date();
    return { ...event, eventDateTime: d };
  }) as Array<Course & { eventDateTime: Date }>;

  if (options && options.grouped === false) {
    const toKey = (d: Date) =>
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return normalized.sort(
      (a, b) => toKey(a.eventDateTime as Date) - toKey(b.eventDateTime as Date)
    );
  }

  return groupByMonth(normalized);
};

export const sortCoursesByMonthFlat = async (
  prefetchedCourses?: Course[]
): Promise<Course[]> =>
  sortByMonth(prefetchedCourses, { grouped: false }) as Promise<Course[]>;

export function groupByMonth(
  events: Array<
    Course & { eventDateTime: Date | string | Array<string | Date> }
  > = []
): Record<string, Course[]> {
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    month: "long",
    year: "numeric",
  });
  type MonthGroup = { label: string; events: Course[] };
  const monthGroups = new Map<number, MonthGroup>(); //key: YYYYMM

  for (const ev of events) {
    let d: Date | null;

    if (ev?.eventDateTime instanceof Date) {
      d = ev.eventDateTime;
    } else if (Array.isArray(ev?.eventDateTime)) {
      d = toDate(ev.eventDateTime[0] as string | Date);
    } else {
      d = toDate(ev?.eventDateTime as string | Date | undefined);
    }
    if (!d) continue;

    const ym = d.getFullYear() * 100 + (d.getMonth() + 1);
    const label = fmt.format(d).toLowerCase();

    if (!monthGroups.has(ym)) monthGroups.set(ym, { label, events: [] });
    monthGroups.get(ym)!.events.push({ ...ev, eventDateTime: d });
  }

  //sort events within each monthGroup
  for (const entry of Array.from(monthGroups.values())) {
    entry.events.sort((a, b) => {
      const da = toDate(
        Array.isArray(a.eventDateTime)
          ? (a.eventDateTime[0] as any)
          : (a.eventDateTime as any)
      )!;
      const db = toDate(
        Array.isArray(b.eventDateTime)
          ? (b.eventDateTime[0] as any)
          : (b.eventDateTime as any)
      )!;
      return da.getTime() - db.getTime();
    });
  }

  //sort monthGroups by YYYYMM ascending
  const sorted = Array.from(monthGroups.entries()).sort((a, b) => a[0] - b[0]);

  const result: Record<string, Course[]> = {};
  for (const [, { label, events: arr }] of sorted) {
    result[label] = arr;
  }
  return result;
}

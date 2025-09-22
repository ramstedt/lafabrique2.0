import { client } from '@/sanity/sanity';

let __coursesCache = { data: null, bySlug: new Map(), fetchedAt: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000;

function normalizeCourse(course) {
  if (!course) return course;
  const c = { ...course };
  if (Array.isArray(c.eventDateTime)) {
    c.eventDateTime = [...c.eventDateTime].sort(
      (a, b) => new Date(a) - new Date(b)
    );
  }
  const firstISO = Array.isArray(c.eventDateTime)
    ? c.eventDateTime[0]
    : c.eventDateTime;
  c.firstDate = firstISO ? new Date(firstISO) : null;
  return c;
}

function normalizeArray(courses = [], { dropPast = true } = {}) {
  const now = new Date();
  const normalized = [];
  for (const raw of courses || []) {
    const c = normalizeCourse(raw);
    if (dropPast && c.firstDate && c.firstDate < now) continue;
    normalized.push(c);
  }
  return normalized;
}

function updateCache(courses = []) {
  const data = normalizeArray(courses, { dropPast: true });
  const bySlug = new Map();
  for (const c of data) {
    const slug = c?.slug?.current;
    if (slug) bySlug.set(slug, c);
  }
  __coursesCache = { data, bySlug, fetchedAt: Date.now() };
  return __coursesCache;
}

export function invalidateCoursesCache() {
  __coursesCache = { data: null, bySlug: new Map(), fetchedAt: 0 };
}

function isCacheFresh() {
  return (
    __coursesCache.data && Date.now() - __coursesCache.fetchedAt < CACHE_TTL_MS
  );
}

async function fetchCoursesFromSanity() {
  const query = `{
    "courses": *[_type == "course"] | order(_createdAt asc)
  }`;
  const res = await client.fetch(query);
  const fetched = Array.isArray(res?.courses) ? res.courses : [];
  return normalizeArray(fetched, { dropPast: true });
}

async function getCourses(prefetched) {
  if (Array.isArray(prefetched)) {
    const normalized = normalizeArray(prefetched, { dropPast: true });
    updateCache(normalized);
    return normalized;
  }
  if (isCacheFresh()) return __coursesCache.data;
  const data = await fetchCoursesFromSanity();
  updateCache(data);
  return data;
}

//only fetch courses that are in the future
export const fetchCourses = async () => {
  try {
    const data = await getCourses();
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const fetchCourseBySlug = async (slug) => {
  if (!slug) return { data: null, error: 'No slug provided', isLoading: false };

  try {
    if (isCacheFresh()) {
      const cached = __coursesCache.bySlug.get(slug);
      if (cached) {
        const detailed = normalizeCourse(cached);
        return { data: detailed, error: null, isLoading: false };
      }
    }

    //fetch slug
    const query = `*[_type == "course" && slug.current == $slug][0]`;
    const raw = await client.fetch(query, { slug });
    if (!raw)
      return { data: null, error: 'Kursen hittades inte', isLoading: false };
    const data = normalizeCourse(raw);

    const newArr =
      isCacheFresh() && Array.isArray(__coursesCache.data)
        ? [...__coursesCache.data]
        : [];
    const idx = newArr.findIndex((c) => c?.slug?.current === slug);
    if (idx >= 0) newArr[idx] = data;
    else newArr.push(data);
    updateCache(newArr);

    return { data, error: null, isLoading: false };
  } catch (error) {
    console.error('Error fetching course:', error);
    return { data: null, error: 'Kunde inte hämta kursen.', isLoading: false };
  }
};

export const fetchEventBySlug = async (slug) => {
  if (!slug) return { data: null, error: 'No slug provided', isLoading: false };

  try {
    const query = `*[_type == "event" && slug.current == $slug][0]`;
    const raw = await client.fetch(query, { slug });
    if (!raw)
      return { data: null, error: 'Eventet hittades inte', isLoading: false };

    const data = normalizeCourse(raw); // reuse date sorting
    return { data, error: null, isLoading: false };
  } catch (error) {
    console.error('Error fetching event:', error);
    return { data: null, error: 'Kunde inte hämta eventet.', isLoading: false };
  }
};

//fetch the earliest 5 upcoming courses
export const fetchUpcomingCourses = async (prefetchedCourses) => {
  try {
    const courses = await getCourses(prefetchedCourses);
    const sorted = [...courses].sort(
      (a, b) => (a.firstDate || 0) - (b.firstDate || 0)
    );
    return { data: sorted.slice(0, 5) };
  } catch (error) {
    console.error('Error fetching upcoming courses:', error);
    return { data: null };
  }
};

//fetch courses with only one date
export const filterSingleDateCourses = (courses = []) => {
  if (!Array.isArray(courses)) return [];
  return courses.filter(
    (course) =>
      Array.isArray(course?.eventDateTime) && course.eventDateTime.length === 1
  );
};

export const sortByMonth = async (
  prefetchedCourses,
  options = { grouped: true }
) => {
  const courses = await getCourses(prefetchedCourses);

  const normalized = courses.map((event) => ({
    ...event,
    eventDateTime:
      event.firstDate ||
      new Date(
        Array.isArray(event.eventDateTime)
          ? event.eventDateTime[0]
          : event.eventDateTime
      ),
  }));

  if (options && options.grouped === false) {
    const toKey = (d) =>
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return normalized.sort(
      (a, b) => toKey(a.eventDateTime) - toKey(b.eventDateTime)
    );
  }

  //'september 2025' etc.
  return groupByMonth(normalized);
};

export const sortCoursesByMonthFlat = async (prefetchedCourses) =>
  sortByMonth(prefetchedCourses, { grouped: false });

export function groupByMonth(events = []) {
  const fmt = new Intl.DateTimeFormat('sv-SE', {
    month: 'long',
    year: 'numeric',
  });
  const buckets = new Map();

  for (const ev of events) {
    let d = ev?.eventDateTime;
    if (!(d instanceof Date)) {
      if (Array.isArray(d) && d.length > 0) d = new Date(d[0]);
      else d = new Date(d);
    }
    if (Number.isNaN(d?.getTime?.())) continue;

    const ym = d.getFullYear() * 100 + (d.getMonth() + 1);
    const label = fmt.format(d);

    if (!buckets.has(ym)) buckets.set(ym, { label, events: [] });
    buckets.get(ym).events.push({ ...ev, eventDateTime: d });
  }

  for (const entry of buckets.values()) {
    entry.events.sort((a, b) => a.eventDateTime - b.eventDateTime);
  }

  const sorted = Array.from(buckets.entries()).sort((a, b) => a[0] - b[0]);

  const result = {};
  for (const [, { label, events: arr }] of sorted) {
    result[label.toLowerCase()] = arr;
  }
  return result;
}

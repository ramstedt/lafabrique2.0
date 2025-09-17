import { client } from '@/sanity/sanity';

//will only fetch courses where the earliest date is in the future
export const fetchCourses = async () => {
  try {
    const query = `{
      "courses": *[_type == "course"] | order(_createdAt asc)
    }`;

    const fetch = await client.fetch(query);
    let courses = fetch.courses;

    const now = new Date();
    courses = courses
      .map((course) => {
        if (course.eventDateTime && Array.isArray(course.eventDateTime)) {
          course.eventDateTime = course.eventDateTime.sort(
            (a, b) => new Date(a) - new Date(b)
          );

          const earliestDate = new Date(course.eventDateTime[0]);

          if (earliestDate < now) {
            return null;
          }
        }
        return course;
      })
      .filter((course) => course !== null);

    return { data: courses };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const fetchCourseBySlug = async (slug) => {
  if (!slug) return { data: null, error: 'No slug provided', isLoading: false };

  try {
    const query = `*[_type == "course" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug });

    if (!data) {
      return { data: null, error: 'Kursen hittades inte', isLoading: false };
    }

    if (data.eventDateTime && Array.isArray(data.eventDateTime)) {
      data.eventDateTime = data.eventDateTime.sort(
        (a, b) => new Date(a) - new Date(b)
      );
    }

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
    const data = await client.fetch(query, { slug });

    if (!data) {
      return { data: null, error: 'Eventet hittades inte', isLoading: false };
    }

    if (data.eventDateTime && Array.isArray(data.eventDateTime)) {
      data.eventDateTime = data.eventDateTime.sort(
        (a, b) => new Date(a) - new Date(b)
      );
    }

    return { data, error: null, isLoading: false };
  } catch (error) {
    console.error('Error fetching event:', error);
    return { data: null, error: 'Kunde inte hämta eventet.', isLoading: false };
  }
};

//Fetch the earliest 5 courses
export const fetchUpcomingCourses = async (prefetchedCourses) => {
  try {
    let courses = Array.isArray(prefetchedCourses)
      ? prefetchedCourses
      : (await fetchCourses()).data;

    if (!courses) return { data: [] };

    const sorted = courses.sort(
      (a, b) => new Date(a.eventDateTime[0]) - new Date(b.eventDateTime[0])
    );

    return { data: sorted.slice(0, 5) };
  } catch (error) {
    console.error('Error fetching upcoming courses:', error);
    return { data: null };
  }
};

// Pure filter: keep only courses with exactly one eventDateTime
export const filterSingleDateCourses = (courses = []) => {
  if (!Array.isArray(courses)) return [];
  return courses.filter(
    (course) =>
      Array.isArray(course?.eventDateTime) && course.eventDateTime.length === 1
  );
};

//Fetch courses that only have a single eventDateTime
export const fetchSingleDateCourses = async (prefetchedCourses) => {
  try {
    let courses = Array.isArray(prefetchedCourses)
      ? prefetchedCourses
      : (await fetchCourses()).data;

    if (!courses) return { data: [] };

    return { data: filterSingleDateCourses(courses) };
  } catch (error) {
    console.error('Error fetching single date courses:', error);
    return { data: null };
  }
};

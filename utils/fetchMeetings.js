import { client } from '@/sanity/sanity';

export const fetchMeetings = async () => {
  try {
    const query = `{
      "meetings": *[_type == "meetings"] | order(_createdAt asc)[0],
    }`;

    const meetings = await client.fetch(query);

    return { meetings };
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return { meetings: null };
  }
};

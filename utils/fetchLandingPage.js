import { client } from '@/sanity/sanity';

export const fetchLandingPage = async () => {
  try {
    const query = `{
      "landingPage": *[_type == "landingPage"] | order(_createdAt asc)[0],
    }`;

    const landing = await client.fetch(query);

    return { landing };
  } catch (error) {
    console.error('Error fetching landing:', error);
    return { landing: null };
  }
};

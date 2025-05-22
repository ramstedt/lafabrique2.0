import { client } from '@/sanity/sanity';

export const fetchRentals = async () => {
  try {
    const query = `{
      "rent": *[_type == "rent"] | order(_createdAt asc)[0],
    }`;

    const data = await client.fetch(query);

    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

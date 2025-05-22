import { client } from '@/sanity/sanity';

export const fetchFooter = async () => {
  try {
    const query = `{
      "footer": *[_type == "footer"] | order(_createdAt asc)[0]
    }`;

    const data = await client.fetch(query);

    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

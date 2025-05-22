import { client } from '@/sanity/sanity';

export const fetchArtists = async () => {
  try {
    const query = `{
      "artists": *[_type == "artist"] | order(isTutor desc, _createdAt asc) {
        ...,
        portrait {
          asset->{ _id, url },
          crop,
          hotspot
        }
      },
    }`;

    const data = await client.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

import React from 'react';
import { fetchArtists } from '@/utils/fetchArtists';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function Kreatorer() {
  const { data } = await fetchArtists();

  return (
    <>
      <main>
        {/* <h1>Kreatörer på La Fabrique</h1> */}
        {data.artists.map((artist, key) => {
          return <ArtistCard artist={artist} key={key} direction={key} />;
        })}
      </main>
    </>
  );
}

import React from "react";
import { fetchArtists } from "@/utils/fetchArtists";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import styles from "./kreatorer.module.css";
import Hero from "@/components/Hero/Hero";

export default async function Kreatorer() {
  const { data } = await fetchArtists();

  return (
    <main>
      <Hero src="/images/about.png" alt="alt text" type="image" />
      <div>
        <h1>Om oss</h1>
        <p>
          La Fabrique i Majorna är ett konstnärligt kollektiv och en mötesplats
          för skaparglädje. Vi öppnade dörrarna 2025 i den gamla sytrådsfabriken
          på Karl Johansgatan - en byggnad som bär på både industrihistoria och
          en varm kreativ energi. Bakom La Fabrique står Karin och Cilla, två
          konstnärer med passion för att skapa, dela och inspirera. Tillsammans
          har de byggt en plats där keramik, måleri, teckning och andra uttryck
          får ta form i en miljö som uppmuntrar till gemenskap, nyfikenhet och
          kravlös kreativitet. Hos oss möts både nybörjare och erfarna skapare i
          kurser, workshops och fria ateljépass. La Fabrique är inte bara en
          plats för konst - det är en plats för människor, idéer och berättelser
          att växa. Välkommen att kliva in i fabriken som nu spinner trådar av
          konst, gemenskap och skaparglädje.
        </p>
      </div>
      <div className={styles.wrapper}>
        {data.artists.map((artist, key) => {
          return <ArtistCard artist={artist} key={key} direction={key} />;
        })}
      </div>
    </main>
  );
}

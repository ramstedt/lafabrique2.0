import styles from "./page.module.css";
import Hero from "@/components/Hero/Hero";

import UpcomingCourses from "@/components/UpcomingCourses/UpcomingCourses";

export default async function Home() {
  return (
    <main>
      <Hero
        src="/assets/hero.mp4"
        poster="/assets/hero-poster.jpg"
        title="KONSTKURSER FÖR ALLA"
        subtitle="Kreativ gemenskap i Majorna"
        ctaText="Kurser, workshops, möhippa, företagsevent med mera"
        ctaHref="/kurser"
      />
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2>Vad vi erbjuder</h2>
          Välkommen att bli en del av vårt konstnärliga kollektiv, <br />
          en ateljé i hjärtat av{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          Majorna
          {/* </span> */}. Här möts konstnärer och{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          kreativa själar
          {/* </span>{' '} */}
          för att utforska{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          måleri och keramik
          {/* </span>{' '} */}i en{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          inspirerande miljö
          {/* </span> */}. Vår ateljé är en plats där du kan skapa fritt,{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          hyra arbetsyta {/* </span> */}
          eller delta i{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          kurser och workshops, {/* </span> */} oavsett om du är nybörjare eller
          erfaren. Med en varm och gemenskaplig atmosfär erbjuder vi en{" "}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          kreativ fristad {/* </span>{' '} */}
          där idéer får liv och händerna får arbeta. <br />
        </div>
        <div>
          <ul className={styles.list}>
            <li>Keramikkurser</li>
            <li>Workshops</li>
            <li>Målarkurser</li>
            <li>Teambuilding</li>
            <li>Uthyrning av konstateljé</li>
            <li>Events</li>
            <li>... Och mycket mer!</li>
          </ul>
        </div>
      </div>
      <UpcomingCourses />
    </main>
  );
}

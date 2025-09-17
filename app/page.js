import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchLandingPage } from '@/utils/fetchLandingPage';
import { fetchEvents } from '@/utils/fetchEvents';
import { Dawning_of_a_New_Day } from 'next/font/google';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import InfoCard from '@/components/InfoCard/InfoCard';
import ContentBlock from '@/components/ContentBlock/ContentBlock';
import EventPoster from '@/components/EventPoster/EventPoster';
import Link from 'next/link';
import UpcomingCourses from '@/components/UpcomingCourses/UpcomingCourses';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default async function Home() {
  const { landing } = await fetchLandingPage();
  const { events } = await fetchEvents();

  return (
    <>
      <Hero
        src='/assets/hero.mp4'
        poster='/assets/hero-poster.jpg'
        title='KONSTKURSER FÖR ALLA'
        subtitle='Kreativ gemenskap i Majorna'
        ctaText='Kurser, workshops, möhippa, företagsevent med mera'
        ctaHref='/kurser'
      />
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2>Vad vi erbjuder</h2>
          Välkommen att bli en del av vårt konstnärliga kollektiv, <br />
          en ateljé i hjärtat av{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          Majorna
          {/* </span> */}. Här möts konstnärer och{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          kreativa själar {/* </span>{' '} */}
          för att utforska{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          måleri och keramik {/* </span>{' '} */}i en{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          inspirerande miljö
          {/* </span> */}. Vår ateljé är en plats där du kan skapa fritt,{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          hyra arbetsyta {/* </span> */}
          eller delta i{' '}
          {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
          kurser och workshops, {/* </span> */} oavsett om du är nybörjare eller
          erfaren. Med en varm och gemenskaplig atmosfär erbjuder vi en{' '}
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
      <div className={styles.textBlockWrapper}>
        <div className={styles.textBlock}>
          “Varje barn är en konstnär. Problemet är att förbli en när man blir
          vuxen.” <br />
          <br />
          <div className={styles.name}>- Pablo Picasso</div>
        </div>
      </div>
      <UpcomingCourses />
    </>
  );
}

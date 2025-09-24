import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchCourses } from '@/utils/fetchCourses';
import UpcomingCourses from '@/components/UpcomingCourses/UpcomingCourses';

export default async function Home() {
  const { data: events } = await fetchCourses();
  return (
    <main>
      <Hero
        src='/assets/hero.mp4'
        title='KONSTKURSER FÖR ALLA'
        subtitle='Kreativ gemenskap i Majorna'
        ctaText='Kurser, workshops, möhippa, företagsevent med mera'
        type='video'
      />
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2>Vad vi erbjuder</h2>
          <p>
            Välkommen att bli en del av vårt konstnärliga kollektiv, en ateljé i
            hjärtat av Majorna. Här möts konstnärer och kreativa själar för att
            utforska måleri och keramik i en inspirerande miljö.
            <br />
            Vår ateljé är en plats där du kan skapa fritt, hyra arbetsyta eller
            delta i kurser och workshops, oavsett om du är nybörjare eller
            erfaren. Med en varm och gemenskaplig atmosfär erbjuder vi en
            kreativ fristad där idéer får liv och händerna får arbeta.
          </p>
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
      <UpcomingCourses events={events ?? []} />
    </main>
  );
}

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

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default async function Home() {
  const { landing } = await fetchLandingPage();
  const { events } = await fetchEvents();

  return (
    <>
      <Hero gallery={landing.landingPage.gallery} />
      <p className={styles.intro}>
        Välkommen att bli en del av vårt konstnärliga kollektiv, <br />
        en ateljé i hjärtat av{' '}
        {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
        Majorna
        {/* </span> */}. Här möts konstnärer och{' '}
        {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
        kreativa själar
        {/* </span>{' '} */}
        för att utforska{' '}
        {/* <span className={`${dawning.className} ${styles.dawning}`}> */}
        måleri och keramik
        {/* </span>{' '} */}i en{' '}
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
      </p>
      <div className={styles.infoCardsWrapper}>
        {landing.landingPage?.infoCards?.map((infoCard, key) => (
          <div key={key}>
            <InfoCard
              title={infoCard.title}
              content={infoCard.description}
              image={infoCard.image ? urlFor(infoCard.image.asset) : ''}
              alt={infoCard.alt || 'Image'}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <h2>Events</h2>
          <small>
            Här listas kommande events hos oss. Om du är ute efter kurser och
            workshops, vänligen kika i vår{' '}
            <Link href="/katalog" style={{ textDecoration: 'underline' }}>
              kurskatalog
            </Link>
            !
          </small>
        </div>
        {events?.map((event, key) => (
          <Link href={`/event/${event.slug.current}`}>
            <EventPoster event={event} key={key} />
          </Link>
        ))}
      </div>
      {landing.landingPage?.textBlocks?.map((block, key) => (
        <ContentBlock key={key} landing={block} />
      ))}
    </>
  );
}

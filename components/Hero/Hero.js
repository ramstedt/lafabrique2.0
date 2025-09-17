'use client';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero({
  src = '/assets/hero.mp4',
  poster = '/assets/hero-poster.jpg',
  title = '',
  subtitle = '',
  ctaText = '',
  ctaHref = '#',
}) {
  return (
    <section className={styles.hero} aria-label='Hero'>
      <div className={styles.mediaWrap}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster={poster}
        >
          <source src={src} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className={styles.posterFallback} aria-hidden='true' />
        <div className={styles.overlay} aria-hidden='true' />
      </div>

      {(title || subtitle || ctaText) && (
        <div className={styles.content}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {ctaText && <span className='cta'>{ctaText}</span>}
        </div>
      )}
    </section>
  );
}

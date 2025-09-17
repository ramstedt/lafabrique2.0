'use client';
import Link from 'next/link';

export default function Hero({
  src = '/assets/hero.mp4',
  poster = '/assets/hero-poster.jpg',
  title = '',
  subtitle = '',
  ctaText = '',
  ctaHref = '#',
}) {
  return (
    <section className='hero' aria-label='Hero'>
      <div className='mediaWrap'>
        <video
          className='video'
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
        <div className='posterFallback' aria-hidden='true' />
        <div className='overlay' aria-hidden='true' />
      </div>

      {(title || subtitle || ctaText) && (
        <div className='content'>
          {title && <h1 className='title'>{title}</h1>}
          {subtitle && <p className='subtitle'>{subtitle}</p>}
          {ctaText && (
            <Link href={ctaHref} className='cta'>
              {ctaText}
            </Link>
          )}
        </div>
      )}

      <style jsx>{`
        .hero {
          margin-top: 65px;
          position: relative;
          width: 100%;
          min-height: 60vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          grid-area: 1 / 1 / 2 / 4;
        }
        .mediaWrap {
          position: absolute;
          inset: 0;
        }
        .video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .posterFallback {
          position: absolute;
          inset: 0;
          background-image: url('${'${poster}'}');
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.35)
          );
          pointer-events: none;
        }
        .content {
          position: relative;
          text-align: center;
          padding: 2rem 1rem;
          width: min(100%, 1100px);
          color: var(--secondary-color, #f5f5ef);
        }
        .title {
          margin: 0 0 0.5rem;
          font-family: var(--font-manrope, serif) !important;
          letter-spacing: 0.3rem;
          font-weight: 400;
          font-size: clamp(1.75rem, 4vw, 3rem);
          line-height: 1.1;
          color: var(--black, #1f1918);
          color: #fff;
        }
        .subtitle {
          margin: 0 0 1rem;
          font-family: var(--font-manrope, system-ui);
          font-size: clamp(1rem, 2.4vw, 1.25rem);
          color: #f2f2f2;
        }
        .cta {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          background: var(--accent-color, #d09c96);
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .hero {
            margin-top: 110px
            min-height: 75vh;
          }
        }
        @media (min-width: 1280px) {
          .hero {
            min-height: 88vh;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video {
            display: none;
          }
          .posterFallback {
            opacity: 1;
          }
        }

        .video:not([src]) + .posterFallback,
        .video[paused] + .posterFallback {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

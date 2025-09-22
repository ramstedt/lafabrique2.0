"use client";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero({ src, title, subtitle, ctaText, type, alt }) {
  if (type === "video") {
    return (
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.mediaWrap}>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.posterFallback} aria-hidden="true" />
          <div className={styles.overlay} aria-hidden="true" />
        </div>

        {(title || subtitle || ctaText) && (
          <div className={styles.content}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {ctaText && <span className="cta">{ctaText}</span>}
          </div>
        )}
      </section>
    );
  }
  if (type === "image") {
    return (
      <section className={styles.heroImage} aria-label="Hero">
        <Image src={src} alt={alt} fill />
      </section>
    );
  }
}

'use client';
import { PortableText } from '@portabletext/react';
import styles from './ContentBlock.module.css';
import Link from 'next/link';

export default function ContentBlock({ data }) {
  const components = {
    marks: {
      strong: ({ children }) => (
        <strong className={styles.bold}>{children}</strong>
      ),
      link: ({ value, children }) => (
        <Link href={value?.href} target="_blank" className={styles.link}>
          {children}
        </Link>
      ),
    },
    block: {
      normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    },
  };

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: data.backgroundColor }}
    >
      <PortableText value={data.text} components={components} />
    </div>
  );
}

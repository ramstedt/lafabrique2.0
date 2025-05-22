import { useEffect, useState } from 'react';
import styles from '@/components/_Atoms/BorderWrapper/BorderWrapper.module.css';

export default function BorderWrapper({ className, children }) {
  const borders = [styles.border1, styles.border2, styles.border3];

  const [border, setBorder] = useState('');

  useEffect(() => {
    setBorder(borders[Math.floor(Math.random() * borders.length)]);
  }, []);

  return <div className={`${className} ${border}`}>{children}</div>;
}

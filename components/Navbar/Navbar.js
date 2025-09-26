'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const disableScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev) {
        disableScroll();
      } else {
        enableScroll();
      }
      return !prev;
    });
  };

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  return (
    <>
      <div className={styles.mobileNavbar}>
        <header className={styles.navbar}>
          <div className={styles.container}>
            <Link href='/' className={styles.logo}>
              La Fabrique
            </Link>
            <button className={styles.hamburger} onClick={toggleMenu}>
              <Image
                src='/icons/menuicon.webp'
                alt='open menu'
                width={30}
                height={30}
              />
            </button>
          </div>

          <nav className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
            <button onClick={toggleMenu} className={styles.closeMenu}>
              <Image
                src='/icons/x.webp'
                alt='close menu'
                width={30}
                height={30}
              />
            </button>
            <ul>
              <li className={styles.menuItem}>
                <Link href='/om-oss' onClick={toggleMenu}>
                  Om Oss
                </Link>
                <svg
                  viewBox='0 0 500 150'
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='none'
                    d='M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
       c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'
                  />
                </svg>
              </li>
              <li className={styles.menuItem}>
                <Link href='/hyra' onClick={toggleMenu}>
                  Hyra för skapande
                </Link>
                <svg
                  viewBox='0 0 500 150'
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='none'
                    d='M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
       c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'
                  />
                </svg>
              </li>
              <li className={styles.menuItem}>
                <Link href='/hyra-event' onClick={toggleMenu}>
                  Hyra för Event
                </Link>
                <svg
                  viewBox='0 0 500 150'
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='none'
                    d='M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
       c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'
                  />
                </svg>
              </li>
              <li className={styles.menuItem}>
                <Link href='/katalog' onClick={toggleMenu}>
                  Kurskatalog
                </Link>
                <svg
                  viewBox='0 0 500 150'
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='none'
                    d='M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
       c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'
                  />
                </svg>
              </li>
              <li className={styles.menuItem}>
                <Link href='#kontakt' onClick={toggleMenu}>
                  Kontakt
                </Link>
                <svg
                  viewBox='0 0 500 150'
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='none'
                    d='M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 
       c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'
                  />
                </svg>
              </li>
            </ul>
          </nav>

          {menuOpen && (
            <div className={styles.overlay} onClick={toggleMenu}></div>
          )}
          <div className={styles.line}></div>
        </header>
      </div>
      <div className={styles.desktopNavbar}>
        <header className={styles.navbar}>
          <div className={styles.desktopContainer}>
            <Link href='/' className={styles.logo}>
              La Fabrique
            </Link>
            <nav className={styles.desktopMenu}>
              <ul>
                <li>
                  <Link href='/om-oss'>Om Oss</Link>
                </li>
                <li className={styles.hasDropdown}>
                  <button
                    className={styles.dropdownToggle}
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Hyra
                  </button>
                  <ul className={styles.dropdown} role='menu'>
                    <li role='none'>
                      <Link href='/hyra' role='menuitem'>
                        Hyra för skapande
                      </Link>
                    </li>
                    <li role='none'>
                      <Link href='/hyra-event' role='menuitem'>
                        Hyra för Event
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href='/katalog'>Kurskatalog</Link>
                </li>
                <li>
                  <Link href='#kontakt'>Kontakt</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}

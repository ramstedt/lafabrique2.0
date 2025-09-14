import { Domine, Kumbh_Sans, Manrope } from 'next/font/google';
import './variables.css';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import { fetchFooter } from '@/utils/fetchFooter';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const domine = Domine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-domine',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kumbh-sans',
  display: 'swap',
});

export const metadata = {
  title: 'La Fabrique',
  description:
    'Skapa fritt, hyr arbetsyta eller delta i kurser och workshops, oavsett erfarenhetsnivå. Vi är ett konstnärligt kollektiv i Majorna - en inspirerande ateljé för måleri keramik, och mer. Välkommen till en kreativ gemenskap!',
};

export default async function RootLayout({ children }) {
  const { data } = await fetchFooter();
  return (
    <html lang='sv'>
      <body className={`${domine.variable} ${manrope.variable}`}>
        <Navbar />
        <div className='bgImageWrapper'>
          <Image
            src='/assets/camomile11.svg'
            width={500}
            height={500}
            alt='Camomile flower sketch'
            className='bgImage'
            priority
          />
        </div>
        <main>{children} </main>
        <Footer data={data.footer} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

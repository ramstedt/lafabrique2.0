'use client';
import {
  Pagination,
  Mousewheel,
  A11y,
  Autoplay,
  Navigation,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import './swiperlayout.css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import HeroCard from '../_Molecules/HeroCard/Herocard';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function Hero({ gallery }) {
  return (
    <Swiper
      className="fullRow"
      pagination={{ clickable: true }}
      navigation={false}
      modules={[Pagination, Mousewheel, A11y, Autoplay, Navigation]}
      direction={'horizontal'}
      centeredSlides={true}
      freeMode={true}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
    >
      {gallery &&
        gallery.map((slide, key) => (
          <SwiperSlide key={key}>
            <HeroCard
              buttonText={slide.buttonText || ''}
              textOne={slide.smallText || ''}
              textTwo={slide.largeText || ''}
              mediaUrl={urlFor(slide.image.asset) || ''}
              altText={slide.alt || ''}
              url={slide.url || ''}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', function () {
  const galleryContainer = document.getElementById('gallery-container');
  const totalImages = 10;
  const thumbFolder = '/img/thumbs/';
  const fullFolder = '/img/full/';
  const fileExtension = '.jpg';

  for (let i = 1; i <= totalImages; i++) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const link = document.createElement('a');
    link.href = `${fullFolder}${i}${fileExtension}`;
    link.setAttribute('data-fancybox', 'gallery');
    link.setAttribute('data-caption', `foto ${i}`);

    const img = document.createElement('img');
    img.src = `${thumbFolder}${i}${fileExtension}`;
    img.alt = `Gallery imeges ${i}`;

    link.appendChild(img);
    slide.appendChild(link);
    galleryContainer.appendChild(slide);
  }

  new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: false,
    speed: 800,
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1260: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  Fancybox.bind("[data-fancybox='gallery']", {});
});

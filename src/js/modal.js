const locations = {
  big: {
    title: 'ВЕЛИКИЙ РЕСТОРАН',
    info: `
      <p>290 м², до 120 гостей</p>`,
    text: 'Велика зала з гримеркою, баром, простором для сцени, танців і банкету.',
    capacity: {
      theatre: '100 гостей',
      classroom: '60 гостей',
      conference: '40 гостей',
      uShape: '50 гостей',
      banquet: '80 гостей',
    },
    images: [
      './big/1.jpg',
      './big/2.jpg',
      './big/3.jpg',
      './big/4.jpg',
      './big/5.jpg',
      './big/6.jpg',
    ],
  },
  small: {
    title: 'МАЛИЙ РЕСТОРАН',
    info: `
      <p>180 м², до 60 гостей</p>
    `,
    text: 'Зала з гримеркою, баром, каміном, терасою та зоною для нетворкінгу біля вогнища.',
    capacity: {
      theatre: '60 гостей',
      classroom: '40 гостей',
      conference: '36 гостей',
      uShape: '30 гостей',
      banquet: '50 гостей',
    },
    images: [
      './small/1.jpg',
      './small/2.jpg',
      './small/3.jpg',
      './small/4.jpg',
      './small/5.jpg',
      './small/6.jpg',
    ],
  },
  banquetroom: {
    title: 'БАНКЕТНА КІМНАТА',
    info: `
      <p>50 м², до 25 гостей</p>
    `,
    text: 'Закрита частина ресторану з окремим входом, терасою та зоною для вечірнього багаття.',
    capacity: {
      theatre: '30 гостей',
      classroom: '20 гостей',
      conference: '25 гостей',
      uShape: '15 гостей',
      banquet: '25 гостей',
    },
    images: [
      './banquet/1.jpg',
      './banquet/2.jpg',
      './banquet/3.jpg',
      './banquet/4.jpg',
      './banquet/5.jpg',
      './banquet/6.jpg',
    ],
  },
  lobi: {
    title: 'ЛОБІ ГОТЕЛЮ',
    info: `
      <p>160 м², до 50 гостей</p>
    `,
    text: 'Ми повністю закриваємо крило готелю, щоб нічого не відволікало гостей від події.',
    capacity: {
      theatre: '50 гостей',
      banquet: '30 гостей',
    },
    images: [
      './lobi/1.jpg',
      './lobi/2.jpg',
      './lobi/3.jpg',
      './lobi/4.jpg',
      './lobi/5.jpg',
      './lobi/6.jpg',
    ],
  },
  pool: {
    title: 'БАСЕЙН У ЛІСІ',
    info: `
      <p>площа палуби — 4500 м², до 300 гостей</p>
    `,
    text: 'Великий басейн з видом на річку та ліс, власним баром, екраном для презентацій або кіно.',
    images: [
      './pool/1.jpg',
      './pool/2.jpg',
      './pool/3.jpg',
      './pool/4.jpg',
      './pool/5.jpg',
    ],
  },
  terrasa: {
    title: 'ТЕРАСА НАД ВОДОЮ',
    info: `
      <p>240 м², до 60 гостей</p>
    `,
    text: 'Затишна локація з видом на ліс і річку для естетичних банкетів або для активного відпочинку на каяках, cапах чи катері.',
    capacity: {
      theatre: '40 гостей',
      conference: '25 гостей',
      banquet: '50 гостей',
    },
    images: [
      './terrasa/1.jpg',
      './terrasa/2.jpg',
      './terrasa/3.jpg',
      './terrasa/4.jpg',
    ],
  },
};

const modal = document.getElementById('location-modal');
const slider = modal.querySelector('.slider');
const title = modal.querySelector('.modal-title');
const info = modal.querySelector('.modal-info');
const text = modal.querySelector('.modal-text');
const capacityBlock = modal.querySelector('.modal-capacity');

let currentSlides = [];
let currentIndex = 0;

function layoutNames(layout) {
  const map = {
    theatre: 'Theatre',
    classroom: 'Classroom',
    conference: 'Conference',
    uShape: 'U-shape',
    banquet: 'Banquet',
  };
  return map[layout] || layout;
}

document.querySelectorAll('.btn-location').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.closest('li').dataset.location;
    const data = locations[key];
    if (!data) return;

    title.textContent = data.title;
    info.innerHTML = data.info;
    text.textContent = data.text;

    if (data.capacity) {
      capacityBlock.innerHTML = Object.entries(data.capacity)
        .map(
          ([layout, value]) =>
            `<p><strong>${layoutNames(layout)}:</strong> ${value}</p>`
        )
        .join('');
    } else {
      capacityBlock.innerHTML = '';
    }

    slider.innerHTML = data.images
      .map(
        (src, i) =>
          `<div class="slide ${i === 0 ? 'active' : ''}">
            <img src="${src}" alt="${data.title} фото ${i + 1}" />
          </div>`
      )
      .join('');

    currentSlides = slider.querySelectorAll('.slide');
    currentIndex = 0;

    modal.classList.add('active');

    addSwipeSupport();
  });
});

modal.querySelector('.modal-close').addEventListener('click', () => {
  modal.classList.remove('active');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});

const showSlide = i => {
  currentSlides.forEach(s => s.classList.remove('active'));
  currentSlides[i].classList.add('active');
};

modal.querySelector('.next').addEventListener('click', () => {
  if (!currentSlides.length) return;
  currentIndex = (currentIndex + 1) % currentSlides.length;
  showSlide(currentIndex);
});
modal.querySelector('.prev').addEventListener('click', () => {
  if (!currentSlides.length) return;
  currentIndex =
    (currentIndex - 1 + currentSlides.length) % currentSlides.length;
  showSlide(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % currentSlides.length;
    showSlide(currentIndex);
  }

  if (e.key === 'ArrowLeft') {
    currentIndex =
      (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    showSlide(currentIndex);
  }

  if (e.key === 'Escape') {
    modal.classList.remove('active');
  }
});

function addSwipeSupport() {
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % currentSlides.length;
      } else {
        currentIndex =
          (currentIndex - 1 + currentSlides.length) % currentSlides.length;
      }
      showSlide(currentIndex);
    }
  });
}

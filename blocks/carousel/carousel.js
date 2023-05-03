import {generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const id = generateUUID();
  block.classList.add('slide');
  block.setAttribute('id', id);
  block.setAttribute('data-bs-ride', 'carousel');

  const carouselItems = block.querySelectorAll(':scope > div');
  carouselItems.forEach((carouselItem, index) => {
    carouselItem.classList.add('carousel-item');

    if(index == 0) {
      carouselItem.classList.add('active');
    }

    const carouselItemImages = carouselItem.querySelectorAll('picture');
    carouselItemImages.forEach((carouselItemImage) => {
      carouselItemImage.classList.add('d-block', 'w-100');
    });
  });

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  carouselInner.append(...carouselItems);

  block.innerHTML = `
    <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;
  
  block.prepend(carouselInner);
}

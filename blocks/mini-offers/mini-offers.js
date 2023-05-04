import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.classList.add('row');

  [...block.children].forEach((item) => {
    item.classList.add('col-12', 'col-md-4');

    const row = document.createElement('div');
    row.classList.add('row');

    const title = document.createElement('div');
    title.classList.add('col-12');

    title.append(item.children[0]);

    const image = document.createElement('div');
    image.classList.add('col');

    image.append(item.children[0]);

    const description = document.createElement('div');
    description.classList.add('col');

    description.append(item.children[0]);

    row.append(title);

    if(image.querySelector('picture')) {
      row.append(image);
    }

    row.append(description);

    item.append(row);
  });
}

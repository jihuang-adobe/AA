import { getMetadata } from '../../scripts/lib-franklin.js';
import { generateUUID } from '../../scripts/scripts.js';

function renderBlock(block) {
  const accordionIds = [];

  if(!block.classList.contains('container')) {
    block.classList.add('container');

    [...block.children].forEach((row, rowIndex) => {

      if(rowIndex == 0) {
        row.classList.add('row', 'justify-content-end', 'my-1');

        [...row.children].forEach((col, colIndex) => {
          if(colIndex == 0) {
            col.classList.add('col-3', 'col-md-2', 'col-lg-2', 'd-grid');

            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');

            dropdown.append(...col.children);
            col.append(dropdown);

            const topElement = dropdown.querySelector('p');
            topElement.classList.add('btn', 'btn-sm', 'dropdown-toggle');
            topElement.setAttribute('data-bs-toggle', 'dropdown');
            topElement.setAttribute('aria-expanded', 'false');

            const topUL = dropdown.querySelector('ul');
            topUL.classList.add('dropdown-menu');

            const LIs = dropdown.querySelectorAll('li');
            [...LIs].forEach((li, colIndex) => {
              li.classList.add('dropdown-item');
            });
          } else {
            col.classList.add('col-9', 'col-md-4', 'col-lg-2');
            const colText = col.innerText;
            col.innerHTML = `
              <input type="text" class="form-control form-control-sm" placeholder="${colText}">
            `;
          }
        });
      }

      if(rowIndex == 1) {
        row.classList.add('row', 'my-2', 'pb-2', 'border-bottom');
        row.id = 'accordionnav';

        [...row.children].forEach((col, colIndex) => {
          if(colIndex == 0) {
            col.classList.add('col-12', 'col-md-3', 'col-lg-3');

            const picture = col.querySelector('picture');
            if(picture) {
              picture.querySelector('img').classList.add('img-fluid');

              const anchor = document.createElement('a');
              anchor.href = '/';
              anchor.append(picture);

              col.append(anchor);
            }
          }

          if(colIndex == 1) {
            col.classList.add('col-12', 'col-md-7', 'col-lg-7', 'justify-content-center', 'd-flex');

            const ul = col.querySelector('ul');

            if(ul) {
              ul.classList.add('nav', 'nav-pills');
              
              [...ul.children].forEach((li) => {
                const accordionId = generateUUID();
                accordionIds.push(accordionId);
                const liText = li.innerText;

                const button = document.createElement('button');
                button.classList.add('btn');
                button.type = 'button';
                button.setAttribute('data-bs-toggle', 'collapse');
                button.setAttribute('data-bs-target', '#' + accordionId);
                button.setAttribute('aria-controls', accordionId);
                button.setAttribute('aria-expanded', 'false');
                button.innerText = liText;

                li.innerHTML = '';
                li.append(button);
              });
            }
          }

          if(colIndex == 2) {
            col.classList.add('col-12', 'col-md-2');

            const ul = col.querySelector('ul');

            if(ul) {
              ul.classList.add('nav', 'nav-pills', 'd-flex');

              [...ul.children].forEach((li) => {
                li.classList.add('flex-fill', 'text-center');

                [...li.children].forEach((liItem) => {
                  liItem.classList.add('btn', 'btn-primary');
                });
              });
            }
          }


        });
      }

      if(rowIndex >= 2) {
        row.id = accordionIds.pop();
        row.classList.add('row');
        row.classList.add('accordion-collapse', 'collapse');
        row.setAttribute('data-bs-parent', '#accordionnav');
        row.setAttribute('aria-controls', row.id);
        row.setAttribute('aria-expanded', 'false');

        [...row.children].forEach((col, colIndex) => {
          col.classList.add('col-3');
        });
      }
    });
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navPath = getMetadata('nav');

  if(navPath) {
    const resp = await fetch(`${navPath}.plain.html`);

    if (resp.ok) {
      const header = document.createElement('div');
      header.innerHTML = await resp.text();

      const headerSection = header.querySelector('.header');
      
      renderBlock(headerSection);

      block.innerHTML = '';
      block.append(...headerSection.children);
    }
  } else {
    renderBlock(block);
  }
}
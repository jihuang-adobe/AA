function renderBlock(block) {

  

  [...block.children].forEach((row) => {
    row.classList.add('row', 'position-relative');

    [...row.children].forEach((col, colIndex) => {
      if(colIndex == 0) {
        col.classList.add('col-12', 'col-md-5', 'p-0', 'promotion-left');

        const links = col.querySelectorAll('a');
        [...links].forEach((link) => {
          link.classList.add('btn', 'btn-outline-secondary');
        });
      }
      
      if(colIndex == 1) {
        col.classList.add('col-12', 'col-md-2', 'd-flex', 'flex-wrap', 'align-items-center', 'promotion-middle');

        const image = col.querySelector('img');

        if(image) {
          image.classList.add('img-fluid');
        }
      }

      if(colIndex == 2) {
        col.classList.add('col-12', 'col-md-5', 'promotion-right');
      }
    });
  })
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // if this a promotional block or remote promotional block
  const blockColumnCount = block.querySelector(':scope > div').children.length;

  if(blockColumnCount == 1) {
    // remote promotional block
    const remoteLink = block.querySelector('a');

    if(remoteLink) {
      const resp = await fetch(`${remoteLink.href}.plain.html`);

      if (resp.ok) {
        const header = document.createElement('div');
        header.innerHTML = await resp.text();
  
        const promotionSection = header.querySelector('.promotion');
        
        renderBlock(promotionSection);
  
        block.innerHTML = '';
        block.append(...promotionSection.children);
      }
    }
  }

  if(blockColumnCount == 3) {
    // promotional block
      renderBlock(block);
  }
}
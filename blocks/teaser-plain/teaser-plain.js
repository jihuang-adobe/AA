export default async function decorate(block) {
  block.classList.add('row', 'mt-3');

  [...block.children].forEach((teaser) => {
    const teaserWrapper = document.createElement('div');
    teaserWrapper.innerHTML = `
      <div class="col-12 col-md-6">
        <div class="card p-4">
          <div class="card-body">
            <div class="card-title"></div>
            <div class="card-text"></div>
            <div class="card-links mt-5"></div>
          </div>
        </div>
      </div>
    `;


    const teaserTitle = teaserWrapper.querySelector('.card-title');
    const teaserText = teaserWrapper.querySelector('.card-text');
    const teaserLinks = teaserWrapper.querySelector('.card-links');

    teaserTitle.append(teaser.children[0]);
    teaserText.append(teaser.children[0]);
    teaserLinks.append(teaser.children[0]);

    teaserLinks.querySelectorAll('a').forEach((anchor) => {
      anchor.classList.add('btn', 'btn-outline-primary');
    });
    
    block.append(...teaserWrapper.children);
  });
}
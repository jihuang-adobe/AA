export default async function decorate(block) {
  block.classList.add('container');

  block.children[0].classList.add('row', 'align-items-center', 'bg-primary');

  block.children[0].children[0].classList.add('col-12', 'col-md-8', 'gx-0');
  block.children[0].children[1].classList.add('col-12', 'col-md-4', 'text-light');

  const anchor = block.children[0].children[1].querySelector('a');
  if(anchor) {
    anchor.classList.add('btn', 'btn-light');
    anchor.parentNode.classList.add('d-grid');
  }
}

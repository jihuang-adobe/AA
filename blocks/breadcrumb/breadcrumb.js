export default async function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('breadcrumb-item');
  })
}

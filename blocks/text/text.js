export default async function decorate(block) {
  block.querySelectorAll('h2').forEach((item) => {
    item.classList.add('text-primary');
  });

  block.querySelectorAll('h3').forEach((item) => {
    item.classList.add('text-success');
  });
}

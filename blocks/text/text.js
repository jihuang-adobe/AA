export default async function decorate(block) {
  $(block).find('h2').addClass('text-primary');
  $(block).find('h3').addClass('text-success');
}

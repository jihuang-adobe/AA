export default function decorate(block) {
  $(block).find('h2').addClass('text-primary');
  $(block).find('h3').addClass('text-success');
}

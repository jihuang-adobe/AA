import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default function decorate(block) {
  var templateJSON = {
    'uuid': generateUUID(),
    'items': []
  };

  $(block).find('>div').each(function(){
    templateJSON.items.push({
      'src': $(this).find('picture:first source[type="image/webp"]:first').attr('srcset')
    });
  });


  var template = `
    <div id="{{uuid}}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        {{#each items}}
        <div class="carousel-item">
          <img src="{{this.src}} lazy" class="d-block w-100" alt="{{this.alt}}">
        </div>
        {{/each}}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#{{uuid}}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#{{uuid}}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;

    // initialize
    var DOM = convertToDOM(template, templateJSON);

    $(DOM).find('.carousel-item:first').addClass('active');

    $(block).after(DOM);
}

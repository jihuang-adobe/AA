import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default function decorate(block) {
  var templateJSON = {};

  $(block).find('>div').each(function(){
    templateJSON.image = {
      url: $(this).find('div:nth-child(1) picture:first source[type="image/webp"]:first').attr('srcset')
    };

    // add some classes to the button dom
    $(this).find('.button-container').addClass('d-grid');
    $(this).find('.button-container a.button').addClass('btn btn-light');

    templateJSON.textrawhtml = $(this).find('div:nth-child(2)').html();
  });

  var template = `
    <div class="row align-items-center bg-primary">
      <div class="col-8 gx-0">
        <img class="w-100" src="{{image.url}}" />
      </div>
      <div class="col-4 text-light">
        {{{textrawhtml}}}
      </div>
    </div>
  `;

  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(block).closest('.section').append(DOM);
}

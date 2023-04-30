import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  var templateJSON = {
    items: []
  };

  $(block).find('>div').each(function(){
    var objectJSON = {
      title: $.trim($(this).find('div:nth-child(1)').text()),
      image: {
        url: $(this).find('div:nth-child(2) picture:first source[type="image/webp"]:first').attr('srcset')
      },
      descriptionrawhtml: $(this).find('div:nth-child(3)').html()
    };

    templateJSON.items.push(objectJSON);
  });

  var template = `
    <div class="row my-5">
      {{#each items}}
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col-12">
            <h3>{{title}}</h3>
          </div>
          {{#if image.url}}
          <img class="col" data-src="{{image.url}}" />
          {{/if}}
          <div class="col">
            {{{descriptionrawhtml}}}
          </div>
        </div>
      </div>
      {{/each}}
    </div>
  `;
  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(block).closest('.section').append(DOM);
}

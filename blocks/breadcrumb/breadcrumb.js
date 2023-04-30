import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  var templateJSON = {
    items: []
  };

  $(block).find('>div').each(function(){
    var objectJSON = {
      name: $.trim($(this).text()),
      url: $.trim($(this).find('a:first').attr('href'))
    };

    templateJSON.items.push(objectJSON);
  });

  var template = `
    <nav aria-label="breadcrumb" class="mt-3 mb-5">
      <ol class="breadcrumb">
        {{#each items}}
        <li class="breadcrumb-item">
          {{#if url}}
          <a href="{{url}}">{{name}}</a>
          {{else}}
          {{name}}
          {{/if}}
        </li>
        {{/each}}
      </ol>
    </nav>
  `;
  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(block).closest('.section').append(DOM);
}

import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  var templateJSON = {
    items: []
  };

  $(block).find('>div').each(function(){
    var objectJSON = {
      title: $.trim($(this).find('div:nth-child(1)').text()),
      description: $.trim($(this).find('div:nth-child(2)').text()),
      links: []
    };

    $(this).find('div:nth-child(3) a').each(function(){
      objectJSON.links.push({
        name: $.trim($(this).text()),
        link: $(this).attr('href')
      });
    });

    templateJSON.items.push(objectJSON);
  });

  var template = `
    <div class="row mt-3">
      {{#each items}}
      <div class="col-12 col-md-6">
        <div class="card p-4">
          <div class="card-body">
            <h3 class="card-title">{{title}}</h5>
            <p class="card-text">{{description}}</p>
            {{#each links}}
            <a href="{{link}}" class="btn btn-outline-primary">{{name}}</a>
            {{/each}}
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

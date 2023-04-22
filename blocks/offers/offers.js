import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default function decorate(block) {
  var templateJSON = {
    items: []
  };

  $(block).find('>div').each(function(){
    var offersJSON;

    if($(this).text()) {
      var offersJSONURL = $(this).find('a:first').attr('href');

      // get headless form json
      if(offersJSONURL) {
        offersJSON = JSON.parse($.ajax({
          type: "GET",
          url: offersJSONURL,
          async: false
        }).responseText);

        // turn csv options into array
        $.each(offersJSON.data, function(index){
          var links = this.Links.split('\n');
          var linksArray = [];

          $.each(links, function(){
            var linkNameValue = this.split(';')

            linksArray.push({
              linkname: $.trim(linkNameValue[0]),
              linkurl: $.trim(linkNameValue[1])
            });
          });

          offersJSON.data[index].Links = linksArray;
        });
      }

      templateJSON.items.push(offersJSON);
    }
  });

  console.log(templateJSON);

  var template = `
    <div class="row my-5">
      {{#each items}}
      <div class="col-4">
        <div class="row">
          <div class="col-12">
            <h3>{{title}}</h3>
          </div>
          {{#if image.url}}
          <img class="col" src="{{image.url}}" />
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

import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  var templateJSON = {
    items: []
  };

  $(block).find('>div').each(function(){
    var offersJSON;

    if($(this).text()) {
      var offersJSONURL = $(this).find('a:first').attr('href');
      var filterType = $(this).find('div:nth-child(2)').text();

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

          if(this.Type == filterType) {
            templateJSON.items.push(offersJSON.data[index]);
          }
        });
      }
    }
  });

  var template = `
    <div class="row py-3 my-3 border-top">
      {{#each items}}
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col-12">
            <h3>{{Title}}</h3>
          </div>
          {{#if [Image Urls]}}
          <img class="col-12" data-src="{{[Image Urls]}}" />
          {{/if}}
          <div class="col-12">
            {{[Teaser Text]}}

            {{#each Links}}
            <p>
              <a href="{{linkurl}}" title="{{linkname}}" class="button primary">{{linkname}}</a>
            </p>
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

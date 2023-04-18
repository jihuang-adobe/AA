import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default function decorate(block) {
  var templateJSON = {'items': []};

  $(block).find('>div').each(function(){
    if($(this).text()) {
      var formJSONURL = $(this).find('div:nth-child(2) a').attr('href');
      var formJSON;
      var additionTextDOM = $(this).find('div:nth-child(3)');

    
      // get headless form json
      if(formJSONURL) {
        formJSON = JSON.parse($.ajax({
          type: "GET",
          url: formJSONURL,
          async: false
        }).responseText);
  
        // turn csv options into array
        $.each(formJSON.data, function(index){
          formJSON.data[index].Options = this.Options.split(',');
        });
      }

      // clean crap class that franklin adds
      additionTextDOM.find('.button.primary').attr('class', '');
      additionTextDOM.find('.button-container').addClass('fs-6').addClass('my-1');

      templateJSON.items.push({
        uuid: generateUUID(),
        tabname: $(this).find('div:nth-child(1)').text(),
        formjson: formJSON,
        additionrawhtml: additionTextDOM.html()
      });
    }
  });

  var template = `
    <div class="forms-tabs">
      <ul class="nav nav-tabs nav-justified" role="tablist">
        {{#each items}}
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" role="tab" href="#{{uuid}}">{{this.tabname}}</a>
        </li>
        {{/each}}
      </ul>
      <div class="tab-content">
        {{#each items}}
        <div class="tab-pane fade" role="tabpanel" aria-labelledby="{{uuid}}">
          <form class="row">
            {{#each formjson.data}}
            <div class="col-md-4">
              {{#ifvalue Type equals="submit"}}
                <label class="form-label">&nbsp;</label>
                <button type="{{Type}}" class="form-control btn btn-primary mt-0">{{Label}}</button>
              {{/ifvalue}}
              {{#ifvalue Type equals="text"}}
                <label class="form-label">{{Label}}</label>
                <input type="{{Type}}" class="form-control" placeholder="{{Placeholder}}">
              {{/ifvalue}}
              {{#ifvalue Type equals="date"}}
                <label class="form-label">{{Label}}</label>
                <input type="{{Type}}" class="form-control" placeholder="{{Placeholder}}">
              {{/ifvalue}}              
              {{#ifvalue Type equals="select"}}
                <label class="form-label">{{Label}}</label>
                <select class="form-select"">
                  {{#each Options}}
                  <option selected>{{value}}</option>
                  {{/each}}
                </select>
              {{/ifvalue}}
            </div>
            {{/each}}
          </form>
          {{{additionrawhtml}}}
        </div>
        {{/each}}
      </div>
    </div>
  `;

  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(DOM).find('.nav-item:first').addClass('active');
  $(DOM).find('.tab-pane:first').addClass('active').addClass('show');
  
  $(block).closest('.section').append(DOM);
}

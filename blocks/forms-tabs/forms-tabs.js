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
    <div class="container row justify-content-center position-absolute tabs-forms-absolute">
      <div class="col-10">
        <ul class="nav nav-tabs nav-justified" role="tablist">
          {{#each items}}
          <li class="nav-item bg-light">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#{{uuid}}" type="button" role="tab" aria-controls="{{uuid}}">{{this.tabname}}</button>
          </li>
          {{/each}}
        </ul>
        <div class="tab-content border-bottom bg-white p-3">
          {{#each items}}
          <div class="tab-pane fade" id="{{uuid}}" role="tabpanel">
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
                    {{#ifvalue ../Placeholder equals=this}}
                      <option selected>{{this}}</option>
                    {{else}}
                      <option>{{this}}</option>
                    {{/ifvalue}}
                    {{/each}}
                  </select>
                {{/ifvalue}}
              </div>
              {{/each}}
            </form>
            <div class="row pt-2">
              <div class="col-12">
                {{{additionrawhtml}}}
              </div>
            </div>
          </div>
          {{/each}}
        </div>
      </div>
    </div>
  `;

  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(DOM).find('.nav-item .nav-link:first').addClass('active');
  $(DOM).find('.tab-pane:first').addClass('active').addClass('show');
  
  $(block).after(DOM);
}

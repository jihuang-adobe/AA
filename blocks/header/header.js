import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';
import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    const headerDOM = $.parseHTML(html);

    var templateJSON = {};

    templateJSON.languages = [];

    $(headerDOM).find('.languages > div').each(function(){
      templateJSON.languages.push($.trim($(this).text()));
    });

    templateJSON.search = {
      placeholder: $.trim($(headerDOM).find('.search > div').text())
    };

    templateJSON.logo = {
      url: $(headerDOM).find('.logo picture:first source[type="image/webp"]:first').attr('srcset')
    };

    templateJSON.navigations = [];

    $(headerDOM).find('.navigation > div').each(function(){
      // add some classes to the dom first
      $(this).find('div p a').addClass('text-decoration-none');
      $(this).find('div:nth-child(3) p').addClass('border-bottom pb-1 px-1 mb-1');
      $(this).find('div:nth-child(4) p').addClass('border-bottom pb-1 px-1 mb-1');
      $(this).find('div:nth-child(5) p').addClass('pb-1 px-1 mb-1 text-decoration-none');

      templateJSON.navigations.push({
        uuid: generateUUID(),
        navtitle: $.trim($(this).find('div:nth-child(1)').text()),
        firstcolumnrawhtml: $(this).find('div:nth-child(2)').html(),
        secondcolumnrawhtml: $(this).find('div:nth-child(3)').html(),
        thirdcolumnrawhtml: $(this).find('div:nth-child(4)').html(),
        fourthcolumnrawhtml: $(this).find('div:nth-child(5)').html(),
      });
    });
    
    const template = `
      <div>
        <div class="row my-1">
          <div class="col-9"></div>
          <div class="col-1 d-grid">
            <div class="dropdown">
              <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{#each languages}}
                  {{this}}
                {{/each}}
              </button>
              <ul class="dropdown-menu">
                <li><div class="dropdown-item">STUFF HERE</div></li>
              </ul>
            </div>
          </div>
          <div class="col-2">
            <input type="text" class="form-control form-control-sm" placeholder="{{search.placeholder}}">
          </div>
        </div>
        <div class="row my-2" id="accordionnav">
          <div class="col-3">
            <img src="{{logo.url}}" class="img-fluid" />
          </div>
          <div class="col-1">
          </div>
          <div class="col-6">
            {{#each navigations}}
            <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#{{uuid}}" aria-controls="{{uuid}}" aria-expanded="false">{{navtitle}}</button>
            {{/each}}
          </div>
          <div class="col-1 d-grid">
            <button type="button" class="btn btn-primary">LOGIN</button>
          </div>
          <div class="col-1 d-grid">
            <button type="button" class="btn btn-light">JOIN</button>
          </div>
          {{#each navigations}}
          <div class="col-12 accordion-collapse collapse" data-bs-parent="#accordionnav" id="{{uuid}}">
            <div class="row mt-2 pt-2 border-top">
              <div class="col-3">{{{firstcolumnrawhtml}}}</div>
              <div class="col-3">{{{secondcolumnrawhtml}}}</div>
              <div class="col-3">{{{thirdcolumnrawhtml}}}</div>
              <div class="col-3">{{{fourthcolumnrawhtml}}}</div>
            </div>
          </div>
          {{/each}}
        </div>
      </div>
    `;

    var DOM = convertToDOM(template, templateJSON);

    $(block).append(DOM);
  }
}

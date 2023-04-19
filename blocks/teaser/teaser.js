import { convertToDOM, generateUUID } from '../../scripts/scripts.js';

export default function decorate(block) {
  var templateJSON = {};

  var template = `
    <div class="row">
      <div class="col-8 gx-0">
        <img class="w-100" src="https://www.aa.com/content/images/target/destination-recommender/target-destination-test-cun-desktop.jpg" />
      </div>
      <div class="col-4 bg-primary">
        test
      </div>
    </div>
  `;

  // initialize
  var DOM = convertToDOM(template, templateJSON);

  $(block).closest('.section').append(DOM);
}

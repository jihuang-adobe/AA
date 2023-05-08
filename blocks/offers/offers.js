export default async function decorate(block) {
  const row = block.children[0];

  if(row) {
    const offersJSONNode = row.children[0].querySelector('a');
    const filter = row.children[1].textContent;

    if(offersJSONNode) {
      const response = await fetch(offersJSONNode.href);

      if (response.ok) {
        const offers = await response.json();

        const div = document.createElement('div');
        div.classList.add('row', 'py-3', 'my-3');
  
        offers.data.forEach((offer) => {
          if(offer.Type == filter) {
            const offerMain = document.createElement('div');
            offerMain.classList.add('col-12', 'col-md-4');
            offerMain.innerHTML = `
              <div class="row">
              </div>
            `;
  
            const offerMainRow = offerMain.querySelector('.row');
  
            if(offer.Title) {
              offerMainRow.innerHTML += `
                <div class="col-12">
                  <h3>${offer.Title}</h3>
                </div>
              `;
            } else {
              offerMainRow.innerHTML += `
                <div class="col-12">
                </div>
              `;
            }

            if(offer['Image Urls']) {
              offerMainRow.innerHTML += `
                <img class="col-12 img-fluid" src="${offer['Image Urls']}" />
              `;
            }

            const LinkValuePairs = offer['Links'].split('\n').map(function(item) {
              return item.trim();
            });

            var links = '';
            LinkValuePairs.forEach((LinkValuePair) => {
              const LinkNameValue = LinkValuePair.split(';').map(function(item) {
                return item.trim();
              });

              if(LinkNameValue.length == 2) {
                links += `
                  <p>
                    <a href="${LinkNameValue[1]}" title="${LinkNameValue[0]}" class="button primary">${LinkNameValue[0]}</a>
                  </p>
                `;
              }
            });

            offerMainRow.innerHTML += `
              <div class="col-12">
                ${offer['Teaser Text']}
                ${links}
              </div>
            `;
            
            div.append(offerMain);
          }
        });

        row.innerHTML = '';
        row.append(div);
      };
    }
  }
}

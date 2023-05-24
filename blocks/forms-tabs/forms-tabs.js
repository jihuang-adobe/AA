import {generateUUID } from '../../scripts/scripts.js';

async function renderForm(tabPane) {
  const anchor = tabPane.querySelector('a');
  const response = await fetch(anchor.href);
  anchor.remove();
  
  if(response.ok) {
    const responseJSON =  await response.json();

    const form = document.createElement('form');
    form.classList.add('row', 'mb-3');

    responseJSON.data.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('col-12', 'col-md-4');

      switch (item.Type) {
        case 'submit':
          div.innerHTML = `
            <label class="form-label">&nbsp;</label>
            <button type="${item.Type}" class="form-control btn btn-primary mt-0">${item.Label}</button>
          `;
          break;
        case 'text':
          div.innerHTML = `
            <label class="form-label">${item.Label}</label>
            <input type="${item.Type}" class="form-control" placeholder="${item.Placeholder}">
          `;
          break;
        case 'date':
          div.innerHTML = `
            <label class="form-label">${item.Label}</label>
            <input type="${item.Type}" class="form-control" placeholder="${item.Placeholder}">
          `;
          break;
        case 'select':
          div.innerHTML = `
            <label class="form-label">${item.Label}</label>
            <select class="form-select">
            </select>
          `;

          const select = div.querySelector('select');
          item.Options.split(',').forEach((value) => {
            const option = document.createElement('option');
            option.innerText = value;

            if(item.Placeholder == value) {
              option.setAttribute('active', 'true');
            }

            select.append(option);
          });
          break;
        default:
      }

      form.append(div);
    });

    tabPane.prepend(form);
  }
}

export default async function decorate(block) {
  block.classList.add('container');

  const containingRow = document.createElement('div');
  containingRow.classList.add('row', 'justify-content-center', 'tabs-forms-absolute');

  const tabs = block.children[0];
  const tabPanes = block.children[1];
  const additiontabPanes = block.children[2];

  tabs.classList.add('col-12', 'col-md-10', 'p-0');
  tabPanes.classList.add('tab-content', 'border-bottom', 'bg-white', 'p-3', 'col-12', 'col-md-10');
  additiontabPanes.classList.add('col-12', 'col-md-10');

  const tabsNav = document.createElement('div');
  tabsNav.classList.add('nav', 'nav-tabs', 'nav-justified', 'bg-light');
  tabsNav.append(...tabs.children);
  tabs.append(tabsNav);
  
  [...tabsNav.children].forEach((tab, index) => {
    const id = generateUUID();

    tab.classList.add('nav-item', 'nav-link');
    tab.setAttribute('data-bs-toggle', 'tab');
    tab.setAttribute('data-bs-target', '#' + id);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', id);

    if(index == 0) {
      tab.classList.add('active');
    }
  });

  [...tabPanes.children].forEach((tabPane, index) => {
    tabPane.classList.add('tab-pane', 'fade');
    tabPane.setAttribute('role', 'tabpanel');
    tabPane.setAttribute('id', tabsNav.children[index].getAttribute('aria-controls'));
    tabPane.append(additiontabPanes.children[0]);

    if(index == 0) {
      tabPane.classList.add('active');
      tabPane.classList.add('show');
    }

    renderForm(tabPane);
  });

  containingRow.append(...block.children)

  block.append(containingRow);
}

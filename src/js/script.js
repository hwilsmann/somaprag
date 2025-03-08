function init_global() {
  // Função do Popup
  const open_buttons = document.querySelectorAll('.-open-popup');
  const close_buttons = document.querySelectorAll('.-close-popup');

  open_buttons.forEach(function (button) {
    button.onclick = function (event) {
      event.preventDefault();

      const target = this.getAttribute('data-target');
      const popup = document.getElementById(target);
      if (popup) { popup.classList.add('-open'); }
    }
  });

  close_buttons.forEach(function (button) {
    button.onclick = function () {
      const popup = this.closest('.popup');
      if (popup) { popup.classList.remove('-open'); }
    }
  });

  function open_popup(popup_id) {
    const popup = document.getElementById(popup_id);
    if (popup) { popup.classList.add('-open'); }
  }

  function close_popup(popup_id) {
    const popup = document.getElementById(popup_id);
    if (popup) { popup.classList.remove('-open'); }
  }

  window.open_popup = open_popup;
  window.close_popup = close_popup;

  // Função do Loading
  document.body.classList.add('-loading');

  const hide_loading = () => {
    const loading = document.querySelector('.loading');
    if (loading) {
      loading.classList.add('-hidden');
      loading.addEventListener('transitionend', () => {
        document.body.classList.remove('-loading');
      }, { once: true });
    } else {
      document.body.classList.remove('-loading');
    }
  };

  setTimeout(hide_loading, 1000);

  // Função do Menu
  const menu_wrappers = document.querySelectorAll('.menu-wrapper');
  if (menu_wrappers.length > 0) {
    menu_wrappers.forEach((menu_wrapper) => {
      const button = menu_wrapper.querySelector('#menu');
      if (button) {
        button.addEventListener('click', () => {
          menu_wrapper.classList.toggle('-open');
        });
      }
    });
  }
}

function init_survey() {}

document.addEventListener('DOMContentLoaded', function () {
  init_global();

  const page = document.body.dataset.page;
  if (page === 'survey') {
    init_survey();
  } else if (page === '') {
  } else {
  }
});
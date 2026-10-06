// Legal notices stay on the current landing page, with native dialog focus handling.
(() => {
  document.querySelectorAll('a[href="#privacy"], a[href="#terms"]').forEach(link => {
    const dialog = document.querySelector(link.getAttribute('href'));
    if (!dialog || typeof dialog.showModal !== 'function') return;
    link.addEventListener('click', event => {
      event.preventDefault();
      dialog.showModal();
    });
  });
  document.querySelectorAll('.specialty-legal-dialog').forEach(dialog => {
    dialog.querySelector('[data-close-legal]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });
})();

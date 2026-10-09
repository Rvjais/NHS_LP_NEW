(() => {
  const widget = document.querySelector('.nhs-whatsapp');
  if (!widget) return;
  const launcher = widget.querySelector('.whatsapp-launcher');
  const panel = widget.querySelector('.whatsapp-panel');
  const close = widget.querySelector('.whatsapp-close');
  launcher.setAttribute('role', 'button');
  launcher.setAttribute('aria-controls', panel.id);
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-haspopup', 'dialog');
  const setOpen = (open, restoreFocus = false) => {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) close.focus();
    else if (restoreFocus) launcher.focus();
  };
  launcher.addEventListener('click', event => {
    event.preventDefault();
    setOpen(panel.hidden);
  });
  launcher.addEventListener('keydown', event => {
    if (event.key === ' ') {
      event.preventDefault();
      setOpen(panel.hidden);
    }
  });
  close.addEventListener('click', () => setOpen(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!panel.hidden && !widget.contains(event.target)) setOpen(false);
  });
  document.addEventListener('focusin', event => {
    if (!panel.hidden && !widget.contains(event.target)) setOpen(false);
  });
})();

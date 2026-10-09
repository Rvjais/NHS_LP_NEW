const B = (en, pa) => `<span class="en">${en}</span><span class="pa" lang="pa">${pa}</span>`;
const icon = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 3.5c-6.9 0-12.5 5.6-12.5 12.5 0 2.2.58 4.27 1.6 6.06L3.5 28.5l6.6-1.6a12.4 12.4 0 0 0 5.94 1.5h.01c6.9 0 12.5-5.6 12.5-12.5S22.94 3.5 16.04 3.5Zm0 22.8h-.01a10.3 10.3 0 0 1-5.24-1.44l-.38-.22-3.9.94.95-3.8-.25-.4a10.27 10.27 0 0 1-1.57-5.38c0-5.7 4.64-10.34 10.4-10.34 2.78 0 5.38 1.08 7.34 3.05a10.3 10.3 0 0 1 3.05 7.33c0 5.7-4.64 10.34-10.39 10.34Zm5.7-7.74c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.85-1.74-2.16-.18-.31-.02-.48.14-.64.15-.15.31-.39.47-.58.16-.19.21-.33.31-.55.1-.21.05-.4-.05-.55-.1-.16-.44-1.06-.85-2.02-.31-.75-.63-.66-.87-.67h-.6a1.16 1.16 0 0 0-.83.39c-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.2 3.36 5.33 4.58 3.13 1.22 3.13.81 3.7.76.57-.05 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.36Z"/></svg>';
const url = department => 'https://wa.me/919517804633?text=' + encodeURIComponent(
  `Hello NHS Hospital, I would like to enquire about ${department ? department + ' consultation' : 'an appointment'}.`
);
const cta = department => `<a class="whatsapp-cta" href="${url(department)}" target="_blank" rel="noopener noreferrer">${icon}${B('Chat on WhatsApp', 'WhatsApp ਉੱਤੇ ਗੱਲ ਕਰੋ')}</a>`;
function widget(department) {
 return `<div class="nhs-whatsapp">
 <section class="whatsapp-panel" id="whatsapp-panel" role="dialog" aria-modal="false" aria-labelledby="whatsapp-title" hidden>
  <div class="whatsapp-panel-header"><span class="whatsapp-avatar">${icon}</span><div><h2 id="whatsapp-title">NHS Hospital</h2><p>${B('Appointments &amp; enquiries', 'ਮੁਲਾਕਾਤਾਂ ਅਤੇ ਪੁੱਛਗਿੱਛ')}</p></div><button type="button" class="whatsapp-close" aria-label="Close WhatsApp widget">&times;</button></div>
  <div class="whatsapp-panel-body"><p>${B('Hello! How can we help?', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?')}</p><p>${B('Talk to our appointment team on WhatsApp.', 'WhatsApp ਉੱਤੇ ਸਾਡੀ ਮੁਲਾਕਾਤ ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ।')}</p>${cta(department)}<small>${B('Opens WhatsApp to start your conversation.', 'ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰਨ ਲਈ WhatsApp ਖੁੱਲ੍ਹੇਗਾ।')}</small></div>
 </section>
 <a class="whatsapp-launcher" href="${url(department)}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">${icon}</a>
</div>`;
}
function addWidget(html, department, prefix) {
 return html.replace('</head>', `<link rel="stylesheet" href="${prefix}assets/whatsapp.css"><script src="${prefix}assets/whatsapp.js" defer></script></head>`)
  .replace('</body>', `${widget(department)}</body>`);
}
module.exports = {cta, addWidget};

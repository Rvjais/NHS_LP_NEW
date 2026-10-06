// Shared reference-inspired specialty layout; content and forms originate in redesign.cjs.
const specialties = require('./specialty-content.cjs');
const fs = require('node:fs');
const path = require('node:path');
const B = (en, pa) => `<span class="en">${en}</span><span class="pa" lang="pa">${pa}</span>`;
const legalMain = fs.readFileSync(path.join(__dirname,'../privacy.html'),'utf8').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const legalContent = {
 privacy: legalMain.slice(0,legalMain.indexOf('<hr')),
 terms: legalMain.slice(legalMain.indexOf('<h1 id="terms"')),
};
const legalDialogs = Object.entries(legalContent).map(([key,html])=>{
 const title = key==='privacy'?B('Privacy policy','ਪ੍ਰਾਈਵੇਸੀ ਪਾਲਿਸੀ'):B('Terms &amp; conditions','ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ');
 const content = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/,'').replace(/ style="[^"]*"/g,'').replace(/<h2>/g,'<h3>').replace(/<\/h2>/g,'</h3>');
 return `<dialog class="specialty-legal-dialog" id="${key}" aria-labelledby="${key}-title"><div class="specialty-legal-header"><h2 id="${key}-title">${title}</h2><button type="button" data-close-legal aria-label="Close">&times;</button></div><div class="specialty-legal-content" lang="en">${content}</div></dialog>`;
}).join('');
const paths = {
 heart: '<path d="M20 7c-4-5-10-2-10 3 0 6 10 12 10 12s10-6 10-12c0-5-6-8-10-3Z"/>',
 pulse: '<path d="M3 20h8l3-7 4 15 4-20 4 12h11"/>',
 shield: '<path d="m20 3 13 5v11c0 9-13 16-13 16S7 28 7 19V8Z"/><path d="m14 19 4 4 9-10"/>',
 monitor: '<rect x="4" y="5" width="32" height="24" rx="3"/><path d="M15 35h10m-5-6v6M8 18h6l3-6 4 12 4-6h7"/>',
 care: '<path d="M10 29 5 21c-2-4 2-6 4-3l6 7m15 4 5-8c2-4-2-6-4-3l-6 7M8 35V24m24 11V24M14 35v-6c0-5 12-5 12 0v6"/><path d="M20 7c-3-4-8-1-8 2 0 4 8 9 8 9s8-5 8-9c0-3-5-6-8-2Z"/>',
 doctor: '<circle cx="20" cy="10" r="6"/><path d="M8 35v-8c0-7 24-7 24 0v8M16 22v7a4 4 0 0 0 8 0v-7m-9 13h10"/>',
 calendar: '<rect x="5" y="8" width="30" height="27" rx="3"/><path d="M12 4v8m16-8v8M5 17h30m-23 7h5m6 0h5m-16 6h5"/>',
 arrow: '<path d="M5 20h29M24 10l10 10-10 10"/>',
 phone: '<path d="m10 4 7 8-4 5c2 5 5 8 10 10l5-4 8 7c-3 9-12 5-20-3S1 7 10 4Z"/>',
 pin: '<path d="M31 16c0 9-11 20-11 20S9 25 9 16a11 11 0 0 1 22 0Z"/><circle cx="20" cy="16" r="4"/>',
 clipboard: '<rect x="8" y="6" width="24" height="30" rx="2"/><path d="M15 6V3h10v3M13 18h5l2-5 3 10 3-5h2M14 28h12"/>',
 rhythm: '<path d="M7 11c4-4 8-4 13-1s9 3 13-1M5 18c5-4 9-4 15-1s10 3 15-1M7 25c4-4 8-4 13-1s9 3 13-1M12 32c3-3 6-3 9-1s6 2 9-1"/>',
 leaf: '<path d="M32 6C9 3 4 17 12 27S35 25 32 6ZM9 34l17-20"/>',
 bone: '<path d="M12 12a5 5 0 1 1-7-7 5 5 0 0 1 7 0 5 5 0 0 1 8 5l10 10a5 5 0 0 1 5 8 5 5 0 1 1-7 7 5 5 0 0 1-8-5L10 20a5 5 0 0 1 2-8Z"/>',
 joint: '<path d="m13 3 1 11c-7 7 4 9 6 4 2 5 13 3 6-4l1-11M13 37l1-11c-5-6 2-9 6-5 4-4 11-1 6 5l1 11M9 20h22"/>',
 activity: '<circle cx="25" cy="6" r="3"/><path d="m17 14 6-3 5 8 7 2M23 11l-4 13 8 5-2 8M19 24l-7 8H5M17 14l-7 6"/>',
 kidneys: '<path d="M13 6C5 3 2 16 6 25c3 7 11 7 11 1 0-4-5-3-5-7s5-3 5-7c0-3-1-5-4-6Zm14 0c8-3 11 10 7 19-3 7-11 7-11 1 0-4 5-3 5-7s-5-3-5-7c0-3 1-5 4-6ZM14 21c5 2 4 10 4 15m8-15c-5 2-4 10-4 15"/>',
 urinary: '<path d="M12 4C5 3 4 11 7 16s9 4 9-1c0-3-4-3-4-6s4-2 4-4c0-1-2-2-4-1Zm16 0c7-1 8 7 5 12s-9 4-9-1c0-3 4-3 4-6s-4-2-4-4c0-1 2-2 4-1ZM12 14c6 3 1 13 4 14m12-14c-6 3-1 13-4 14M20 38v-4m-8-5c0-7 16-7 16 0 0 7-16 7-16 0Z"/>',
 stomach: '<path d="M19 3v9c3 2 7-5 12 0 8 8 2 21-8 23-7 1-8-5-12-5H5v-7h8c5 0 8-5 2-9V3M24 15c5-2 8 5 3 10"/>',
 liver: '<path d="M4 16C6 6 21 6 34 11c5 2 2 9-3 11l-7 2-7 9c-6 7-16-7-13-17ZM23 9l-3 12 4 3M22 26c3 8 6 3 4-2"/>',
 scope: '<rect x="5" y="4" width="21" height="16" rx="2"/><path d="M9 15h4l2-6 3 8 3-4M15 20v5h-5m5 0h5M30 8h4v12c0 13-10 18-15 10M30 8v-4"/>',
 dialysis: '<rect x="7" y="3" width="25" height="30" rx="3"/><rect x="11" y="7" width="17" height="8" rx="1"/><path d="M12 21h6m-6 5h6m6-6v7M12 33v4m15-4v4M4 12v14m-2-7h4"/>',
};
const icon = (name, className = '') => `<svg class="specialty-icon ${className}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

module.exports = function specialtyDesign(base, c) {
 const s = specialties[c.key];
 if (!s) throw new Error(`Missing specialty design: ${c.key}`);
 const heroForm = base.match(/<form class="hero-form"[\s\S]*?<\/form>/)[0];
 const cards = [
  [s.icon, ...s.firstCard, 'Understand your symptoms and reports with a specialist.', 'ਮਾਹਿਰ ਨਾਲ ਲੱਛਣਾਂ ਅਤੇ ਰਿਪੋਰਟਾਂ ਬਾਰੇ ਗੱਲ ਕਰੋ।'],
  ['monitor', 'Advanced<br>diagnostics', 'ਮਾਹਿਰ ਦੀ ਜਾਂਚ', ...s.diagnostic],
  ['clipboard', 'Personalised<br>treatment plans', 'ਤੁਹਾਡੇ ਲਈ ਇਲਾਜ', 'Care planned around your condition and individual needs.', 'ਤੁਹਾਡੀ ਸਿਹਤ ਅਤੇ ਲੋੜ ਅਨੁਸਾਰ ਇਲਾਜ।'],
  ['shield', 'Ongoing care<br>&amp; prevention', 'ਲਗਾਤਾਰ ਦੇਖਭਾਲ', 'Follow-up and practical guidance for your long-term health.', 'ਤੁਹਾਡੀ ਸਿਹਤ ਲਈ ਫਾਲੋ-ਅੱਪ ਅਤੇ ਸਲਾਹ।'],
 ];
 const treatmentIcons = s.treatmentIcons;
 const upper = `<main id="main">
 <section class="hero specialty-hero" aria-labelledby="specialty-title">
  <img class="specialty-hero-photo" src="../assets/${s.heroImage}" alt="${s.heroAlt}" fetchpriority="high" width="1536" height="1024">
  <div class="shell hero-grid">
   <div class="hero-copy"><span class="eyebrow">${B(c.key==='cardiology'?'Expert care. Personal touch.':`${s.title} · NHS Hospital`, c.key==='cardiology'?'ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ। ਤੁਹਾਡੇ ਲਈ ਦੇਖਭਾਲ।':`${s.titlePa} · NHS ਹਸਪਤਾਲ`)}</span>
    <h1 id="specialty-title">${B(s.headline,s.headlinePa)}</h1>
    <div class="specialty-heartline">${c.key==='cardiology'?icon('pulse'):''}${icon(s.icon)}${c.key==='cardiology'?icon('pulse'):''}</div>
    <p class="hero-description">${B(s.description,s.descriptionPa)}</p>
    <div class="hero-actions"><a class="button primary" href="#hero-form">${icon('calendar')}${B('Book a consultation', 'ਸਲਾਹ ਲਈ ਬਿਨਤੀ')}</a><a class="button specialty-outline" href="#treatments">${B('Our services', 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ')}${icon('arrow')}</a></div>
    <div class="specialty-trust"><div>${icon('shield')}${B(s.trust,s.titlePa)}</div><div>${icon('monitor')}${B('Diagnosis &amp;<br>treatment', 'ਜਾਂਚ ਅਤੇ ਇਲਾਜ')}</div><div>${icon('doctor')}${B('Patient-centred<br>care', 'ਤੁਹਾਡੇ ਲਈ ਦੇਖਭਾਲ')}</div></div>
   </div>
  </div>
  <div class="shell specialty-lead-columns">
   <div class="specialty-care">${cards.map(([i,en,pa,desc,descPa])=>`<a href="#treatments" class="specialty-care-card"><span class="specialty-icon-disc">${icon(i)}</span><h2>${B(en,pa)}</h2><p>${B(desc,descPa)}</p></a>`).join('')}</div>
   <div class="specialty-callback">${heroForm}</div>
  </div>
 </section>
 <section class="shell specialty-specialist" id="doctor" aria-labelledby="specialist-title">
  <div class="specialty-specialist-copy"><span class="eyebrow">${B('Why choose NHS', 'NHS ਕਿਉਂ ਚੁਣੀਏ')}</span><h2 id="specialist-title">${B('Experience. Technology.<br>Compassion.', 'ਤਜਰਬਾ। ਤਕਨਾਲੋਜੀ।<br>ਹਮਦਰਦੀ।')}</h2><span class="specialty-accent-rule"></span><p>${B('Personal attention, a clear plan, and specialist support for every step of your care.', 'ਤੁਹਾਡੀ ਦੇਖਭਾਲ ਲਈ ਖ਼ਾਸ ਧਿਆਨ, ਸਪੱਸ਼ਟ ਯੋਜਨਾ ਅਤੇ ਮਾਹਿਰ ਦੀ ਸਲਾਹ।')}</p>
   <div class="specialty-proof"><div>${icon('doctor')}<strong>${B('Specialist', 'ਮਾਹਿਰ')}</strong><small>${B(s.expertise,s.titlePa)}</small></div><div>${icon('monitor')}<strong>${B('Diagnosis', 'ਜਾਂਚ')}</strong><small>${B('Care under one roof', 'ਇੱਕੋ ਥਾਂ ਦੇਖਭਾਲ')}</small></div><div>${icon('shield')}<strong>24/7</strong><small>${B('Emergency support', 'ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ')}</small></div></div>
  </div><div class="specialty-specialist-portrait"><img src="../assets/${s.photo}" alt="${c.name.match(/<span class=\"en\">(.*?)<\/span>/)[1]}, NHS Hospital ${s.title} specialist" loading="lazy" width="480" height="480"><div class="specialty-doctor-label"><h3>${c.name}</h3><p>${c.paragraphs[0]}</p><a href="#book">${B('Request an appointment', 'ਮੁਲਾਕਾਤ ਲਈ ਬਿਨਤੀ')}${icon('arrow')}</a></div></div>
 </section>
 <section class="section shell specialty-services" id="treatments"><div class="section-heading"><div><span class="eyebrow">${B('Our services', 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ')}</span><h2>${B(s.services,s.servicesPa)}</h2></div></div><div class="services">${c.treatments.map((t,i)=>`<article class="service-card">${icon(treatmentIcons[i])}<h3>${t.title}</h3><p>${t.description}</p><a class="text-link" href="#book">${B('Enquire', 'ਪੁੱਛੋ')}${icon('arrow')}</a></article>`).join('')}</div></section>
 <div class="shell specialty-reassurance">${icon(s.icon)}<div><h2>${B(s.reassurance,s.reassurancePa)}</h2><p>${c.paragraphs[1]}</p></div><a class="button primary" href="#book">${B('Meet your specialist', 'ਮਾਹਿਰ ਨਾਲ ਗੱਲ ਕਰੋ')}${icon('arrow')}</a></div>
 <div class="shell specialty-visit-strip"><span class="specialty-icon-disc">${icon(s.icon)}</span><h2>${B(s.nextStep,s.nextStepPa)}</h2><p>${B('Talk to our care team: <a href="tel:+911814633333">0181-4633333</a>', 'ਸਾਡੀ ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ: <a href="tel:+911814633333">0181-4633333</a>')}</p><a class="button primary" href="#hero-form">${icon('calendar')}${B('Book a consultation', 'ਸਲਾਹ ਲਈ ਬਿਨਤੀ')}</a></div>
 `;
 base = base.replace(/<main id="main">[\s\S]*?(?=<section class="section shell hospital-section")/, upper);
 base = base.replace(/<section class="section journey-section"[\s\S]*?<\/section>/, '');
 base = base.replace('<meta name="theme-color" content="#173b32">', '<meta name="theme-color" content="#061f3e">');
 base = base.replace('<link rel="stylesheet" href="../assets/landing.css">', '<link rel="stylesheet" href="../assets/landing.css"><link rel="stylesheet" href="../assets/specialty.css">');
 base = base.replace(/<div class="utility">[\s\S]*?<\/div><\/div>/, `<div class="utility"><div class="shell"><span class="specialty-utility-message">${icon(s.icon)}${B(c.key==='cardiology'?'Compassionate care. Advanced solutions. Healthier hearts.':'Compassionate care. Advanced solutions. Better health.', 'ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ। ਤੁਹਾਡੇ ਲਈ ਦੇਖਭਾਲ।')}</span><div class="specialty-utility-contact"><a href="tel:+911814633333">${icon('phone')}0181-4633333</a><a href="#hospital">${icon('pin')}${B('Kapurthala Chowk, Jalandhar', 'ਕਪੂਰਥਲਾ ਚੌਕ, ਜਲੰਧਰ')}</a></div></div></div>`);
 base = base.replace(/<header>[\s\S]*?<\/header>/, `<header class="specialty-header"><div class="shell navigation">
  <a class="specialty-brand" href="#main" aria-label="NHS Hospital — back to top"><span class="brand"><img src="../assets/logo.png" alt="NHS Hospital"></span><span class="specialty-brand-copy"><small>${B('Specialist care', 'ਮਾਹਿਰਾਂ ਦੀ ਦੇਖਭਾਲ')}</small><strong>${B(s.title,s.titlePa)}</strong></span></a>
  <nav aria-label="Main navigation"><a class="specialty-home-link" href="#main" aria-current="location">${B('Home', 'ਮੁੱਖ ਪੰਨਾ')}</a><a href="#treatments">${B('Treatments', 'ਇਲਾਜ')}</a><a href="#doctor">${B('<span class="nav-label-full">Your specialist</span><span class="nav-label-short">Doctor</span>', 'ਮਾਹਿਰ')}</a><a href="#hospital">${B('<span class="nav-label-full">Our hospital</span><span class="nav-label-short">Hospital</span>', 'ਹਸਪਤਾਲ')}</a></nav>
  <div class="nav-actions"><div class="language" role="group" aria-label="Choose language"><button type="button" data-language="en" aria-pressed="true" aria-label="English">EN</button><button type="button" data-language="pa" aria-pressed="false" aria-label="ਪੰਜਾਬੀ" lang="pa">ਪੰ</button></div><a class="button primary specialty-nav-book" href="#hero-form">${icon('calendar')}${B('<span class="nav-label-full">Book a visit</span><span class="nav-label-short">Book visit</span>', 'ਮੁਲਾਕਾਤ')}${icon('arrow')}</a></div>
 </div></header>`);
 base = base.replace('<div class="visit-note">', `<p class="specialty-expertise">${c.paragraphs[2]}</p><div class="visit-note">`);
 base = base.replace('<a class="brand footer-brand" href="../">','<a class="brand footer-brand" href="#main" aria-label="NHS Hospital — back to top">');
 base = base.replace(/<div><h3><span class="en">Explore our care<\/span>[\s\S]*?<\/div>/, `<div><h3>${B('On this page','ਇਸ ਪੰਨੇ ਉੱਤੇ')}</h3><a href="#treatments">${B('Treatments','ਇਲਾਜ')}</a><a href="#doctor">${B('Your specialist','ਤੁਹਾਡਾ ਮਾਹਿਰ')}</a><a href="#hospital">${B('Our hospital','ਸਾਡਾ ਹਸਪਤਾਲ')}</a><a href="#hero-form">${B('Request a callback','ਕਾਲ ਲਈ ਬਿਨਤੀ')}</a><a href="#faq">${B('Frequently asked questions','ਆਮ ਸਵਾਲ')}</a></div>`);
 base = base.replace(/<a class="text-link" href="https:\/\/wa\.me\/[^\"]*"[^>]*>[\s\S]*?<\/a>/, `<a class="text-link" href="#hero-form">${B('Request a callback','ਕਾਲ ਲਈ ਬਿਨਤੀ')}${icon('arrow')}</a>`);
 base = base.replaceAll('href="../privacy.html#privacy"','href="#privacy"').replaceAll('href="../privacy.html#terms"','href="#terms"');
 base = base.replace('</body>',`${legalDialogs}<script src="../assets/specialty-navigation.js" defer></script></body>`);
 base = base.replace(`class="${c.key}-page"`, `class="${c.key}-page specialty-page"`);
 return base;
};

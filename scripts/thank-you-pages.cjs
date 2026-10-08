const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const B = (en, pa) => `<span class="en">${en}</span><span class="pa" lang="pa">${pa}</span>`;
const specialties = [
 ['cardiology', 'Cardiology', 'ਦਿਲ ਦੀ ਦੇਖਭਾਲ'],
 ['orthopaedics', 'Orthopaedics', 'ਹੱਡੀਆਂ ਅਤੇ ਜੋੜ'],
 ['urology', 'Urology', 'ਯੂਰੋਲੋਜੀ'],
 ['nephrology', 'Nephrology', 'ਗੁਰਦਿਆਂ ਦੀ ਦੇਖਭਾਲ'],
 ['gastroenterology', 'Gastroenterology', 'ਪੇਟ ਅਤੇ ਜਿਗਰ'],
];
const thankYouUrl = route => `https://enquire.nhshospital.in/${route ? route + '/' : ''}thank-you.html`;

function page(specialty) {
 const prefix = specialty ? '../' : './';
 const department = specialty ? B(specialty[1], specialty[2]) : B('NHS Hospital · Jalandhar', 'NHS ਹਸਪਤਾਲ · ਜਲੰਧਰ');
 return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <meta name="robots" content="noindex, follow">
 <meta name="theme-color" content="#061f3e">
 <title>Thank you${specialty ? ' · ' + specialty[1] : ''} | NHS Hospital</title>
 <meta name="description" content="Your enquiry has been received. NHS Hospital's appointment team will contact you during OPD hours to discuss the next step.">
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@400;500;600;700&display=swap" rel="stylesheet">
 <link rel="stylesheet" href="${prefix}assets/landing.css">
 <link rel="stylesheet" href="${prefix}assets/thank-you.css">
 <script src="${prefix}assets/landing.js" defer></script>
</head>
<body class="thank-you-page">
 <a class="skip-link" href="#main">${B('Skip to content', 'ਸਿੱਧੇ ਜਾਣਕਾਰੀ ਵੱਲ ਜਾਓ')}</a>
 <header><div class="shell thank-you-navigation">
  <a class="brand" href="./index.html" aria-label="NHS Hospital"><img src="${prefix}assets/logo.png" alt="NHS Hospital"></a>
  <div class="language" role="group" aria-label="Choose language">
   <button type="button" data-language="en" aria-pressed="true" aria-label="English">EN</button>
   <button type="button" data-language="pa" aria-pressed="false" aria-label="ਪੰਜਾਬੀ" lang="pa">ਪੰ</button>
  </div>
 </div></header>
 <main id="main" class="shell thank-you-main">
  <section class="thank-you-confirmation" aria-labelledby="thank-you-title">
   <div class="thank-you-check" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="m13 25 7 7 15-16" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
   <p class="eyebrow">${department}</p>
   <h1 id="thank-you-title">${B('Thank you for reaching out.', 'ਸੰਪਰਕ ਕਰਨ ਲਈ ਧੰਨਵਾਦ।')}</h1>
   <p class="thank-you-intro">${B('We have received your ' + (specialty ? specialty[1].toLowerCase() + ' ' : '') + 'enquiry. Our appointment team will call you during OPD hours to discuss your concern and available appointments.', 'ਸਾਨੂੰ ਤੁਹਾਡੀ ਬਿਨਤੀ ਮਿਲ ਗਈ ਹੈ। ਸਾਡੀ ਟੀਮ OPD ਸਮੇਂ ਤੁਹਾਨੂੰ ਫ਼ੋਨ ਕਰਕੇ ਤੁਹਾਡੀ ਸਮੱਸਿਆ ਅਤੇ ਉਪਲਬਧ ਮੁਲਾਕਾਤਾਂ ਬਾਰੇ ਗੱਲ ਕਰੇਗੀ।')}</p>
   <p class="thank-you-pending">${B('Your appointment will be confirmed by our team.', 'ਤੁਹਾਡੀ ਮੁਲਾਕਾਤ ਦੀ ਪੁਸ਼ਟੀ ਸਾਡੀ ਟੀਮ ਕਰੇਗੀ।')}</p>
   <div class="thank-you-actions">
    <a class="button primary" href="./index.html">${B(specialty ? 'Back to ' + specialty[1] : 'Back to our hospital', specialty ? 'ਵਿਭਾਗ ਦੇ ਪੰਨੇ ’ਤੇ ਵਾਪਸ ਜਾਓ' : 'ਹਸਪਤਾਲ ਦੇ ਪੰਨੇ ’ਤੇ ਵਾਪਸ ਜਾਓ')} <span aria-hidden="true">↗</span></a>
    <a class="button thank-you-call" href="tel:+911814633333">${B('Call our team', 'ਸਾਡੀ ਟੀਮ ਨੂੰ ਫ਼ੋਨ ਕਰੋ')} · 0181-4633333</a>
   </div>
  </section>
  <section class="thank-you-next" aria-labelledby="next-title">
   <h2 id="next-title">${B('What happens next?', 'ਅਗਲਾ ਕਦਮ ਕੀ ਹੈ?')}</h2>
   <ol class="thank-you-steps">
    <li><span class="thank-you-number" aria-hidden="true">01</span><h3>${B('Keep your phone nearby', 'ਆਪਣਾ ਫ਼ੋਨ ਨੇੜੇ ਰੱਖੋ')}</h3><p>${B('Our team will contact you on the mobile number you provided.', 'ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੇ ਦਿੱਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ’ਤੇ ਸੰਪਰਕ ਕਰੇਗੀ।')}</p></li>
    <li><span class="thank-you-number" aria-hidden="true">02</span><h3>${B('Have your reports ready', 'ਆਪਣੀਆਂ ਰਿਪੋਰਟਾਂ ਤਿਆਰ ਰੱਖੋ')}</h3><p>${B('Keep any previous reports and prescriptions handy for your consultation.', 'ਸਲਾਹ ਲਈ ਆਪਣੀਆਂ ਪੁਰਾਣੀਆਂ ਰਿਪੋਰਟਾਂ ਅਤੇ ਦਵਾਈਆਂ ਦੀ ਸੂਚੀ ਤਿਆਰ ਰੱਖੋ।')}</p></li>
    <li><span class="thank-you-number" aria-hidden="true">03</span><h3>${B('Plan your visit', 'ਆਪਣੀ ਮੁਲਾਕਾਤ ਦੀ ਯੋਜਨਾ ਬਣਾਓ')}</h3><p>${B('Our team will help you check availability and confirm your appointment details.', 'ਸਾਡੀ ਟੀਮ ਉਪਲਬਧ ਸਮਾਂ ਦੱਸੇਗੀ ਅਤੇ ਮੁਲਾਕਾਤ ਦੇ ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੇਗੀ।')}</p></li>
   </ol>
  </section>
  <aside class="thank-you-emergency" aria-labelledby="emergency-title"><div><h2 id="emergency-title">${B('Need urgent care?', 'ਤੁਰੰਤ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?')}</h2><p>${B('For a medical emergency, do not wait for a callback. Call our emergency desk or visit your nearest emergency department.', 'ਐਮਰਜੈਂਸੀ ਲਈ ਕਾਲ ਦੀ ਉਡੀਕ ਨਾ ਕਰੋ। ਸਾਡੇ ਐਮਰਜੈਂਸੀ ਕਾਊਂਟਰ ਨੂੰ ਫ਼ੋਨ ਕਰੋ ਜਾਂ ਨੇੜੇ ਦੇ ਐਮਰਜੈਂਸੀ ਵਿਭਾਗ ਜਾਓ।')}</p></div><a href="tel:+911814707700">0181-4707700 <span aria-hidden="true">↗</span></a></aside>
 </main>
 <footer class="thank-you-footer"><div class="shell"><p>${B('Nasa &amp; Hub Superspeciality Hospital', 'NHS ਹਸਪਤਾਲ')}</p><p>${B('Near Sports College, Kapurthala Chowk, Jalandhar, Punjab 144001', 'ਸਪੋਰਟਸ ਕਾਲਜ ਦੇ ਨੇੜੇ, ਕਪੂਰਥਲਾ ਚੌਕ, ਜਲੰਧਰ, ਪੰਜਾਬ 144001')}</p><div><span>© 2026 NHS Hospital</span><a href="${prefix}privacy.html#privacy">${B('Privacy policy', 'ਪ੍ਰਾਈਵੇਸੀ ਪਾਲਿਸੀ')}</a><a href="${prefix}privacy.html#terms">${B('Terms', 'ਨਿਯਮ')}</a></div></div></footer>
</body>
</html>
`;
}

function generateThankYouPages() {
 const pages = [[null, ''], ...specialties.map(s => [s, s[0] + '-treatment'])];
 for (const [specialty, route] of pages) {
  fs.mkdirSync(path.join(root, route), {recursive: true});
  fs.writeFileSync(path.join(root, route, 'thank-you.html'), page(specialty));
  const landingPath = path.join(root, route, 'index.html');
  if (fs.existsSync(landingPath)) {
   const html = fs.readFileSync(landingPath, 'utf8');
   fs.writeFileSync(landingPath, html.replace(/(name="_redirect" value=")[^"]*(")/g, `$1${thankYouUrl(route)}$2`));
  }
 }
 console.log('Generated six thank-you pages and connected both forms on every landing page.');
}

module.exports = {generateThankYouPages, thankYouUrl};
if (require.main === module) generateThankYouPages();

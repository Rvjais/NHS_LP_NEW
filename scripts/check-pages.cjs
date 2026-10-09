const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const content=require('../landing-content.json');
const {thankYouUrl}=require('./thank-you-pages.cjs');
const landingFiles=['index.html',...content.flatMap(c=>[`${c.key}-treatment/index.html`,`${c.key}/index.html`].filter(file=>fs.existsSync(path.join(root,file))))];
const thankYouFiles=['thank-you.html',...content.map(c=>`${c.key}-treatment/thank-you.html`)];
let failures=[];
for(const c of content){console.log(`${c.key}: ${c.paragraphs.length} specialist paragraphs, ${c.treatments.length} treatments, ${c.options.length} form options`);if(!c.paragraphs.length||!c.treatments.length||!c.options.length)failures.push(`${c.key}: missing content`);}
for(const file of [...landingFiles,...thankYouFiles]){
 const s=fs.readFileSync(path.join(root,file),'utf8');const ids=[...s.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)failures.push(`${file}: duplicate IDs`);
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=m[1];if(/^(https?:|tel:|mailto:)/.test(url))continue;
  if(url[0]==='#'){if(!ids.includes(url.slice(1)))failures.push(`${file}: broken anchor ${url}`);continue;}
  const target=path.resolve(root,path.dirname(file),url.split('#')[0]);if(!fs.existsSync(target))failures.push(`${file}: missing asset ${url}`);
 }
 const forms=[...s.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map(m=>m[0]);
 const thankYou=thankYouFiles.includes(file);
 if(!thankYou && forms.length!==2)failures.push(`${file}: expected hero and lower-page forms`);
 if(!thankYou && !forms[0]?.includes('id="hero-form"'))failures.push(`${file}: incomplete hero form`);
 if(!thankYou){
  const head=s.match(/<head>[\s\S]*?<\/head>/)?.[0]||'';
  if((head.match(/GTM-TB5M43ZD/g)||[]).length!==1||!head.includes('https://www.googletagmanager.com/gtm.js?id='))failures.push(`${file}: missing or duplicate GTM script`);
  if(!/<body\b[^>]*>\s*<!-- Google Tag Manager \(noscript\) -->\s*<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TB5M43ZD"/.test(s))failures.push(`${file}: missing GTM noscript immediately after body`);
  if(/<input\b[^>]*type="checkbox"/.test(s)||forms.some(form=>form.includes('name="consent"')))failures.push(`${file}: unexpected consent checkbox or field`);
 }
 if(thankYou && (!s.includes('noindex, follow')||!s.includes('Your appointment will be confirmed by our team.')))failures.push(`${file}: incomplete confirmation page`);
 for(const form of forms){
  if(!form.includes('action="https://app.formester.com/forms/xh1pxuMQJ/submissions"'))failures.push(`${file}: missing Formester action`);
  for(const name of ['patient_name','mobile','problem','department','_redirect'])if(!form.includes(`name="${name}"`))failures.push(`${file}: missing ${name} in a form`);
  const key=content.find(c=>file.startsWith(c.key+'/'))?.key;
  const route=key?key+'-treatment':path.dirname(file)==='.'?'':path.dirname(file);
  if(!form.includes(`name="_redirect" value="${thankYouUrl(route)}"`))failures.push(`${file}: wrong thank-you destination`);
 }
 if(s.includes('{{'))failures.push(`${file}: unresolved template`);
 if((s.match(/<h1\b[^>]*>/g)||[]).length!==1)failures.push(`${file}: expected one h1`);
 const stack=[];const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
 for(const m of s.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi)){
  const tag=m[1].toLowerCase();if(voidTags.has(tag)||m[0].endsWith('/>'))continue;
  if(m[0].startsWith('</')){const previous=stack.pop();if(previous!==tag)failures.push(`${file}: invalid nesting, closing ${tag} after ${previous}`);}else stack.push(tag);
 }
 if(stack.length)failures.push(`${file}: unclosed tags ${stack.join(',')}`);
 console.log(`${file}: checked assets, links, form endpoint and anchors`);
}
for(const c of content){
 const treatment=fs.readFileSync(path.join(root,c.key+'-treatment','index.html'),'utf8');
 const aliasPath=path.join(root,c.key,'index.html');
 if(fs.existsSync(aliasPath)&&fs.readFileSync(aliasPath,'utf8')!==treatment)failures.push(`${c.key}: specialty URL variants differ`);
 if(!treatment.includes('specialty-page')||!treatment.includes('../assets/specialty.css'))failures.push(`${c.key}: missing reference design`);
}
const buttons=['en','pa'].map(language=>({dataset:{language},setAttribute(k,v){this[k]=v;},addEventListener(k,fn){this[k]=fn;}}));
const input={getAttribute(k){return k.endsWith('pa')?'ਪੂਰਾ ਨਾਂ':'Your full name';}};
const document={documentElement:{dataset:{}},querySelectorAll(s){return s==='[data-language]'?buttons:[input];}};
const saved=new Map([['nhs-lang','pa']]);
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/landing.js'),'utf8'),{document,window:{matchMedia:()=>({matches:true})},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)}});
if(document.documentElement.lang!=='pa'||buttons[1]['aria-pressed']!=='true')failures.push('Saved Punjabi language not applied');
buttons[0].click();if(document.documentElement.lang!=='en'||saved.get('nhs-lang')!=='en'||input.placeholder!=='Your full name')failures.push('English language switch failed');
console.log('Language restoration, buttons, placeholders and persistence checked.');
for(const p of ['playwright','@playwright/test','puppeteer']){try{console.log(`Available browser test package: ${require.resolve(p)}`);}catch{}}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('All checks passed.');

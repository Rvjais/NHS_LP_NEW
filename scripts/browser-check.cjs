// Local browser QA through an isolated headless Chrome debugging port.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const preview = path.join(root,'.preview');
fs.mkdirSync(preview,{recursive:true});
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
async function main() {
 const pages=await fetch('http://127.0.0.1:9223/json/list').then(r=>r.json());
 const target=pages.find(p=>p.type==='page');
 const socket=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
 let id=0;const pending=new Map();
 socket.onmessage=event=>{const message=JSON.parse(event.data);const handler=pending.get(message.id);if(handler){pending.delete(message.id);message.error?handler.reject(message.error):handler.resolve(message.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const next=++id;pending.set(next,{resolve,reject});socket.send(JSON.stringify({id:next,method,params}));});
 const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
 await send('Page.enable');
 const specialtyKeys=['cardiology','orthopaedics','urology','nephrology','gastroenterology'];
 const routes=[...specialtyKeys.map(key=>key+'-treatment'),...specialtyKeys,''];
 const failures=[];
 for(const route of routes){
  for(const width of [320,390,768,1440]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});
   await send('Page.navigate',{url:'file:///'+path.join(root,route,'index.html').replaceAll('\\','/')});
   await delay(300);
   await evaluate('document.fonts.ready.then(()=>true)');
   await evaluate(`Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)}))`);
   await evaluate(`document.querySelector('[data-language="en"]').click()`);
   const state=await evaluate(`({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),h1:document.querySelector('h1').innerText})`);
   if(state.scroll>width+1)failures.push({route,width,overflow:state.scroll});
   if(state.images.length)failures.push({route,width,images:state.images});
   const forms=await evaluate(`(()=>{const forms=[...document.forms];return {count:forms.length,hero:forms[0].closest('.hero')!==null,endpoints:forms.map(f=>f.action),departments:forms.map(f=>f.elements.department.value)}})()`);
   if(forms.count!==2||!forms.hero||forms.endpoints.some(endpoint=>!endpoint.includes('app.formester.com/forms/xh1pxuMQJ/submissions'))||forms.departments[0]!==forms.departments[1])failures.push({route,width,forms});
   const type=await evaluate(`(()=>{const size=s=>parseFloat(getComputedStyle(document.querySelector(s)).fontSize);return {hero:size('.hero-description'),card:size('.service-card p'),form:size('.appointment-form>label:not(.consent)'),faq:size('.faqs summary')}})()`);
   if(type.hero<15||type.card<14||type.form<14||type.faq<15)failures.push({route,width,type});
   console.log(`${route||'home'} @ ${width}px: ${state.scroll<=width?'fits':'OVERFLOW '+state.scroll}`);
   if(route.endsWith('-treatment')&&(width===390||width===1440)){
    const key=route.replace('-treatment','');
    await delay(1000);
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    fs.writeFileSync(path.join(preview,`${key}-${width===390?'mobile':'desktop'}.png`),Buffer.from(shot.data,'base64'));
    const heroHeight=await evaluate(`Math.ceil(document.querySelector('.hero').getBoundingClientRect().bottom+16)`);
    const heroShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:heroHeight,scale:1}});
    fs.writeFileSync(path.join(preview,`${key}-hero-${width===390?'mobile':'desktop'}.png`),Buffer.from(heroShot.data,'base64'));
    if(width===1440){
     await evaluate(`document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))`);
     await delay(800);
     const metrics=await send('Page.getLayoutMetrics');
     const fullPage=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:metrics.cssContentSize.height,scale:1}});
     fs.writeFileSync(path.join(preview,`${key}-full.png`),Buffer.from(fullPage.data,'base64'));
    }
   }
   if(width===390||width===768){
    await evaluate(`document.querySelector('[data-language="pa"]').click()`);
    const pa=await evaluate(`({lang:document.documentElement.lang,width:document.documentElement.scrollWidth})`);
    if(pa.lang!=='pa'||pa.width>width+1)failures.push({route,width,punjabi:pa});
    await evaluate(`document.querySelector('[data-language="en"]').click()`);
   }
  }
 }
 const checks=await evaluate(`(()=>{const results=[...document.forms].map(f=>{const name=f.querySelector('[name="patient_name"]');const mobile=f.querySelector('[name="mobile"]');const problem=f.querySelector('[name="problem"]');const noCheckbox=f.querySelector('[type="checkbox"]')===null;const empty=!f.checkValidity();name.value='Preview check';mobile.value='123';problem.selectedIndex=1;const badMobile=!f.checkValidity();mobile.value='9876543210';const valid=f.checkValidity();f.reset();return {empty,badMobile,valid,noCheckbox}});const faq=document.querySelector('details');faq.querySelector('summary').click();return {forms:results,faq:faq.open};})()`);
 if(!checks.faq||checks.forms.some(form=>Object.values(form).some(v=>!v)))failures.push(checks);
 console.log('Form validation and FAQ:',JSON.stringify(checks));
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'file:///'+path.join(root,'cardiology-treatment/index.html').replaceAll('\\','/')});
 await delay(250);await evaluate('document.fonts.ready.then(()=>true)');
 await evaluate(`Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)}))`);
 const motion=await evaluate(`({hero:getComputedStyle(document.querySelector('.hero h1')).animationName,targets:document.querySelectorAll('.reveal').length})`);
 if(motion.hero==='none'||motion.targets<10)failures.push({motion});
 await evaluate(`document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))`);
 await delay(1100);
 const layout=await send('Page.getLayoutMetrics');
 const full=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height:layout.cssContentSize.height,scale:1}});
 fs.writeFileSync(path.join(preview,'cardiology-full.png'),Buffer.from(full.data,'base64'));
 console.log(failures.length?JSON.stringify(failures,null,2):'All browser checks passed.');
 await send('Browser.close');socket.close();if(failures.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exit(1);});

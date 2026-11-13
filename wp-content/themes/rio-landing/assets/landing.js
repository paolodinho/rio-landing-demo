(function(){
var f=document.getElementById('leadForm'); if(f) f.ts.value=Date.now();
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in')});
document.querySelectorAll('.vid').forEach(function(v){
  function play(){if(v.querySelector('iframe'))return;var i=document.createElement('iframe');
    i.src='https://www.youtube-nocookie.com/embed/'+v.dataset.yt+'?autoplay=1&playsinline=1&rel=0';
    i.allow='autoplay; encrypted-media; picture-in-picture';i.allowFullscreen=true;i.title=v.getAttribute('aria-label');v.appendChild(i);}
  v.addEventListener('click',play);v.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}});
});
function tr(ev){try{window.fbq&&fbq('track',ev)}catch(e){}try{window.ttq&&ttq.track(ev==='Lead'?'SubmitForm':ev)}catch(e){}}
document.querySelectorAll('.js-mess,.js-zalo,a[href^="tel:"]').forEach(function(a){a.addEventListener('click',function(){tr('Contact')})});
function normPhone(p){p=(p||'').replace(/[^\d+]/g,'');if(p.indexOf('+84')===0)p='0'+p.slice(3);else if(p.indexOf('84')===0&&p.length===11)p='0'+p.slice(2);else if(p.length===9)p='0'+p;return p}
function showOk(){document.getElementById('formBody').style.display='none';document.getElementById('okBox').classList.add('show')}
if(!f)return;
f.addEventListener('submit',function(e){
  e.preventDefault();var ok=true,name=f.name.value.trim(),phone=normPhone(f.phone.value);
  document.getElementById('f-name').classList.toggle('err',name.length<2);if(name.length<2)ok=false;
  var pOk=/^0(3|5|7|8|9)\d{8}$/.test(phone);document.getElementById('f-phone').classList.toggle('err',!pOk);if(!pOk)ok=false;
  if(!ok)return;
  var btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.style.opacity=.6;
  var d=new FormData(f);d.set('phone',phone);d.append('action','rio_lead');d.append('page',location.href);
  var q=new URLSearchParams(location.search),u=[];['utm_source','utm_medium','utm_campaign','utm_content','fbclid'].forEach(function(k){if(q.get(k))u.push(k.replace('utm_','')+'='+q.get(k).slice(0,60))});d.append('utm',u.join('; '));
  fetch(RIO.ajax,{method:'POST',body:d,credentials:'same-origin'}).then(function(r){return r.json()}).then(function(r){
    if(r&&r.success){tr('Lead');showOk()}else{btn.disabled=false;btn.style.opacity=1;document.getElementById('f-phone').classList.add('err')}
  }).catch(function(){btn.disabled=false;btn.style.opacity=1;alert('Chưa gửi được, vui lòng gọi hotline.')});
});
})();(function(){document.querySelectorAll('.slider').forEach(function(s){var d=s.nextElementSibling;if(!d||!d.classList.contains('dots'))return;var n=s.children.length;for(var i=0;i<n;i++){var b=document.createElement('i');if(!i)b.className='on';d.appendChild(b)}
s.addEventListener('scroll',function(){var w=s.children[0].getBoundingClientRect().width+10,k=Math.round(s.scrollLeft/w);[].forEach.call(d.children,function(x,j){x.className=j===k?'on':''})},{passive:true})})})();

(function(){var b=document.getElementById('baMore');if(!b)return;b.addEventListener('click',function(){document.querySelectorAll('.ba-more').forEach(function(e){e.classList.remove('ba-more')});var g=document.querySelector('.ba-grid');if(g)g.classList.remove('ba-collapsed');b.parentNode.remove();});})();

(function(){var w=document.querySelector('.hero-wm');if(!w||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var t=0;function u(){t=0;var y=Math.min(window.scrollY,1600);w.style.setProperty('--wm',(y*0.35).toFixed(1)+'px');w.style.setProperty('--wr',(y*0.025).toFixed(2)+'deg');w.style.setProperty('--ws',(1+y*0.00015).toFixed(4))}window.addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(u)},{passive:true});u()})();

(function(){var hw=document.querySelector('.hero-wm');if(!hw)return;var base=hw.getAttribute('src').replace(/logo-navy\.webp.*$/,''),list=[],k=0;
document.querySelectorAll('main > section').forEach(function(s){if(s.querySelector('.hero-wm'))return;var c=getComputedStyle(s).color.match(/\d+/g)||[0,0,0],dark=(+c[0]*.299+ +c[1]*.587+ +c[2]*.114)>150;var i=document.createElement('img');i.src=base+(dark?'logo-light.webp':'logo-navy.webp');i.alt='';i.setAttribute('aria-hidden','true');i.loading='lazy';i.width=420;i.height=446;i.className='sec-wm '+(k++%2?'r':'l')+(dark?' on-dark':'');s.insertBefore(i,s.firstChild);list.push([s,i])});
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var t=0,vh=innerHeight;function u(){t=0;list.forEach(function(p){var r=p[0].getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;var d=(r.top+r.height/2-vh/2);p[1].style.setProperty('--wm',(d*-0.3).toFixed(1)+'px');p[1].style.setProperty('--wr',(d*0.02).toFixed(2)+'deg')})}
addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(u)},{passive:true});addEventListener('resize',function(){vh=innerHeight;u()});u()})();

(function(){var imgs=[].slice.call(document.querySelectorAll('.gal figure img'));if(!imgs.length)return;var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.innerHTML='<button class="x" aria-label="Đóng">&times;</button><button class="pv" aria-label="Ảnh trước">&#8249;</button><img alt=""><p></p><button class="nx" aria-label="Ảnh sau">&#8250;</button>';document.body.appendChild(lb);var im=lb.querySelector('img'),cp=lb.querySelector('p'),set=[],k=0;
function show(){var e=set[k];im.src=e.currentSrc||e.src;im.alt=e.alt;cp.textContent=e.alt||''}
function open(e){var g=e.closest('.gal');set=[].slice.call(g.querySelectorAll('figure img'));k=set.indexOf(e);show();lb.classList.add('on');document.body.classList.add('no-scroll');lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on');document.body.classList.remove('no-scroll')}
function go(d){k=(k+d+set.length)%set.length;show()}
imgs.forEach(function(e){e.setAttribute('tabindex','0');e.addEventListener('click',function(){open(e)});e.addEventListener('keydown',function(v){if(v.key==='Enter')open(e)})});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){go(-1)};lb.querySelector('.nx').onclick=function(){go(1)};lb.addEventListener('click',function(v){if(v.target===lb)close()});
document.addEventListener('keydown',function(v){if(!lb.classList.contains('on'))return;if(v.key==='Escape')close();if(v.key==='ArrowLeft')go(-1);if(v.key==='ArrowRight')go(1)});
var sx=0;lb.addEventListener('touchstart',function(v){sx=v.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(v){var d=v.changedTouches[0].clientX-sx;if(Math.abs(d)>50)go(d<0?1:-1)})})();

(function(){var f=document.getElementById('leadForm');if(!f)return;var home=f.parentNode,next=f.nextSibling,fm=document.createElement('div');fm.className='fm';fm.setAttribute('role','dialog');fm.setAttribute('aria-modal','true');fm.setAttribute('aria-label','Đăng ký thăm khám');fm.innerHTML='<div class="fm-box"><p class="fm-h">Đăng ký thăm khám với bác sĩ</p><button class="x" aria-label="Đóng">&times;</button></div>';document.body.appendChild(fm);var box=fm.querySelector('.fm-box');
function open(){box.appendChild(f);fm.classList.add('on');document.body.classList.add('no-scroll');setTimeout(function(){var n=document.getElementById('name');if(n)n.focus()},50)}
function close(){fm.classList.remove('on');document.body.classList.remove('no-scroll');home.insertBefore(f,next)}
document.querySelectorAll('a[href="#dat-lich"]').forEach(function(a){a.addEventListener('click',function(v){v.preventDefault();open()})});
fm.querySelector('.x').onclick=close;fm.addEventListener('click',function(v){if(v.target===fm)close()});document.addEventListener('keydown',function(v){if(v.key==='Escape'&&fm.classList.contains('on'))close()})})();

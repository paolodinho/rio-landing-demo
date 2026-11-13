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

/* Configure with the verified numeric ID from the old site's VK.Widgets.Group call.
   Until then, no external VK requests are made and the old-site fallback is shown. */
(function(){
  'use strict';
  const communityId = null; // Replace with the original community's positive numeric ID.
  if (!Number.isSafeInteger(communityId) || communityId <= 0) return;
  const url='https://vk.com/club'+communityId;
  document.querySelectorAll('[data-vk-footer],[data-vk-direct]').forEach(a=>{
    a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.hidden=false;
  });
  const host=document.getElementById('vk-community-widget');
  const fallback=document.getElementById('vk-community-fallback');
  const link=document.getElementById('vk-community-link');
  if(!host||!fallback||!link)return;
  link.href=url;link.textContent='Перейти в сообщество ВКонтакте ↗';
  let started=false;
  function load(){
    if(started)return;started=true;
    const showFallback=()=>{host.hidden=true;fallback.hidden=false;};
    const initialize=()=>{
      try{
        if(!window.VK?.Widgets?.Group)throw Error('VK widget unavailable');
        host.hidden=false;fallback.hidden=true;
        window.VK.Widgets.Group(host.id,{mode:3,width:'auto'},communityId);
        const timeout=setTimeout(()=>{
          if(!host.querySelector('iframe'))showFallback();
        },8000);
        const observer=new MutationObserver(()=>{
          if(host.querySelector('iframe')){clearTimeout(timeout);observer.disconnect();}
        });
        observer.observe(host,{childList:true,subtree:true});
        if(host.querySelector('iframe')){clearTimeout(timeout);observer.disconnect();}
        else setTimeout(()=>observer.disconnect(),8500);
      }catch{showFallback();}
    };
    if(window.VK?.Widgets?.Group){initialize();return;}
    const script=document.createElement('script');
    script.src='https://vk.com/js/api/openapi.js';
    script.async=true;script.onload=initialize;script.onerror=showFallback;
    document.head.appendChild(script);
  }
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){observer.disconnect();load();}
    },{rootMargin:'220px 0px'});
    observer.observe(document.getElementById('community'));
  }else{load();}
})();

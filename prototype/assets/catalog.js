/* Catalogue: shared product data, responsive filtering and shape-first browsing. */
(function(){
  'use strict';
  const shapes=[
    ['all','Все товары',null],['round','Круглые','bn001'],['oval','Овальные','bn26'],
    ['baguette','Багетные','bread:baguette'],['triangle','Треугольные','bn09'],
    ['heart','Сердечки','bn28'],['diamond','Ромбы','bn30'],['boat','Лодочки','bn29'],['tools','Аксессуары',null]
  ];
  const shapeLabels=Object.fromEntries([...shapes.map(x=>[x[0],x[1]]),['figure','Все фигурные']]);
  const weights=[['all','Любой вес'],['small','До 400 г'],['mid','401–600 г'],['large','601–850 г'],['xl','Более 850 г']];
  const prices=[['all','Любая цена'],['low','До 700 ₽'],['mid','701–900 ₽'],['high','От 901 ₽']];
  const sorts=[['featured','Рекомендуемые'],['price-up','Сначала дешевле'],['price-down','Сначала дороже'],['weight-up','Вес теста: по возрастанию'],['weight-down','Вес теста: по убыванию'],['discount','По размеру скидки']];
  const featured=['bn001','bn09','bn11','bn24','bn26','bn27','bn28','bn29','bn30'];
  const figures=['triangle','heart','diamond','boat','square','rectangle','ring'];
  const breadShapes={round:'round',oval:'oval',baguette:'baguette',triangle:'triangle',heart:'heart',diamond:'diamond',boat:'oval',square:'square',rectangle:'rectangle',ring:'ring'};
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number(n).toLocaleString('ru-RU')+' ₽';
  const sale=p=>Number(p.oldPrice)>Number(p.price);
  const discount=p=>sale(p)?Math.round(100*(p.oldPrice-p.price)/p.oldPrice):0;
  const normalize=s=>String(s??'').toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/×/g,'x').trim();
  const compact=s=>normalize(s).replace(/[^\p{L}\p{N}]/gu,'');
  const defaults=()=>({shape:'all',weight:'all',price:'all',sale:false,q:'',sort:'featured'});
  function shapeMatch(p,shape){return shape==='all'||(shape==='tools'?['tool','cloth'].includes(p.shape):shape==='figure'?figures.includes(p.shape):p.shape===shape);}
  function matches(p,f){
    if(!shapeMatch(p,f.shape))return false;
    if(f.sale&&!sale(p))return false;
    if(f.weight!=='all'){
      const w=Number(p.weight);if(!(w>0))return false;
      if(f.weight==='small'&&w>400||f.weight==='mid'&&(w<=400||w>600)||f.weight==='large'&&(w<=600||w>850)||f.weight==='xl'&&w<=850)return false;
    }
    if(f.price==='low'&&p.price>700||f.price==='mid'&&(p.price<=700||p.price>900)||f.price==='high'&&p.price<=900)return false;
    const q=normalize(f.q);if(!q)return true;
    const sku=compact(q).replace(/^бн/,'bn');
    if(/^bn\d+$/.test(sku))return compact(p.sku)===sku;
    const hay=normalize([p.title,p.sku,p.kind,p.size,p.weightText,shapeLabels[p.shape]||''].join(' '));
    return q.split(/\s+/).every(t=>hay.includes(t)||compact(hay).includes(compact(t)));
  }
  function selectProducts(products,f){
    const found=products.filter(p=>matches(p,f));
    const rank=p=>{const i=featured.indexOf(p.id);return i<0?featured.length+products.indexOf(p):i;};
    const order={
      featured:(a,b)=>rank(a)-rank(b),
      'price-up':(a,b)=>a.price-b.price,'price-down':(a,b)=>b.price-a.price,
      'weight-up':(a,b)=>(a.weight||Infinity)-(b.weight||Infinity),
      'weight-down':(a,b)=>(b.weight||-1)-(a.weight||-1),
      discount:(a,b)=>discount(b)-discount(a)
    };
    return found.sort((a,b)=>(order[f.sort]||order.featured)(a,b)||rank(a)-rank(b));
  }
  function plural(n){const a=n%10,b=n%100;return b>=11&&b<=14?'товаров':a===1?'товар':a>=2&&a<=4?'товара':'товаров';}
  function options(items){return items.map(([v,l])=>`<option value="${escape(v)}">${escape(l)}</option>`).join('');}
  function create({products,app}){
    let state=defaults();
    const get=id=>products.find(p=>p.id===id);
    const root=()=>app.querySelector('.catalog-shop');
    const query=(s)=>root()?.querySelector(s);
    function set(patch,reset=false){state={...(reset?defaults():state),...patch};if(!Object.hasOwn(shapeLabels,state.shape))state.shape='all';for(const [key,arr] of [['weight',weights],['price',prices],['sort',sorts]])if(!arr.some(x=>x[0]===state[key]))state[key]=defaults()[key];state.sale=!!state.sale;state.q=String(state.q??'').slice(0,120);refresh();}
    function reset(){set({sort:state.sort},true);}
    function active(){return [['shape',state.shape!=='all'?shapeLabels[state.shape]:null],['weight',state.weight!=='all'?weights.find(x=>x[0]===state.weight)?.[1]:null],['price',state.price!=='all'?prices.find(x=>x[0]===state.price)?.[1]:null],['sale',state.sale?'Со скидкой':null],['q',state.q.trim()?`Поиск: ${state.q.trim()}`:null]].filter(x=>x[1]);}
    function categoryVisual(code,src){
      if(src){const url=src.startsWith('bread:')?'v3/assets/bread/'+src.slice(6)+'.webp':get(src)?.image;if(url)return `<img src="${escape(url)}" alt="" decoding="async">`;}
      if(code==='all')return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="6" width="15" height="15" rx="5"/><rect x="27" y="6" width="15" height="15" rx="5"/><rect x="6" y="27" width="15" height="15" rx="5"/><rect x="27" y="27" width="15" height="15" rx="5"/></svg>';
      return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 34 33 13l5 5-21 21H9zM29 17l5 5M13 10h9v10M10 13h7M27 32h13v8H27z"/><path d="M30 35h7"/></svg>';
    }
    function categoryCards(){return shapes.map(([code,label,src])=>{const n=products.filter(p=>shapeMatch(p,code)).length;return `<button type="button" class="cat-category" data-cat-shape="${code}" aria-pressed="${state.shape===code}"><span class="cat-category-image">${categoryVisual(code,src)}</span><strong>${escape(label)}</strong><small>${n} ${plural(n)}</small></button>`;}).join('');}
    function filterControls(prefix){return `<div class="cat-filter-heading"><h2>Фильтры</h2><button type="button" class="cat-text-button" data-cat-action="reset">Сбросить</button></div>
      <div class="cat-filter-group"><label for="${prefix}-shape">Форма корзинки</label><select id="${prefix}-shape" data-cat-filter="shape">${options([...shapes.map(x=>[x[0],x[1]]),['figure','Все фигурные']])}</select></div>
      <div class="cat-filter-group"><label for="${prefix}-weight">Вес теста до выпечки</label><select id="${prefix}-weight" data-cat-filter="weight">${options(weights)}</select><small>Ориентир — указанная вместимость корзинки.</small></div>
      <div class="cat-filter-group"><label for="${prefix}-price">Цена</label><select id="${prefix}-price" data-cat-filter="price">${options(prices)}</select></div>
      <label class="cat-sale-check"><input type="checkbox" data-cat-filter="sale"><span>Только со скидкой</span><small>${products.filter(sale).length}</small></label>`;}
    function render(){return `<div class="container catalog-shop"><div class="breadcrumb"><a href="v3/index.html">Главная</a> / Каталог</div>
      <header class="cat-heading"><div><h1>Корзинки для расстойки теста</h1><p>Подберите форму и размер под вес вашего теста. Корзинки из ротанга и инструменты для выпечки.</p></div><a class="cat-guide" href="v3/index.html#guides">Как выбрать корзинку? ↗</a></header>
      <section class="cat-categories" aria-label="Категории товаров"><div class="cat-category-strip">${categoryCards()}</div></section>
      <div class="catalog-layout cat-layout"><aside class="filter-pane cat-sidebar" aria-label="Фильтры каталога">${filterControls('cat-desktop')}<div class="cat-help"><strong>Не уверены в размере?</strong><p>Начните с веса тестовой заготовки по вашему рецепту.</p><a href="v3/index.html#guides">Советы по выбору ↗</a></div></aside>
      <section class="catalog-main cat-main" aria-label="Товары"><div class="cat-toolbar"><div class="cat-search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input type="search" id="filter-query" data-cat-filter="q" maxlength="120" placeholder="Название или артикул" aria-label="Поиск по каталогу"></div><div class="cat-sort"><select data-cat-filter="sort" id="cat-sort" aria-label="Сортировка товаров">${options(sorts)}</select></div><button type="button" class="cat-filter-trigger" data-cat-action="open" aria-controls="catalog-filter-dialog" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18M8 3v6M16 9v6M10 15v6"/></svg>Фильтры<span data-cat-filter-count hidden></span></button></div>
      <div class="cat-results-head"><span id="results-counter" class="results" role="status" aria-live="polite"></span><div class="cat-chips" data-cat-chips></div></div><div id="catalog-results" class="products-grid"></div></section></div>
      <dialog id="catalog-filter-dialog" class="cat-filter-dialog" aria-label="Фильтры каталога"><div class="cat-dialog-head"><strong>Подбор товаров</strong><button type="button" class="cat-dialog-close" data-cat-action="close" aria-label="Закрыть фильтры" autofocus>×</button></div><div class="cat-dialog-body">${filterControls('cat-mobile')}</div><div class="cat-dialog-foot"><button type="button" class="btn btn-primary" data-cat-action="close" data-cat-apply>Показать товары</button></div></dialog>
      <section class="cat-wholesale"><div><h2>Корзинки для пекарни</h2><p>Поможем подобрать нужные формы и количество под ваш ассортимент.</p></div><a class="btn btn-primary" href="#wholesale">Оптовым покупателям ↗</a></section></div>`;}
    function card(p,i){
      const href='#product-'+escape(p.id),name=p.title.endsWith(', '+p.size)?p.title.slice(0,-p.size.length-2):p.title;
      const bread=breadShapes[p.shape]?'v3/assets/bread/'+breadShapes[p.shape]+'.webp':'';
      const loading=i<3?'eager':'lazy';
      const image=p.image?`<img class="real-photo cat-main-photo" src="${escape(p.image)}" alt="${escape(p.exact===false?'Фото аналогичной модели':p.title)}" loading="${loading}" decoding="async">`:'';
      return `<article class="product-card cat-card" data-product-id="${escape(p.id)}"><div class="cat-picture-wrap"><a class="card-picture" href="${href}" aria-label="${escape('Подробнее: '+p.title)}"><div class="product-art cat-art"><div class="woven ${escape(p.shape)}" aria-hidden="true"></div>${image}${bread?`<img class="bread-preview cat-bread-photo" src="${bread}" alt="" aria-hidden="true" loading="lazy" decoding="async">`:''}</div></a>${sale(p)?`<span class="cat-discount">−${discount(p)}%</span>`:''}${bread?'<button type="button" class="cat-preview" data-cat-action="preview" aria-pressed="false" aria-label="Показать пример готового хлеба">Хлеб ↔</button><span class="cat-bread-note">Пример выпечки</span>':''}</div><div class="product-card-content"><span class="cat-sku">${escape(p.sku)}</span><a href="${href}"><h3>${escape(name)}</h3></a><div class="cat-specs"><span class="cat-weight">${escape(p.weight?p.weightText+' теста':p.weightText)}</span><span>${escape(p.size)}</span></div>${p.exact===false?'<small class="photo-analogue">Фото аналога</small>':''}<div class="card-buy"><div class="card-prices${sale(p)?' on-sale':''}">${sale(p)?`<del>${fmt(p.oldPrice)}</del>`:''}<strong class="price">${fmt(p.price)}</strong></div><button type="button" class="btn btn-primary btn-sm" data-action="add" data-id="${escape(p.id)}">В корзину ↗</button></div></div></article>`;
    }
    function sync(){const r=root();if(!r)return;r.querySelectorAll('[data-cat-filter]').forEach(el=>{const k=el.dataset.catFilter;if(el.type==='checkbox'){el.checked=!!state[k];}else if(el.value!==String(state[k]))el.value=String(state[k]);});r.querySelectorAll('[data-cat-shape]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.catShape===state.shape)));const a=active();const b=r.querySelector('[data-cat-filter-count]');if(b){const count=a.filter(x=>x[0]!=='q').length;b.hidden=!count;b.textContent=count||'';}r.querySelectorAll('[data-cat-chips]').forEach(el=>{el.innerHTML=a.map(([k,v])=>`<button type="button" data-cat-clear="${k}" class="cat-chip" aria-label="Убрать фильтр: ${escape(v)}"><span>${escape(v)}</span><span aria-hidden="true">×</span></button>`).join('')+(a.length>1?'<button type="button" class="cat-text-button" data-cat-action="reset">Сбросить всё</button>':'');});}
    function refresh(){const r=root();if(!r)return;sync();const found=selectProducts(products,state);const area=r.querySelector('#catalog-results');area.innerHTML=found.length?found.map(card).join(''):'<div class="cat-empty"><h2>Нет подходящих товаров</h2><p>Попробуйте изменить форму, вес теста или диапазон цен.</p><button type="button" class="btn btn-outline" data-cat-action="reset">Сбросить фильтры</button></div>';const n=found.length;r.querySelector('#results-counter').textContent=`Найдено: ${n} ${plural(n)}`;const apply=r.querySelector('[data-cat-apply]');if(apply)apply.textContent=`Показать ${n} ${plural(n)}`;}
    function closeFilter(restore=true){const dlg=query('#catalog-filter-dialog');const trigger=query('[data-cat-action="open"]');if(dlg?.open)dlg.close();document.body.classList.remove('catalog-filter-open');trigger?.setAttribute('aria-expanded','false');if(restore&&trigger&&trigger.offsetParent)trigger.focus({preventScroll:true});}
    function openFilter(){const dlg=query('#catalog-filter-dialog');if(!dlg||dlg.open)return;dlg.showModal();document.body.classList.add('catalog-filter-open');query('[data-cat-action="open"]')?.setAttribute('aria-expanded','true');}
    app.addEventListener('click',e=>{
      const r=root();if(!r||!r.contains(e.target))return;
      const category=e.target.closest('[data-cat-shape]');if(category){set({shape:category.dataset.catShape});return;}
      const chip=e.target.closest('[data-cat-clear]');if(chip){const k=chip.dataset.catClear;if(Object.hasOwn(defaults(),k))set({[k]:defaults()[k]});query('#filter-query')?.focus({preventScroll:true});return;}
      const btn=e.target.closest('[data-cat-action]');if(btn){switch(btn.dataset.catAction){case 'reset':reset();break;case 'open':openFilter();break;case 'close':closeFilter();break;case 'preview':{const article=btn.closest('.cat-card');const on=article.classList.toggle('cat-show-bread');btn.setAttribute('aria-pressed',String(on));btn.setAttribute('aria-label',on?'Показать корзинку':'Показать пример готового хлеба');btn.textContent=on?'Корзинка ↔':'Хлеб ↔';break;}}return;}
      const dlg=query('#catalog-filter-dialog');if(dlg?.open&&e.target===dlg){const rect=dlg.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeFilter();}
    });
    app.addEventListener('input',e=>{if(e.target.dataset.catFilter==='q')set({q:e.target.value});});
    app.addEventListener('change',e=>{const k=e.target.dataset.catFilter;if(k&&k!=='q'&&Object.hasOwn(defaults(),k))set({[k]:e.target.type==='checkbox'?e.target.checked:e.target.value});});
    app.addEventListener('close',e=>{if(e.target.id==='catalog-filter-dialog'&&!e.target.open){document.body.classList.remove('catalog-filter-open');query('[data-cat-action="open"]')?.setAttribute('aria-expanded','false');}},true);
    app.addEventListener('error',e=>{const img=e.target;if(img.matches?.('.cat-main-photo,.cat-bread-photo,.cat-category-image img'))img.remove();},true);
    const mq=window.matchMedia('(max-width: 880px)');const onResize=()=>{if(!mq.matches&&query('#catalog-filter-dialog')?.open)closeFilter(false);};if(mq.addEventListener)mq.addEventListener('change',onResize);else mq.addListener(onResize);
    return Object.freeze({render,refresh,sync,set,reset,closeFilter,getFilters:()=>({...state})});
  }
  window.HlebCatalog=Object.freeze({create,defaults,matches,selectProducts,shapeMatch});
})();
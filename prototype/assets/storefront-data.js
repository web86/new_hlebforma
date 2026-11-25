/* Shared demo catalogue and tab-local state, no personal data. */
(function(){
  'use strict';
  const products=[
  {
    "id": "bn10",
    "sku": "BN 10",
    "title": "Корзинка овальная, 25 × 15 × 8 см",
    "shape": "oval",
    "weight": 550,
    "weightText": "500–550 г",
    "size": "25 × 15 × 8 см",
    "price": 690,
    "oldPrice": 790,
    "kind": "Овальные корзинки",
    "image": "products/bn-10.webp",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn01",
    "sku": "BN 01",
    "title": "Корзинка круглая, 22 × 8,5 см",
    "shape": "round",
    "weight": 800,
    "weightText": "700–800 г",
    "size": "22 × 8,5 см",
    "price": 650,
    "oldPrice": 760,
    "kind": "Круглые корзинки",
    "image": "https://hleb-forma.ru/image/cache//catalog/korzinka-iz-rotanga-kruglay-razmer-22-8-5-bn-01-52-260x210_0.jpg",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn06",
    "sku": "BN 06",
    "title": "Корзинка багетная, 55 × 10 × 7 см",
    "shape": "baguette",
    "weight": 550,
    "weightText": "500–550 г",
    "size": "55 × 10 × 7 см",
    "price": 750,
    "oldPrice": 850,
    "kind": "Багетные корзинки",
    "image": "https://hleb-forma.ru/image/cache//catalog/korzinka-iz-rotanga-bagetnay-razmer-55-10-7-bn-06-51-260x210_0.jpg",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn32",
    "sku": "BN 32",
    "title": "Корзинка овальная, 30 × 15 × 8 см",
    "shape": "oval",
    "weight": 900,
    "weightText": "около 900 г",
    "size": "30 × 15 × 8 см",
    "price": 880,
    "kind": "Овальные корзинки",
    "image": "products/bn-32.webp",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn11",
    "sku": "BN 11",
    "title": "Корзинка овальная, 28 × 14 × 8 см",
    "shape": "oval",
    "weight": 750,
    "weightText": "700–750 г",
    "size": "28 × 14 × 8 см",
    "price": 690,
    "oldPrice": 795,
    "kind": "Овальные корзинки",
    "image": "products/bn-11.webp",
    "exact": true,
    "bread": "../v3/assets/bread/oval.webp"
  },
  {
    "id": "bn08",
    "sku": "BN 08",
    "title": "Корзинка круглая, 25 × 8,5 см",
    "shape": "round",
    "weight": 1000,
    "weightText": "1000 г",
    "size": "25 × 8,5 см",
    "price": 770,
    "kind": "Круглые корзинки",
    "image": "https://hleb-forma.ru/image/cache//catalog/korzinka-iz-rotanga-kruglay-razmer-22-8-5-bn-01-52-260x210_0.jpg",
    "exact": false,
    "bread": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn07",
    "sku": "BN 07",
    "title": "Корзинка круглая, 30 × 8,5 см",
    "shape": "round",
    "weight": 1200,
    "weightText": "1200 г",
    "size": "30 × 8,5 см",
    "price": 890,
    "kind": "Круглые корзинки",
    "image": "https://hleb-forma.ru/image/cache//catalog/korzinka-iz-rotanga-kruglay-razmer-22-8-5-bn-01-52-260x210_0.jpg",
    "exact": false,
    "bread": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn04",
    "sku": "BN 04",
    "title": "Корзинка овальная, 35 × 15 × 7 см",
    "shape": "oval",
    "weight": 1200,
    "weightText": "1200 г",
    "size": "35 × 15 × 7 см",
    "price": 990,
    "kind": "Овальные корзинки",
    "image": "products/bn-04.webp",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn22",
    "sku": "BN 22",
    "title": "Корзинка овальная, 32 × 15 × 8,5 см",
    "shape": "oval",
    "weight": 950,
    "weightText": "950 г",
    "size": "32 × 15 × 8,5 см",
    "price": 980,
    "kind": "Овальные корзинки",
    "image": "products/bn-22.webp",
    "exact": true,
    "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=86"
  },
  {
    "id": "bn28",
    "sku": "BN 28",
    "title": "Корзинка в форме сердца, 20 × 17 × 7,5 см",
    "shape": "heart",
    "weight": 500,
    "weightText": "500 г",
    "size": "20 × 17 × 7,5 см",
    "price": 890,
    "kind": "Фигурные корзинки",
    "image": "products/bn-28.webp",
    "exact": true,
    "bread": "../v3/assets/bread/heart.webp"
  },
  {
    "id": "canvas",
    "sku": "Аксессуар",
    "title": "Холст для расстойки багетов",
    "shape": "cloth",
    "weight": 0,
    "weightText": "Для пекарни",
    "size": "Уточняется",
    "price": 950,
    "kind": "Инструменты пекаря",
    "image": "https://hleb-forma.ru/image/cache/catalog/001/holst2-907x680_0-260x210_0.jpg",
    "exact": true
  },
  {
    "id": "blade",
    "sku": "Аксессуар",
    "title": "Держатель лезвия для надрезов теста",
    "shape": "tool",
    "weight": 0,
    "weightText": "Для пекарни",
    "size": "Комплект уточняется",
    "price": 490,
    "kind": "Инструменты пекаря",
    "image": "https://hleb-forma.ru/image/cache/catalog/bakery-nife-260x210_0.jpg",
    "exact": true
  },
  {
    "id": "bn001",
    "sku": "BN 001",
    "title": "Корзинка круглая без гвоздиков, 21 × 9 см",
    "shape": "round",
    "weight": 700,
    "weightText": "700 г",
    "size": "21 × 9 см",
    "price": 990,
    "oldPrice": 1200,
    "kind": "Круглые корзинки",
    "image": "products/bn-001.webp",
    "exact": true,
    "bread": "../v3/assets/bread/round.webp"
  },
  {
    "id": "bn09",
    "sku": "BN 09",
    "title": "Корзинка треугольная, 23 × 23 × 23 × 8 см",
    "shape": "triangle",
    "weight": 650,
    "weightText": "600–650 г",
    "size": "23 × 23 × 23 × 8 см",
    "price": 650,
    "oldPrice": 750,
    "kind": "Треугольные корзинки",
    "image": "products/bn-09.webp",
    "exact": true,
    "bread": "../v3/assets/bread/triangle.webp"
  },
  {
    "id": "bn24",
    "sku": "BN 24",
    "title": "Корзинка треугольная, 20 × 20 × 20 × 6 см",
    "shape": "triangle",
    "weight": 500,
    "weightText": "500 г",
    "size": "20 × 20 × 20 × 6 см",
    "price": 670,
    "kind": "Треугольные корзинки",
    "image": "products/bn-24.webp",
    "exact": true,
    "bread": "../v3/assets/bread/triangle.webp"
  },
  {
    "id": "bn26",
    "sku": "BN 26",
    "title": "Корзинка овальная с колоском, 25 × 15 × 8 см",
    "shape": "oval",
    "weight": 600,
    "weightText": "550–600 г",
    "size": "25 × 15 × 8 см",
    "price": 980,
    "kind": "Овальные корзинки",
    "image": "products/bn-26.webp",
    "exact": true,
    "bread": "../v3/assets/bread/oval.webp"
  },
  {
    "id": "bn27",
    "sku": "BN 27",
    "title": "Корзинка круглая с рисунком солнца, 22 × 8,5 см",
    "shape": "round",
    "weight": 800,
    "weightText": "800 г",
    "size": "22 × 8,5 см",
    "price": 950,
    "kind": "Круглые корзинки",
    "image": "products/bn-27.webp",
    "exact": true,
    "bread": "../v3/assets/bread/round.webp"
  },
  {
    "id": "bn29",
    "sku": "BN 29",
    "title": "Корзинка в форме лодочки, 27 × 15 × 7,5 см",
    "shape": "boat",
    "weight": 0,
    "weightText": "Вместимость уточняется",
    "size": "27 × 15 × 7,5 см",
    "price": 960,
    "kind": "Фигурные корзинки",
    "image": "products/bn-29.webp",
    "exact": true,
    "bread": "../v3/assets/bread/oval.webp"
  },
  {
    "id": "bn30",
    "sku": "BN 30",
    "title": "Корзинка в форме ромба, 22 × 17 × 7,5 см",
    "shape": "diamond",
    "weight": 400,
    "weightText": "400 г",
    "size": "22 × 17 × 7,5 см",
    "price": 780,
    "kind": "Фигурные корзинки",
    "image": "products/bn-30.webp",
    "exact": true,
    "bread": "../v3/assets/bread/diamond.webp"
  }
];
  // Resolve catalogue assets relative to this shared script, not the page.
  const assetBase=new URL('.',document.currentScript.src);
  for(const p of products){
    if(p.image.startsWith('products/'))p.image=new URL(p.image,assetBase).href;
    if(p.bread&&p.bread.startsWith('../v3/assets/'))p.bread=new URL(p.bread,assetBase).href;
  }
  const ids=new Set(products.map(p=>p.id));
  function read(name,fallback){try{return JSON.parse(sessionStorage.getItem('hleb-demo-v1:'+name))??fallback;}catch{return fallback;}}
  function write(name,value){try{sessionStorage.setItem('hleb-demo-v1:'+name,JSON.stringify(value));}catch{}}
  function list(name){const value=read(name,[]);return Array.isArray(value)?[...new Set(value.filter(id=>ids.has(id)))]:[];}
  function basket(){const value=read('cart',{});return Object.fromEntries(Object.entries(value&&typeof value==='object'?value:{}).filter(([id,n])=>ids.has(id)&&Number.isInteger(n)&&n>0).map(([id,n])=>[id,Math.min(n,99)]));}
  window.HlebDemo=Object.freeze({products,read,write,list,basket});
})();

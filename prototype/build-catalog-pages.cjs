/* Build static category HTML from the shared storefront template. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
function generate(template,catalogScript,dataScript,wholesaleScript,articleData,articleScript,reviewData,reviewScript){
  const window={matchMedia:()=>({matches:false,addEventListener(){}})};
  new Function('window',catalogScript)(window);
  const catalogue=window.HlebCatalog;
  const productMatch=dataScript.match(/const products=(\[[\s\S]*?\]);/);
  if(!productMatch)throw Error('Missing catalogue data');
  const products=JSON.parse(productMatch[1]).map(p=>({...p,image:p.image.startsWith('products/')?'assets/'+p.image:p.image}));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const result=catalogue.pages.map(page=>{
    const base=page.alias?'../../prototype/index.html':'../prototype/index.html';
    const url='https://web86.github.io/new_hlebforma/katalog/'+(page.alias?page.alias+'/':'');
    const markup=catalogue.create({products,app:{querySelector:()=>null,addEventListener(){}},pageCode:page.code}).render();
    const rendered=template
      .replace('<html lang="ru">','<html lang="ru" data-catalog-page="'+esc(page.code)+'">')
      .replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <base href="'+base+'">')
      .replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(page.title)+'</title>')
      .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(page.description)+'">\n  <link rel="canonical" href="'+esc(url)+'">')
      .replace('<main id="app" class="main-space" tabindex="-1"></main>','<main id="app" class="main-space" tabindex="-1">'+markup+'</main>');
    if(!rendered.includes('data-catalog-page="'+page.code+'"')||!rendered.includes('<h1>'+esc(page.h1)+'</h1>')||!rendered.includes('<link rel="canonical"'))throw Error('Could not render '+page.code);
    return {path:'katalog/'+(page.alias?page.alias+'/':'')+'index.html',html:rendered,code:page.code};
  });
  if(wholesaleScript){
    new Function('window',wholesaleScript)(window);
    const wholesale=window.HlebWholesale, page=wholesale.meta;
    const markup=wholesale.create({products,app:{querySelector:()=>null,addEventListener(){}}}).render();
    const rendered=template
      .replace('<html lang="ru">','<html lang="ru" data-wholesale-page="true">')
      .replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <base href="../prototype/index.html">')
      .replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(page.title)+'</title>')
      .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(page.description)+'">\n  <link rel="canonical" href="https://web86.github.io/new_hlebforma/optom/">')
      .replace('<main id="app" class="main-space" tabindex="-1"></main>','<main id="app" class="main-space" tabindex="-1">'+markup+'</main>');
    if(!rendered.includes('data-wholesale-page="true"')||!rendered.includes('<h1>'+esc(page.h1)+'</h1>')||!rendered.includes('id="quote-form"'))throw Error('Could not render wholesale page');
    result.push({path:'optom/index.html',html:rendered,code:'wholesale'});
  }
  if(articleData&&articleScript){
    new Function('window',articleData)(window);new Function('window',articleScript)(window);
    const articles=window.HlebArticles;
    for(const post of [null,...articles.posts]){
      const page=post?post.alias:'listing',dir='blog/'+(post?post.alias+'/':'');
      const markup=articles.create({products,app:{querySelector:()=>null,addEventListener(){}},page}).render();
      const rendered=template
        .replace('<html lang="ru">','<html lang="ru" data-article-page="'+esc(page)+'">')
        .replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <base href="'+(post?'../../prototype/index.html':'../prototype/index.html')+'">')
        .replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(post?articles.title(post):articles.meta.title)+'</title>')
        .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(post?post.desc:articles.meta.desc)+'">\n  <link rel="canonical" href="https://web86.github.io/new_hlebforma/'+dir+'">')
        .replace('<main id="app" class="main-space" tabindex="-1"></main>','<main id="app" class="main-space" tabindex="-1">'+markup+'</main>');
      if(!rendered.includes('data-article-page="'+page+'"')||!rendered.includes('<h1>'+esc(post?post.title:articles.meta.h1)+'</h1>'))throw Error('Could not render article '+page);
      result.push({path:dir+'index.html',html:rendered,code:page});
    }
  }
  if(reviewData&&reviewScript){
    new Function('window',reviewData)(window);new Function('window',reviewScript)(window);
    const reviews=window.HlebReviews,page=reviews.meta;
    const markup=reviews.create({products,app:{querySelector:()=>null,addEventListener(){}}}).render();
    const rendered=template
      .replace('<html lang="ru">','<html lang="ru" data-reviews-page="true">')
      .replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <base href="../prototype/index.html">')
      .replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(page.title)+'</title>')
      .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(page.description)+'">\n  <link rel="canonical" href="https://web86.github.io/new_hlebforma/otzyvy/">')
      .replace('<main id="app" class="main-space" tabindex="-1"></main>','<main id="app" class="main-space" tabindex="-1">'+markup+'</main>');
    if(!rendered.includes('data-reviews-page="true"')||!rendered.includes('<h1>'+esc(page.h1)+'</h1>'))throw Error('Could not render reviews');
    result.push({path:'otzyvy/index.html',html:rendered,code:'reviews'});
  }
  const promo=catalogue.promotionMeta;
  const promoMarkup=catalogue.create({products,app:{querySelector:()=>null,addEventListener(){}}}).renderPromotions();
  const promoHtml=template
    .replace('<html lang="ru">','<html lang="ru" data-promotions-page="true">')
    .replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <base href="../prototype/index.html">')
    .replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(promo.title)+'</title>')
    .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(promo.description)+'">\n  <link rel="canonical" href="https://web86.github.io/new_hlebforma/akcii/">')
    .replace('<main id="app" class="main-space" tabindex="-1"></main>','<main id="app" class="main-space" tabindex="-1">'+promoMarkup+'</main>');
  if(!promoHtml.includes('data-promotions-page="true"')||!promoHtml.includes('<h1>'+esc(promo.h1)+'</h1>'))throw Error('Could not render promotions');
  result.push({path:'akcii/index.html',html:promoHtml,code:'sale'});
  return result;
}
module.exports=generate;
if(require.main===module){
  const out=process.argv[2]||'_site';
  const base=__dirname;
  const pages=generate(fs.readFileSync(path.join(base,'index.html'),'utf8'),fs.readFileSync(path.join(base,'assets/catalog.js'),'utf8'),fs.readFileSync(path.join(base,'assets/storefront-data.js'),'utf8'),fs.readFileSync(path.join(base,'assets/wholesale.js'),'utf8'),fs.readFileSync(path.join(base,'assets/article-data.js'),'utf8'),fs.readFileSync(path.join(base,'assets/articles.js'),'utf8'),fs.readFileSync(path.join(base,'assets/review-data.js'),'utf8'),fs.readFileSync(path.join(base,'assets/reviews.js'),'utf8'));
  for(const p of pages){const dest=path.join(out,p.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,p.html);}
  console.log('Generated '+pages.length+' standalone storefront pages');
  require('./version-assets.cjs').stampSite(out);
}

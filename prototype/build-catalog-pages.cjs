/* Build static category HTML from the shared storefront template. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
function generate(template,catalogScript,dataScript){
  const window={matchMedia:()=>({matches:false,addEventListener(){}})};
  new Function('window',catalogScript)(window);
  const catalogue=window.HlebCatalog;
  const productMatch=dataScript.match(/const products=(\[[\s\S]*?\]);/);
  if(!productMatch)throw Error('Missing catalogue data');
  const products=JSON.parse(productMatch[1]).map(p=>({...p,image:p.image.startsWith('products/')?'assets/'+p.image:p.image}));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return catalogue.pages.map(page=>{
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
}
module.exports=generate;
if(require.main===module){
  const out=process.argv[2]||'_site';
  const base=__dirname;
  const pages=generate(fs.readFileSync(path.join(base,'index.html'),'utf8'),fs.readFileSync(path.join(base,'assets/catalog.js'),'utf8'),fs.readFileSync(path.join(base,'assets/storefront-data.js'),'utf8'));
  for(const p of pages){const dest=path.join(out,p.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,p.html);}
  console.log('Generated '+pages.length+' standalone catalogue pages');
}

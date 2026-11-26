/* Stamp all published local CSS/JS URLs with the deployment revision.
 * The source templates and canonical URLs are unchanged. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function attribute(tag,name){
  const match=tag.match(new RegExp('\\s'+name+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i'));
  return match?(match[1]??match[2]??match[3]):null;
}
function versionUrl(url,version){
  if(!url||/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url))return url;
  const hashAt=url.indexOf('#'),fragment=hashAt<0?'':url.slice(hashAt),base=hashAt<0?url:url.slice(0,hashAt);
  const q=base.indexOf('?'),pathname=q<0?base:base.slice(0,q);
  if(!/\.(?:css|m?js)$/i.test(pathname))return url;
  const params=q<0?[]:base.slice(q+1).split(/&amp;|&/i).filter(p=>p&&p.split('=')[0]!=='v');
  params.push('v='+version);
  return pathname+'?'+params.join('&amp;')+fragment;
}
function stampHtml(html,version){
  if(!/^[a-zA-Z0-9_-]+$/.test(version))throw Error('Invalid asset version');
  let references=0;
  // Consume complete inline scripts/styles and comments, not tag-like strings inside them.
  const output=html.replace(/<!--[\s\S]*?-->|<script\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?<\/script\s*>|<style\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?<\/style\s*>|<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi,block=>{
    if(/^<!--|^<style\b/i.test(block))return block;
    const tag=block.match(/^<(?:script|link)\b(?:[^>"']|"[^"]*"|'[^']*')*>/i)?.[0];
    if(!tag)return block;
    const isScript=/^<script\b/i.test(tag),rel=(attribute(tag,'rel')||'').toLowerCase().split(/\s+/),as=(attribute(tag,'as')||'').toLowerCase();
    if(!isScript&&!rel.includes('stylesheet')&&!rel.includes('modulepreload')&&!(rel.includes('preload')&&['style','script'].includes(as)))return block;
    const name=isScript?'src':'href';
    const value=attribute(tag,name);
    const revised=versionUrl(value,version);
    if(value===null||revised===value)return block;
    const rewritten=tag.replace(new RegExp('(\\s'+name+'\\s*=\\s*)(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i'),(_,prefix)=>prefix+'"'+revised+'"');
    references++;
    return rewritten+block.slice(tag.length);
  });
  return {html:output,references};
}
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(entry=>{
    const full=path.join(dir,entry.name);
    return entry.isDirectory()?walk(full):entry.isFile()?[full]:[];
  });
}
function stampSite(dir,revision=process.env.GITHUB_SHA){
  const files=walk(dir),htmlFiles=files.filter(file=>/\.html?$/i.test(file));
  // Local builds use a content fingerprint instead of a CI commit SHA.
  const version=revision||crypto.createHash('sha256').update(files.filter(file=>/\.(?:html?|css|m?js)$/i.test(file)).map(file=>path.relative(dir,file)+'\0'+fs.readFileSync(file,'utf8')).join('\0')).digest('hex');
  let references=0;
  for(const file of htmlFiles){
    const original=fs.readFileSync(file,'utf8'),result=stampHtml(original,version);
    if(result.html!==original)fs.writeFileSync(file,result.html);
    references+=result.references;
  }
  console.log('Asset version '+version+': '+references+' local CSS/JS references updated across '+htmlFiles.length+' HTML files');
  return {version,references,pages:htmlFiles.length};
}
module.exports={versionUrl,stampHtml,stampSite};

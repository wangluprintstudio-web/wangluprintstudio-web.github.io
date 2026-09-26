'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='.git'?[]:e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
if(process.argv.includes('--original')){
 const manifest=require('../migration/original-file-manifest.json');
 for(const file of manifest.files)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file.path))).digest('hex'),file.sha256,'Differs from historical migration snapshot: '+file.path);
 console.log('Original migration snapshot matches.');
}
let count=0;
for(const p of files(root).filter(p=>p.endsWith('.html'))){
 const text=fs.readFileSync(p,'utf8'),ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'Duplicate HTML id in '+path.basename(p));
 function check(ref){
  if(/^(https?:|mailto:|data:|tel:)/.test(ref))return;
  const [target,anchor]=ref.split('#');
  assert.ok(!target.startsWith('/'),'Root-dependent path '+ref);
  const linked=target?path.resolve(path.dirname(p),target.split('?')[0]):p;
  assert.ok(linked.startsWith(root+path.sep)||linked===root,'Path leaves site: '+ref);
  assert.ok(fs.existsSync(linked),'Missing '+ref+' in '+path.basename(p));
  if(anchor)assert.ok(fs.readFileSync(linked,'utf8').includes('id="'+anchor+'"'),'Missing anchor '+ref);
 }
 for(const [,ref] of text.matchAll(/(?:href|src)="([^"]+)"/g))check(ref);
 for(const [,set] of text.matchAll(/srcset="([^"]+)"/g))for(const item of set.split(','))check(item.trim().split(/\s/)[0]);
 count++;
}
console.log('PASS: '+count+' HTML pages; all local resources, anchors and unique IDs validated.');

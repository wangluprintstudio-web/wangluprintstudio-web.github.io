'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),manifest=require('../migration/original-file-manifest.json');
for(const file of manifest.files){
 const p=path.join(root,file.path),b=fs.readFileSync(p);
 assert.equal(crypto.createHash('sha256').update(b).digest('hex'),file.sha256,'Original file changed: '+file.path);
 if(!file.path.endsWith('.html'))continue;
 const text=b.toString('utf8');
 for(const [,ref] of text.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const [target,anchor]=ref.split('#'),relative=target||file.path;
  assert.ok(!relative.startsWith('/'),'Root-dependent path '+relative);
  const linked=path.join(path.dirname(p),relative);
  assert.ok(fs.existsSync(linked),'Missing '+ref+' in '+file.path);
  if(anchor)assert.ok(fs.readFileSync(linked,'utf8').includes('id="'+anchor+'"'),'Missing anchor '+ref);
 }
 for(const [,set] of text.matchAll(/srcset="([^"]+)"/g))for(const item of set.split(','))assert.ok(fs.existsSync(path.join(root,item.trim().split(/\s/)[0])),'Missing responsive image');
}
console.log('PASS: '+manifest.files.length+' original files preserved byte-for-byte; all relative paths and anchors resolve.');

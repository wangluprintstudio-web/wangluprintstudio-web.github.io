'use strict';
const unitTabs=[...document.querySelectorAll('[data-unit]')];
function selectUnit(button,focus=false){
 const unit=button.dataset.unit;
 unitTabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 document.querySelectorAll('.route-panel').forEach(panel=>{panel.hidden=panel.id!=='unit-'+unit;});
 document.querySelectorAll('[data-plan-unit]').forEach(zone=>zone.classList.toggle('highlight',zone.dataset.planUnit===unit));
 if(focus)button.focus();
}
unitTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectUnit(tab));
 tab.addEventListener('keydown',event=>{
  let next;if(event.key==='ArrowRight')next=(index+1)%unitTabs.length;
  else if(event.key==='ArrowLeft')next=(index+unitTabs.length-1)%unitTabs.length;
  else if(event.key==='Home')next=0;else if(event.key==='End')next=unitTabs.length-1;else return;
  event.preventDefault();selectUnit(unitTabs[next],true);
 });
});

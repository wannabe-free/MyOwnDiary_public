'use strict';
(async()=>{
  const base = new URL('.', document.currentScript?.src || new URL('site.js', document.baseURI));
  const response = await fetch(new URL('brand.json', base));
  if (!response.ok) return;
  const brand = await response.json();
  document.querySelectorAll('[data-brand]').forEach(node=>{node.textContent=brand.displayName;});
  document.title = `${brand.displayName} · ${document.title}`;
  for (const [attribute, field] of [['data-operator','operatorName'], ['data-developer','developerName']]) {
    document.querySelectorAll(`[${attribute}]`).forEach(node => { node.textContent = brand[field] || '미설정'; });
  }
  for (const node of document.querySelectorAll('[data-delete-link]')) {
    if (typeof brand.accountDeletionUrl === 'string' && brand.accountDeletionUrl.startsWith('https://')) {
      const link=document.createElement('a'); link.href=brand.accountDeletionUrl;link.textContent='본인 확인 후 삭제 요청하기';link.rel='noopener noreferrer';node.replaceChildren(link);
    }
  }
  for (const node of document.querySelectorAll('[data-support]')) {
    if(typeof brand.supportEmail==='string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brand.supportEmail)) node.textContent=brand.supportEmail;
  }
})().catch(()=>{});

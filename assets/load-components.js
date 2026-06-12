// Simple component loader: replace elements with `data-include` attribute
(function(){
  async function load(el){
    const url = el.getAttribute('data-include');
    if(!url) return;
    try{
      const res = await fetch(url);
      if(!res.ok) throw new Error(res.statusText);
      el.innerHTML = await res.text();
    }catch(e){
      console.error('Include failed', url, e);
      el.innerHTML = '';
    }
  }
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-include]').forEach(el=> load(el));
  });
})();

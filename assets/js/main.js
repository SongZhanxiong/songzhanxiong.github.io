/* ---------- header menu, active nav link, topic filter ---------- */
(function(){
  const nav=document.getElementById('nav');
  const links=[...nav.querySelectorAll('a[href^="#"]')];

  // mobile menu
  document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
  links.forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  // highlight the nav link of the section in view
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting) links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
  }),{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('main>section[id]').forEach(s=>io.observe(s));

  // topic tags: dim the research entries that don't match
  const tags=document.querySelectorAll('.tag');
  let active=null;
  tags.forEach(t=>t.onclick=()=>{
    active=active===t.dataset.tag?null:t.dataset.tag;
    tags.forEach(x=>x.classList.toggle('on',x.dataset.tag===active));
    document.querySelectorAll('.pub').forEach(p=>p.classList.toggle('dim',!!active&&!p.dataset.tags.split(' ').includes(active)));
    if(active) document.getElementById('research').scrollIntoView({behavior:'smooth'});
  });

  document.getElementById('yr').textContent=new Date().getFullYear();
})();

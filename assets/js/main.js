/* ---------- page chrome ---------- */
(function(){
  const prog=document.getElementById('prog');
  const onScroll=()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;prog.style.width=(m>0?h.scrollTop/m*100:0)+'%';};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const nav=document.getElementById('nav'), links=[...nav.querySelectorAll('a[href^="#"]')];
  document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
  links.forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}),{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('main>section[id]').forEach(s=>io.observe(s));
  const news=document.getElementById('news'),more=document.getElementById('newsMore');
  more.onclick=()=>{const c=news.classList.toggle('collapsed');more.textContent=c?'All news ↓':'Fewer ↑';};
  document.querySelectorAll('.group-btn').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('closed'));
  let active=null;
  document.querySelectorAll('.tag').forEach(t=>t.onclick=()=>{
    active=active===t.dataset.tag?null:t.dataset.tag;
    document.querySelectorAll('.tag').forEach(x=>x.classList.toggle('on',x.dataset.tag===active));
    document.querySelectorAll('.pub').forEach(p=>p.classList.toggle('dim',!!active&&!p.dataset.tags.split(' ').includes(active)));
    if(active){document.querySelectorAll('.group').forEach(g=>g.classList.remove('closed'));document.getElementById('research').scrollIntoView({behavior:'smooth'});}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();


/* =====================================================================
   JOURNEY — edit the two lists below.
   PLACES: where things happened (lon/lat in decimal degrees; label side
           "r" | "l" | "t" | "b"; zh = Chinese name).
   STEPS:  the chapters of the story, in reading order. Each chapter
           points to a place and sets the camera (x, y, w, h in map units,
           0–1000 × 0–560). The route is drawn between chapter places.
   ===================================================================== */
const TYPES={home:{label:'Hometown',c:'#1c2b27'},study:{label:'Study',c:'#2d6a5d'},work:{label:'Work',c:'#3d6485'},research:{label:'Research',c:'#6f8a3a'},exchange:{label:'Exchange',c:'#8fb3a8'}};
// yrs = roughly how long I stayed (sets the landmark size); meta = the short line shown under the name
const PLACES={
  shenyang:{city:'Shenyang',zh:'沈阳',country:'China',iso:'CN',lon:123.43,lat:41.80,label:'r',type:'home',yrs:18,meta:'Hometown'},
  guangzhou:{city:'Guangzhou',zh:'广州',country:'China',iso:'CN',lon:113.26,lat:23.13,label:'l',type:'study',yrs:4,meta:'2011–15 · Bachelor'},
  innsbruck:{city:'Innsbruck',zh:'因斯布鲁克',country:'Austria',iso:'AT',lon:11.40,lat:47.27,label:'b',minor:true,type:'exchange',yrs:.5,meta:'2013 · Exchange'},
  canberra:{city:'Canberra',zh:'堪培拉',country:'Australia',iso:'AU',lon:149.13,lat:-35.28,label:'r',type:'study',yrs:2,meta:'2015–17 · Master'},
  shanghai:{city:'Shanghai',zh:'上海',country:'China',iso:'CN',lon:121.47,lat:31.23,label:'r',type:'work',yrs:6,meta:'2018–23 · Actuary'},
  vienna:{city:'Vienna',zh:'维也纳',country:'Austria',iso:'AT',lon:16.37,lat:48.21,label:'r',type:'research',yrs:3.5,meta:'2023– · Master → PhD'},
  paris:{city:'Paris',zh:'巴黎',country:'France',iso:'FR',lon:2.35,lat:48.86,label:'l',type:'research',yrs:.4,meta:'2026 · EDSD'},
  rostock:{city:'Rostock',zh:'罗斯托克',country:'Germany',iso:'DE',lon:12.10,lat:54.09,label:'t',type:'research',yrs:.6,meta:'2025–26 · EDSD'}
};
const CONTINENT={China:'Asia',Australia:'Oceania',Austria:'Europe',France:'Europe',Germany:'Europe'};
const EUROPE={x:198,y:44,w:144,h:82};
const STEPS=[
  {intro:true,cam:{x:0,y:0,w:1000,h:560},
   lede:'Small footsteps, each one unlocking a new corner of the map.'},
  {span:[2008,2011.6],place:'shenyang',years:'Hometown',cam:{x:630,y:70,w:170,h:120},
   lede:'Where I grew up — the very first footprint.'},
  {span:[2011.7,2015.5],place:'guangzhou',years:'2011 – 2015',cam:{x:600,y:90,w:230,h:170},
   lede:'Heading south for university.',
   acts:[{t:'Bachelor of Accounting',org:'Sun Yat-sen University',per:'2011 – 2015'}]},
  {span:[2013.15,2013.55],place:'innsbruck',years:'2013',minor:true,cam:{x:215,y:55,w:120,h:70},
   lede:'A short detour into the Alps.',
   acts:[{t:'Exchange semester',org:'Management Center Innsbruck (MCI)',per:'2013'}]},
  {span:[2015.6,2017.9],place:'canberra',years:'2015 – 2017',cam:{x:620,y:180,w:300,h:360},
   lede:'Training as an actuary.',
   acts:[{t:'Master of Actuarial Practice',org:'The Australian National University',per:'2015 – 2017'}]},
  {span:[2018,2023.7],place:'shanghai',years:'2018 – 2023',cam:{x:620,y:110,w:200,h:150},
   lede:'Six years of learning the craft.',
   acts:[
    {t:'Actuarial Consultant',org:'Sunlight Consulting (Shanghai) · motor insurance pricing',per:'2018 – 2019'},
    {t:'Pricing Actuary',org:'China Construction Bank Life Insurance · product development',per:'2020 – 2023'}],
   story:'Shanghai is where I found out what actuarial work really feels like. As a consultant I priced motor insurance for clients; later, at CCB Life, I got to build products from scratch — annuities, health and term life, ten of them in the end. What stayed with me was how much of it was about people: understanding what customers really needed from a policy, and realising that behind every price sits a quiet question about how long people live, and why some live longer than others.'},
  {span:[2023.75,2025.7],place:'vienna',years:'2023 – 2025',cam:{x:190,y:40,w:190,h:110},
   lede:'Curiosity called me back to the classroom — to understand the populations behind the numbers, and to work on questions that matter to the industry and to society.',
   acts:[
    {t:'Master of Global Demography',org:'University of Vienna',per:'2023 – 2025',note:'Thesis on educational inequalities in life expectancy and the future of pension equity in Austria, supervised by Sonja Spitzer and Miguel Sánchez-Romero.'},
    {t:'Research Assistant, Skill-PAL Project',org:'Department of Demography, University of Vienna',per:'2024 – 2025',note:'Helped build the European Parenting Leave Policies (EPLP) dataset, covering 21 countries from 1970 to 2024 — published in <a href="https://doi.org/10.4054/DemRes.2026.54.31" target="_blank" rel="noopener"><em>Demographic Research</em></a> (2026).'}]},
  {span:[2025.72,2026.15],place:'rostock',years:'2025 – 2026',cam:EUROPE,
   lede:'The European Doctoral School of Demography begins on the Baltic coast.',
   acts:[{t:'European Doctoral School of Demography',org:'Max Planck Institute for Demographic Research (MPIDR)',per:'2025 – 2026',note:'Project on subjective survival probability, life insurance, annuities, and retirement age, supervised by Cosmo Strozza (CPop), Simon Rabaté (INED), and Paola Vázquez-Castillo (CPop).'}]},
  {span:[2026.17,2026.55],place:'paris',years:'2026',cam:EUROPE,
   lede:'…and ends in Paris.',
   acts:[{t:'European Doctoral School of Demography',org:'Institut national d’études démographiques (INED)',per:'2026 · completed 07 / 2026'}]},
  {span:[2026.67,2026.95],place:'vienna',years:'Since 09 / 2026',cam:EUROPE,now:true,
   lede:'Back in Vienna, now as a doctoral researcher.',
   acts:[{t:'Doctoral Researcher',org:'Department of Demography, University of Vienna',per:'Since 09 / 2026',note:'PhD on how population structure shapes the harvesting effect in temperature-related mortality, supervised by Prof. Erich Striessnig.'}]}
];

(function(){
  const NS='http://www.w3.org/2000/svg';
  const svg=document.getElementById('jsvg'), stage=document.getElementById('stage');
  const arcsG=document.getElementById('jarcs'), marksG=document.getElementById('jmarks');
  const stepsEl=document.getElementById('steps'), ticksEl=document.getElementById('ticks'), hud=document.getElementById('hudNow');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad=n=>String(n).padStart(2,'0');
  const el=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;};
  // Natural Earth projection — same parameters used to pre-draw the land
  const K=272.80445255495175,TX=234.38109566588724,TY=328.92745376152214,R=Math.PI/180;
  function proj(lon,lat){const l=lon*R,f=lat*R,f2=f*f,f4=f2*f2;
    return [l*(0.8707-0.131979*f2+f4*(-0.013791+f4*(0.003971*f2-0.001529*f4)))*K+TX,
            -f*(1.007226+f2*(0.015085+f4*(-0.044475+0.028874*f2-0.005916*f4)))*K+TY];}

  // tiny line-drawn landmarks, drawn upward from the city point (0,0)
  const ICONS={
    shenyang:'<path d="M-6 0V-6H6V0M-9-6Q0-9.5 9-6L6-10H-6ZM-3.5-10V-14H3.5V-10M-6.5-14Q0-17 6.5-14L3.5-17.5H-3.5ZM0-17.5V-20.5M-2 0V-3.5H2V0"/>',
    guangzhou:'<path d="M-4 0C-1-8-1-14-3-22H3C1-14 1-8 4 0M-2.4-6H2.4M-1.9-12H1.9M-2.4-18H2.4M0-22V-28"/>',
    innsbruck:'<path d="M-10 0L-4-9L-1-5L4-13L10 0M2-10.5L4-8.5L6-10.5"/>',
    canberra:'<path d="M-11 0Q0-5 11 0M-7-1.5L0-18L7-1.5M-3-2.5L0-18L3-2.5M0-18V-27M0-27L6-25L0-23"/>',
    shanghai:'<path d="M-5 0L0-8L5 0M0-4.4V-24"/><circle cy="-8" r="3.6"/><circle cy="-16" r="2.3"/><circle cy="-21" r="1"/>',
    vienna:'<circle cy="-13" r="9"/><path d="M-5.5 0L0-13L5.5 0M-8 0H8M0-22V-4M-9-13H9M-6.4-19.4L6.4-6.6M-6.4-6.6L6.4-19.4"/><circle cy="-13" r="1.3"/>',
    rostock:'<path d="M-4 0L-2.6-16H2.6L4 0ZM-3.6-5H3.6M-3.1-10.5H3.1M-2.6-16V-20H2.6V-16M-3.4-20L0-23.5L3.4-20M5-19L8-20.5M5-17L8-16"/>',
    paris:'<path d="M-7 0L-2.4-12L-1.2-20L0-25L1.2-20L2.4-12L7 0M-4.6-6H4.6M-2.8-12H2.8M-2.3 0Q0-4 2.3 0"/>'
  };
  // ---- markers
  const firstStep={};
  STEPS.forEach((s,i)=>{if(s.place&&!(s.place in firstStep))firstStep[s.place]=i;});
  Object.entries(PLACES).forEach(([id,p])=>{
    [p.x,p.y]=proj(p.lon,p.lat);
    const g=el('g',{class:'mk'+(p.minor?' minor':''),tabindex:'0',role:'button','aria-label':`${p.city}, ${p.country}`});
    const s=el('g',{}), inner=el('g',{class:'inner'}), sg=el('g',{class:'sg'});
    inner.append(el('circle',{class:'halo',r:9}));
    const sz=Math.min(1.35,.75+.18*Math.sqrt(p.yrs||1));
    g.style.setProperty('--c',TYPES[p.type].c);
    const ic=el('g',{class:'ic',transform:`scale(${(1.45*sz).toFixed(3)})`}); ic.innerHTML=ICONS[id]||'<rect x="-5" y="-10" width="10" height="10"/>';
    sg.append(ic, el('circle',{class:'dot',r:2.4}));
    inner.append(sg);
    const L={r:[17,-8,4,15,'start'],l:[-17,-8,4,15,'end'],t:[0,-64,-53,-42,'middle'],b:[0,17,28,39,'middle']}[p.label||'r'];
    const nums=STEPS.map((st,i)=>st.place===id?String(i).padStart(2,'0'):null).filter(Boolean).join('·');
    const zh=el('text',{class:'zh',x:L[0],y:L[1],'text-anchor':L[4]}); zh.textContent=p.zh;
    const en=el('text',{class:'en',x:L[0],y:L[2],'text-anchor':L[4]}); en.innerHTML=`<tspan class="num">${nums}</tspan> ${p.city}`;
    const me=el('text',{class:'meta',x:L[0],y:L[3],'text-anchor':L[4]}); me.textContent=p.meta||'';
    inner.append(zh,en,me); s.append(inner); g.append(s); marksG.append(g);
    const jump=()=>{ // go to the chapter of this place nearest to the current one
      const idx=STEPS.map((st,i)=>st.place===id?i:-1).filter(i=>i>=0);
      const best=idx.reduce((a,b)=>Math.abs(b-cur)<Math.abs(a-cur)?b:a); goTo(best);};
    g.addEventListener('click',e=>{if(dragged){e.stopPropagation();return;} jump();});
    g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();jump();}});
    p.g=g; p.s=s;
  });

  // ---- route arcs between consecutive chapter places
  const seq=STEPS.map((s,i)=>({s,i})).filter(o=>o.s.place);
  let base=null;
  const arcs=seq.slice(1).map((o,j)=>{
    const prev=seq[j]; if(!prev.s.minor) base=prev.s.place;
    const a=PLACES[prev.s.minor?base:prev.s.place], b=PLACES[o.s.place];
    const dx=b.x-a.x, dy=b.y-a.y, len=Math.hypot(dx,dy), bend=Math.min(.32,26/len+.16);
    const cx=(a.x+b.x)/2-dy*bend, cy=(a.y+b.y)/2+dx*bend;
    const p=el('path',{class:'arc'+(o.s.minor?' minor':''),d:`M${a.x},${a.y}Q${cx},${cy} ${b.x},${b.y}`,pathLength:'1','stroke-dasharray':'1','stroke-dashoffset':'1'});
    arcsG.append(p); return {p,step:o.i};
  });

  // ---- chapters + ticks
  STEPS.forEach((s,i)=>{
    const d=document.createElement('article'); d.className='step'+(s.intro?' intro':''); d.dataset.i=i;
    if(s.intro){
      const ps=Object.values(PLACES), ctry=new Set(ps.map(p=>p.country)), cont=new Set(ps.map(p=>CONTINENT[p.country]));
      d.innerHTML=`<div class="card"><div class="meta"><span class="num">00</span><span class="yrs">Shenyang → Vienna</span></div><p class="lede">${s.lede}</p>
        <div class="hint">Scroll</div></div>`;
    }else{
      const p=PLACES[s.place];
      d.innerHTML=`<div class="card"><div class="meta"><span class="num">${pad(i)}</span><span class="yrs">${s.years}</span></div>
        <div class="place"><span class="zh">${p.zh}</span><span class="en">${p.city}</span><span class="ctry">${p.country}</span></div>
        <p class="lede">${s.lede}</p>`+
        (s.acts||[]).map(a=>`<div class="act"><h4>${a.t}</h4><p class="org">${a.org}</p><p class="per">${a.per}</p>${a.note?`<p class="note">${a.note}</p>`:''}${a.items&&a.items.length?`<ul>${a.items.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}</div>`).join('')+(s.story?`<p class="tale">${s.story}</p>`:'')+`</div>`;
    }
    stepsEl.append(d); s.el=d;
    const t=document.createElement('button'); t.type='button'; t.setAttribute('aria-label','Chapter '+i); t.innerHTML='<i></i>';
    t.onclick=()=>goTo(i); ticksEl.append(t); s.tick=t;
  });
  // ---- legend
  document.getElementById('legend').innerHTML=Object.entries(TYPES).map(([k,t])=>`<span><i style="background:${t.c}"></i>${t.label}</span>`).join('')+'<span class="lg-size"><i></i><i></i>size = time spent</span>';
  // ---- timeline strip (synced with the chapters)
  const T0=2008,T1=2027.2, X=v=>((v-T0)/(T1-T0)*100).toFixed(2)+'%';
  const track=document.getElementById('tlTrack'), axis=document.getElementById('tlAxis');
  STEPS.forEach((st,i)=>{ if(!st.span) return;
    const p=PLACES[st.place], b=document.createElement('button'); b.type='button';
    b.className='seg'+(p.minor?' minor':'')+(st.place==='shenyang'?' home':'');
    b.style.left=X(st.span[0]); b.style.width=`calc(${X(st.span[1])} - ${X(st.span[0])})`; b.style.setProperty('--c',TYPES[p.type].c);
    b.title=`${pad(i)} · ${p.city} · ${st.years}`; b.setAttribute('aria-label',b.title);
    const wide=(st.span[1]-st.span[0])>=1.6;
    b.innerHTML=`<i></i>${wide?`<em>${p.zh}</em>`:''}`;
    b.onclick=()=>goTo(i); track.append(b); st.seg=b;
  });
  [2011,2014,2017,2020,2023].forEach(y=>{const t=document.createElement('span');t.style.left=X(y);t.textContent=y;axis.append(t);});
  const now=document.createElement('span'); now.className='now-mark'; now.style.left=X(2026.75); now.textContent='now'; axis.append(now);

  function goTo(i){const e=STEPS[i].el, r=e.getBoundingClientRect();
    scrollTo({top:scrollY+r.top+r.height/2-innerHeight*.5,behavior:reduce?'auto':'smooth'});}

  // ---- camera
  let vb=[0,0,1000,560], anim=null;
  function fit(c){ // expand camera box to the stage's aspect ratio
    const ar=(stage.clientWidth||1000)/(stage.clientHeight||560);
    let w=c.w,h=c.h; if(w/h<ar) w=h*ar; else h=w/ar;
    return [c.x+c.w/2-w/2, c.y+c.h/2-h/2, w, h];}
  function apply(){
    svg.setAttribute('viewBox',vb.join(' '));
    const k=vb[2]/(stage.clientWidth||1000);
    Object.values(PLACES).forEach(p=>p.s.setAttribute('transform',`translate(${p.x},${p.y}) scale(${k})`));
    arcsG.setAttribute('stroke-width',1.6*k);
    svg.classList.toggle('detail',k<0.5);
    feet.forEach(f=>f.el.setAttribute('transform',`translate(${f.x},${f.y}) rotate(${f.a}) scale(${k})`));
  }
  function fly(target,msOverride){
    cancelAnimationFrame(anim);
    const from=vb.slice();
    if(reduce){vb=target;apply();return;}
    const c0=[from[0]+from[2]/2,from[1]+from[3]/2], c1=[target[0]+target[2]/2,target[1]+target[3]/2];
    const dist=Math.hypot(c1[0]-c0[0],c1[1]-c0[1]);
    const bump=Math.max(0,Math.min(900,dist*1.1)-Math.max(from[2],target[2]));   // zoom out mid-flight on long hops
    const ms=msOverride||(dist>250?1500:900), t0=performance.now(), ar=target[2]/target[3];
    (function step(now){
      const u=Math.min(1,(now-t0)/ms), e=u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;
      const w=from[2]+(target[2]-from[2])*e+bump*Math.sin(Math.PI*u), h=w/ar;
      const cx=c0[0]+(c1[0]-c0[0])*e, cy=c0[1]+(c1[1]-c0[1])*e;
      vb=[cx-w/2,cy-h/2,w,h]; apply();
      if(u<1) anim=requestAnimationFrame(step);
    })(t0);
  }

  // ---- footprints: walk the newest leg step by step, then settle into a line
  const feetG=el('g',{id:'jfeet'}); svg.insertBefore(feetG,marksG);
  let feet=[], feetTimers=[];
  const FOOT='<ellipse cx="1.8" cy="0" rx="3.1" ry="1.7"/><ellipse cx="-3" cy="0" rx="1.55" ry="1.3"/>';
  function clearFeet(){feetTimers.forEach(clearTimeout); feetTimers=[]; feet=[]; feetG.innerHTML=''; feetG.classList.remove('fade');}
  function walk(a){
    const path=a.p, L=path.getTotalLength();
    a.p.style.transition='none'; a.p.setAttribute('stroke-dashoffset','1');
    const kEnd=fit(STEPS[a.step].cam)[2]/(stage.clientWidth||1000);
    const gap=Math.max(13*kEnd, L/60);                    // ~13px between prints, at most ~60 prints
    const n=Math.max(6,Math.floor(L/gap)), dur=Math.min(2400,Math.max(1100,n*70)), dt=dur/n;
    const k=vb[2]/(stage.clientWidth||1000);
    for(let j=0;j<=n;j++){
      feetTimers.push(setTimeout(()=>{
        const t=j/n*L, p0=path.getPointAtLength(Math.max(0,t-0.5)), p1=path.getPointAtLength(Math.min(L,t+0.5));
        const ang=Math.atan2(p1.y-p0.y,p1.x-p0.x)*180/Math.PI, side=j%2?1:-1;
        const g=el('g',{class:'foot'+(a.p.classList.contains('minor')?' minor':'')});
        g.innerHTML=`<g transform="translate(0,${side*2.7}) rotate(${side*7})">${FOOT}</g>`;
        const f={el:g,x:p1.x,y:p1.y,a:ang}; feet.push(f); feetG.append(g);
        g.setAttribute('transform',`translate(${f.x},${f.y}) rotate(${f.a}) scale(${vb[2]/(stage.clientWidth||1000)})`);
      },j*dt));
    }
    // once the walk is done, the prints fade and the route settles into a line
    feetTimers.push(setTimeout(()=>{
      feetG.classList.add('fade');
      void a.p.getBoundingClientRect();
      a.p.style.transition='stroke-dashoffset .9s cubic-bezier(.6,0,.3,1)';
      a.p.setAttribute('stroke-dashoffset','0');
    },dur+700));
    feetTimers.push(setTimeout(()=>{feetG.classList.remove('fade'); feet=[]; feetG.innerHTML='';},dur+1800));
  }

  // ---- state for a chapter
  let cur=-1, dragged=false;
  function show(i){
    if(i===cur) return; cur=i; const s=STEPS[i];
    STEPS.forEach((x,j)=>{x.el.classList.toggle('on',j===i); x.tick.classList.toggle('on',j===i); x.tick.classList.toggle('done',j<i);
      if(x.seg){x.seg.classList.toggle('on',j===i); x.seg.classList.toggle('past',s.intro||j<i);}});
    Object.entries(PLACES).forEach(([id,p])=>{
      const seen=s.intro||firstStep[id]<=i;
      p.g.classList.toggle('shown',seen);
      p.g.classList.toggle('cur',s.place===id);
      p.g.classList.toggle('dim',!s.intro&&s.place!==id);
    });
    clearFeet();
    arcs.forEach(a=>{
      const on=s.intro||a.step<=i;
      if(on&&a.step===i&&!s.intro){ walk(a); }        // newest leg: footprints first, then the line
      else { a.p.style.transition=''; a.p.setAttribute('stroke-dashoffset',on?'0':'1'); }
    });
    document.querySelectorAll('#jland .vis path').forEach(c=>c.classList.toggle('hl',!!s.place&&c.dataset.iso===PLACES[s.place].iso));
    hud.innerHTML=`<b>${pad(i)}</b>${s.intro?'Overview':PLACES[s.place].city}`;
    fly(fit(s.cam));
  }
  // intro chapter shows the whole route; keep arcs visible there after first view
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting) show(+e.target.dataset.i);});
  },{rootMargin:'-48% 0px -48% 0px'});
  STEPS.forEach(s=>obs.observe(s.el));
  vb=fit(STEPS[0].cam); apply(); show(0);
  addEventListener('resize',()=>{vb=fit(STEPS[cur].cam);apply();});

  // ---- manual zoom & pan (buttons, drag, pinch, ctrl/trackpad-pinch wheel, double-click)
  const MINW=35, MAXW=1500;
  function zoomAt(f,px,py,animate){
    const W=stage.clientWidth,H=stage.clientHeight, ar=vb[2]/vb[3];
    const w=Math.max(MINW,Math.min(MAXW,vb[2]*f)), h=w/ar;
    const sx=vb[0]+px/W*vb[2], sy=vb[1]+py/H*vb[3];
    const t=[sx-px/W*w, sy-py/H*h, w, h];
    if(animate) fly(t,350); else {cancelAnimationFrame(anim); vb=t; apply();}
  }
  document.getElementById('zoomCtl').addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b) return;
    const W=stage.clientWidth/2,H=stage.clientHeight/2;
    if(b.dataset.z==='in') zoomAt(1/1.6,W,H,true);
    else if(b.dataset.z==='out') zoomAt(1.6,W,H,true);
    else fly(fit(STEPS[cur].cam),600);
  });
  const pts=new Map(); let last=null, pinch=null;
  svg.addEventListener('pointerdown',e=>{
    pts.set(e.pointerId,{x:e.clientX,y:e.clientY}); dragged=false;
    if(pts.size===1) last={x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY};
    if(pts.size===2){const [a,b]=[...pts.values()]; pinch={d:Math.hypot(a.x-b.x,a.y-b.y)};}
  });
  svg.addEventListener('pointermove',e=>{
    if(!pts.has(e.pointerId)) return;
    pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    const r=stage.getBoundingClientRect();
    if(pts.size===2&&pinch){
      const [a,b]=[...pts.values()], d=Math.hypot(a.x-b.x,a.y-b.y);
      zoomAt(pinch.d/d,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top,false); pinch.d=d; dragged=true; return;
    }
    if(!last) return;
    const dx=e.clientX-last.x, dy=e.clientY-last.y;
    if(!dragged&&Math.hypot(e.clientX-last.x0,e.clientY-last.y0)<4) return;
    if(!dragged){dragged=true; svg.classList.add('dragging'); try{svg.setPointerCapture(e.pointerId);}catch(_){}}
    cancelAnimationFrame(anim);
    const k=vb[2]/stage.clientWidth; vb=[vb[0]-dx*k,vb[1]-dy*k,vb[2],vb[3]]; apply();
    last.x=e.clientX; last.y=e.clientY;
  });
  const end=e=>{pts.delete(e.pointerId); if(pts.size<2) pinch=null; if(!pts.size){last=null; svg.classList.remove('dragging'); setTimeout(()=>dragged=false,0);}};
  svg.addEventListener('pointerup',end); svg.addEventListener('pointercancel',end);
  svg.addEventListener('wheel',e=>{ // trackpad pinch and ctrl+wheel zoom; plain wheel keeps scrolling the story
    if(!e.ctrlKey&&!e.metaKey) return;
    e.preventDefault(); const r=stage.getBoundingClientRect();
    zoomAt(Math.exp(e.deltaY*0.01),e.clientX-r.left,e.clientY-r.top,false);
  },{passive:false});
  svg.addEventListener('dblclick',e=>{const r=stage.getBoundingClientRect(); zoomAt(1/1.8,e.clientX-r.left,e.clientY-r.top,true);});
})();

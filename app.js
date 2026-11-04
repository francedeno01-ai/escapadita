
const DATA=window.DATA;
(()=>{
const $=id=>document.getElementById(id);
const WA='50766750518';
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const P=DATA.products, TORD=DATA.torder, MORD=DATA.morder, CATS=DATA.cats;
// cada imagen lleva su versión: si la foto cambia, el navegador la vuelve a descargar
const VER=DATA.ver||{};const jp=(d,id)=>`/${d}/${id}.jpg?v=${VER[id]||''}`;
// URLs reales de cada página (las genera tienda.py)
const UR=DATA.urls,U={p:id=>UR.p[id],c:k=>UR.c[k],b:s=>UR.b[s]};
const SECNAME={juegos:'Juegos de gargantilla',juegoszt:'Juegos de zarcillos y tapahueso',zarcillos:'Zarcillos',tapahuesos:'Tapahuesos',cadenas:'Cadenas',cabeza:'Peinetas',tocado:'Pajuelas, jazmines y ganchos',broches:'Broches',pulseras:'Pulseras y sortijas'};
const SECSUB={juegos:'Juegos completos: gargantilla, zarcillos, pulsera o caña y sortija.',juegoszt:'Zarcillos con su tapahueso a juego, para lucir en cinta negra.',zarcillos:'Zarcillos típicos en oro enchapado y acero inoxidable.',tapahuesos:'Dijes para el centro del cuello, en cinta negra.',cadenas:'Cadena chata, cabestrillo, rosario, bruja, escapulario y más, también en combos a precio especial.',cabeza:'Juegos de peinetas, sets, pares y peinetones para el tocado de la pollera.',tocado:'Pajuelas, jazmines, jazmines móviles y ganchos para completar el tocado.',broches:'Broches y prendedores de filigrana. Para el tapahueso/broche doble función mira Tapahuesos.',pulseras:'Cañas ajustables y sortijas.'};
const SECPROD=DATA.secprod;
const SING={'Juegos de gargantilla':'Juego de gargantilla','Juegos de zarcillos y tapahueso':'Juego de zarcillos y tapahueso','Juegos con tapahueso':'Juego con tapahueso','Pulseras y cañas':'Pulsera','Sortijas':'Sortija','Para niña':'Para niña','Combos de cadenas':'Combo',Peinetas:'Peineta','Pajuelas, jazmines y ganchos':'Tocado',Broches:'Broche',Coronas:'Corona',Pajuelas:'Pajuela',Ganchitos:'Ganchito',Juegos:'Juego',Cadenas:'Cadena',Rosarios:'Rosario',Escapularios:'Escapulario',Dijes:'Dije',Prendedores:'Prendedor',Abaniqueras:'Abaniquera',Zarcillos:'Zarcillos',Pulseras:'Pulsera',Sortijas:'Sortija',Tapahuesos:'Tapahueso'};
const norm=s=>(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
P.forEach(p=>{
 p.gal=p.vistas.map(v=>({img:v,m:-1})).concat(...p.models.map((m,k)=>m.imgs.map(i=>({img:i,m:k}))));
 p._s=norm([p.name,p.mat,p.tags.join(' '),p.incl.join(' '),p.id,p.color||'',p.desc||'',...p.models.map(m=>m.ref+' '+(m.desc||''))].join(' '));});
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
/* buscador: tabla de equivalencias (sinónimos + errores de escritura) y corrección por parecido */
const SYN={},SYNF=[],REAL={};
// la tabla (sinonimos.json) se carga en segundo plano; si ya hay una búsqueda escrita, se vuelve a aplicar
fetch('/sinonimos.json').then(r=>r.json()).then(d=>{Object.entries(d).forEach(([real,vs])=>{const r=norm(real);REAL[r]=real;SYN[r]=r;
 vs.forEach(v=>{v.includes(' ')?SYNF.push([v,r]):(SYN[v]=r);});});SYNF.sort((a,b)=>b[0].length-a[0].length);
 VOC.push(...Object.keys(REAL));if(qins[0].value)qins[0].dispatchEvent(new Event('input'));}).catch(()=>{});
const VOC=[...new Set(P.flatMap(p=>p._s.split(/[^a-z0-9ñ]+/)).filter(w=>w.length>=3))];
const stem=t=>t.length>4?t.replace(/(es|os|as|o|a|s)$/,''):t;
function lev(a,b){if(Math.abs(a.length-b.length)>2)return 9;let p=[...Array(b.length+1).keys()];
 for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[b.length];}
function parseQ(raw){let q=norm(raw);const fixes=[];
 SYNF.forEach(([v,r])=>{if(q.includes(v)){q=q.split(v).join(r);fixes.push(r);}});
 const toks=q.split(/\s+/).filter(Boolean).map(t=>{
  if(SYN[t]){if(SYN[t]!==t)fixes.push(SYN[t]);return {o:t,c:SYN[t]};}
  if(t.length<4||P.some(p=>p._s.includes(t)))return {o:t,c:t};
  let best=null,bd=9;for(const w of VOC){const d=lev(t,w);if(d<bd){bd=d;best=w;}}
  if(best&&bd<=(t.length>=6?2:1)){const c=SYN[best]||best;fixes.push(c);return {o:t,c};}
  return {o:t,c:t};});
 return {toks,shown:fixes.length?toks.map(x=>REAL[x.c]||x.c).join(' '):''};}
const tokOk=(p,x)=>[x.c,stem(x.c),x.o].some(t=>t&&p._s.includes(t));
const img0=id=>byId[id]?byId[id].gal[0].img:'';

const POSTS=[
{slug:'cuantas-cadenas',tag:'Guía',title:'¿Cuántas cadenas se lucen con la pollera?',dek:'De una a siete, sin repetir: la regla de oro para armar tu juego de cadenas.',prod:'C-001',shop:['cadenas','Ver cadenas'],
body:`<p>Es la pregunta que más nos hacen. El manual de vestimenta de la Autoridad de Turismo de Panamá (ATP) lo deja claro: con la pollera se pueden usar <strong>de una a siete cadenas, sin repetir ninguna</strong>. Por eso se habla tanto del famoso “juego de siete cadenas”.</p>
<blockquote>De una a siete cadenas, y ninguna repetida.</blockquote>
<h2>Las cadenas más conocidas</h2>
<p>En una nota de La Estrella de Panamá, el experto Erik Polo vistió una pollera con la <strong>cadena chata, el guachapalí, el cabestrillo, la cadena de monedas, el rosario y el escapulario</strong>. En nuestro catálogo también encontrarás otras muy queridas:</p>
<ul><li><strong>Cadena chata:</strong> de eslabones planos, una de las más tradicionales.</li><li><strong>Cabestrillo</strong> y <strong>guachapalí</strong>: imprescindibles en el juego.</li><li><strong>Rosario</strong> y <strong>escapulario</strong>: las piezas de fe del pecho.</li><li><strong>Bruja abierta y cerrada, cola de pato, solitaria, salomónica, pescado y abaniquera</strong>: para completar y darle tu toque.</li></ul>
<h2>¿Por dónde empiezo?</h2>
<p>No tienes que comprarlo todo de una vez. Históricamente, muchas mujeres panameñas completaban su joyero <strong>pieza por pieza</strong>, pagando poco a poco. Empieza por dos o tres cadenas básicas, como la chata, el rosario y el escapulario, y ve sumando hasta llegar a tus siete.</p>`,
src:[['Manual Instructivo de vestimenta, ATP','https://www.atp.gob.pa/wp-content/uploads/2025/11/Manual-Instructivo-CORREGIDO-3000.pdf'],['El lujo del joyero de la pollera, La Estrella de Panamá','https://www.laestrella.com.pa/vida-y-cultura/cultura/lujo-joyero-pollera-YALE86634'],['Los secretos para deslumbrar con la pollera, La Estrella de Panamá','https://www.laestrella.com.pa/panama/nacional/pollera-secretos-panamena-deslumbrar-EKLE121476']]},
{slug:'gala-labor-montuna',tag:'Tradición',title:'Gala, labor y montuna: qué prendas lleva cada una',dek:'No todas las polleras se visten igual. Te explicamos la diferencia y qué prendas acompañan a cada una.',prod:'JG-016',shop:['juegos','Ver juegos de gargantilla'],
body:`<p>Las polleras se agrupan en dos grandes ramas, <strong>de gala y de labor</strong>, y cada región del país tiene las suyas. A eso se suma la <strong>montuna</strong>, la pollera de uso rural y cotidiano.</p>
<h2>Pollera de gala</h2>
<p>Es la de los actos formales y los desfiles, hecha con encajes finos. Es la que lleva el joyero más completo: <strong>cadenas, cordones, peinetas, zarcillos, pulseras, sortijas y tembleques</strong>. Un dato curioso: aunque la gala “sin labor” cuesta menos de confeccionar, el joyero es el mismo que el de la gala con labor.</p>
<h2>¿Y qué es la “labor”?</h2>
<p>“Labor” no significa que sea para trabajar: se refiere al <strong>trabajo de aguja</strong> (bordados, calados y técnicas) que decora la tela. Es un mito pensar que la pollera solo puede ser de labor; hay muchísimas variantes.</p>
<h2>Pollera montuna</h2>
<p>Nació para la vida en el campo y varía según la región: santeña, ocueña, veragüense, penonomeña, antonera. Según el manual de la ATP, la montuna <strong>siempre lleva tembleques de colores, nunca blancos</strong>, y se acompaña con el sombrero de su región, como el pinta'o para la santeña o el ocueño para la de Ocú. Puede llevar dos trenzas y un par de peinetas.</p>
<blockquote>Menos es más: el manual de la ATP advierte contra la “profusión de peinetas”.</blockquote>`,
src:[['Mitos y verdades en el uso de la pollera, La Estrella de Panamá','https://www.laestrella.com.pa/vida-y-cultura/moda/mitos-verdades-pollera-COLE437261'],['Polleras panameñas: Montuna de Ocú y Gala sin labor de Los Santos, La Prensa','https://www.prensa.com/proyecto_folclore/polleras-panamenas-montuna-de-ocu-y-gala-sin-labor-de-los-santos/'],['Manual Instructivo de vestimenta, ATP','https://www.atp.gob.pa/wp-content/uploads/2025/11/Manual-Instructivo-CORREGIDO-3000.pdf']]},
{slug:'el-tocado',tag:'Guía',title:'El tocado: peinetas, peinetón, pajuelas y tembleques',dek:'Todo lo que adorna la cabeza de la empollerada, y cómo combinarlo sin recargar.',prod:'PE-008',shop:['cabeza','Ver peinetas'],
body:`<p>El joyero de la pollera se divide en dos: las <strong>prendas del pecho</strong> (sobre todo cadenas y cordones) y las <strong>prendas de la cabeza</strong>: peinetas, tembleques, zarcillos y pajuela.</p>
<h2>Las piezas del tocado</h2>
<ul><li><strong>Peinetas:</strong> el manual de la ATP habla de uno o dos pares para la pollera de gala.</li><li><strong>Peinetón:</strong> la peineta grande que corona el peinado.</li><li><strong>Pajuela:</strong> el alfiler decorado que se clava en el peinado; según la ATP, es opcional.</li><li><strong>Tembleques:</strong> los adornos que tiemblan con cada movimiento, hechos de perlas, cuentas o escamas de pescado.</li><li><strong>Jazmines y parches:</strong> completan el arreglo de la gala.</li></ul>
<blockquote>Uno o dos pares de peinetas, peinetón, jazmines, pajuela (opcional) y parches.</blockquote>
<h2>El consejo de oro</h2>
<p>La misma guía advierte contra ponerse una “profusión de peinetas”. Un tocado bien armado luce más que uno recargado: elige piezas que combinen entre sí en color y estilo.</p>`,
src:[['El lujo del joyero de la pollera, La Estrella de Panamá','https://www.laestrella.com.pa/vida-y-cultura/cultura/lujo-joyero-pollera-YALE86634'],['Manual Instructivo de vestimenta, ATP','https://atp.gob.pa/wp-content/uploads/2024/10/Manual-Instructivo.pdf'],['Traje típico de Panamá, EcuRed','https://www.ecured.cu/Traje_típico_de_panamá']]},
{slug:'historia-del-joyero',tag:'Historia',title:'Una historia en oro: el joyero de la pollera',dek:'De dónde viene nuestra pollera y por qué sus prendas se heredaban de madre a hija.',prod:'JG-044',shop:['juegos','Ver juegos de gargantilla'],
body:`<p>El origen de la pollera todavía se debate. Algunos la vinculan con los trajes de las damas españolas de los siglos XVI y XVII. El investigador Eduardo Cano la relaciona más con la moda europea, sobre todo la francesa. Y el antropólogo Carlos Fitzgerald la describe como un <strong>híbrido</strong>, con aportes europeos y africanos en su uso y transformación.</p>
<h2>El oro de la pollera</h2>
<p>Tradicionalmente, las prendas se hacían en <strong>oro de 10 quilates</strong>, por su durabilidad, y en el caso de las cadenas se bañaban luego en <strong>24 quilates</strong>. Familias de orfebres como los Epifanio se convirtieron en pilares de la joyería folclórica panameña.</p>
<h2>Pieza por pieza</h2>
<p>Un joyero completo siempre ha sido costoso. Por eso muchas mujeres compraban sus prendas <strong>una por una</strong> o las pagaban poco a poco, y luego las heredaban a sus hijas.</p>
<blockquote>Hoy, el enchapado y el acero inoxidable permiten lucir la pollera completa sin esperar toda una vida.</blockquote>`,
src:[['Origen de la pollera, III Congreso Nacional de la Pollera, La Prensa','https://www.prensa.com/impresa/vivir/origen-pollera_0_4768023238.html'],['El lujo del joyero de la pollera, La Estrella de Panamá','https://www.laestrella.com.pa/vida-y-cultura/cultura/lujo-joyero-pollera-YALE86634'],['El señor Epifanio, La Prensa','https://www.prensa.com/proyecto_folclore/el-senor-epifanio/']]},
{slug:'tapahueso',tag:'Guía',title:'Tapahueso: la prenda que adorna el cuello',dek:'Qué es, cuándo se usa y cuándo es mejor no ponerlo.',prod:'T-002',shop:['tapahuesos','Ver tapahuesos'],
body:`<p>El <strong>tapahueso</strong> es la prenda que va al centro del cuello, sobre el escote de la camisa de la pollera. Suele llevarse con una cinta negra.</p>
<h2>¿Cuándo se usa?</h2>
<p>El manual de vestimenta de la ATP indica que, en una pollera sencilla, se usa <strong>un tapahueso con cinta negra y una cadena</strong>, acompañados de zapatos de pana negros.</p>
<h2>¿Cuándo no?</h2>
<p>Si la camisa tiene <strong>cuello chino</strong>, no se usa tapahueso. En ese caso, la guía sugiere un pequeño broche al centro del cuello y una cadena.</p>
<blockquote>Cuello chino: sin tapahueso. Un broche pequeño y una cadena bastan.</blockquote>`,
src:[['Manual Instructivo de vestimenta, ATP','https://www.atp.gob.pa/wp-content/uploads/2025/11/Manual-Instructivo-CORREGIDO-3000.pdf']]},
{slug:'cuidado-de-prendas',tag:'Consejos',title:'Cómo cuidar tus prendas enchapadas y de acero',dek:'Pequeños hábitos para que tus prendas luzcan como nuevas temporada tras temporada.',prod:'Z-019',shop:['','Ver todo el catálogo'],
body:`<p>Tus prendas te acompañan en desfiles, fiestas patrias y presentaciones. Con unos cuidados sencillos, te van a durar mucho más.</p>
<h2>Prendas enchapadas y bañadas en oro</h2>
<ul><li><strong>Póntelas al final:</strong> primero el perfume, la laca y las cremas, y después las prendas.</li><li><strong>Sécalas después de usarlas</strong> con un paño suave para quitar el sudor.</li><li><strong>Evita el agua de piscina y de mar</strong>, y no las limpies con productos abrasivos.</li><li><strong>Guárdalas por separado</strong>, en bolsitas o cajitas, para que no se rayen ni se enreden.</li></ul>
<h2>Prendas de acero inoxidable</h2>
<ul><li>Son más resistentes al agua y al uso diario.</li><li>Puedes lavarlas con agua tibia y jabón neutro; sécalas muy bien antes de guardarlas.</li></ul>
<blockquote>Una prenda bien guardada es una prenda que se hereda.</blockquote>`,
src:[]}
];

const badgeCls=m=>m.startsWith('Oro')?'g':(m.startsWith('Acero')?'s':'');
const badgeTxt=m=>({'Oro enchapado':'Oro enchapado','Acero inoxidable':'Acero'}[m]||'');
const money=v=>'$'+v.toFixed(2);
const UNIT={par:'el par',juego:'el juego','c/u':'c/u',combo:'el combo'};
function card(p){
 const a=p.gal[0].img,b=p.gal[1]&&p.gal[1].img;const t=badgeTxt(p.mat);const n=p.models.length;
 return `<a class="card" href="${U.p(p.id)}"><div class="media"><img class="a${b?'':' solo'}" src="${jp('t',a)}" alt="${p.name}" loading="lazy">${b?`<img class="b" src="${jp('t',b)}" alt="" loading="lazy">`:''}
 ${t?`<span class="badge ${badgeCls(p.mat)}">${t}</span>`:''}${p.nina?`<span class="nm">Niña</span>`:''}</div>
 <div class="cbody"><span class="ey">${SING[p.tags[0]]||p.tags[0]}</span><h3 class="ttl">${p.name}</h3><span class="ref">Código ${p.id}</span><span class="cta">${money(p.price)} <small>${UNIT[p.unit]||''}</small></span></div></a>`;}
const postCard=a=>`<a class="post" href="${U.b(a.slug)}"><div class="pi"><img src="${jp('i',img0(a.prod))}" alt="" loading="lazy"></div><div class="pb"><span class="tg">${a.tag}</span><h3>${a.title}</h3><p>${a.dek}</p><span class="rd">Leer artículo →</span></div></a>`;
const secs=CATS.map(c=>c[0]);
$('cats').innerHTML=`<a href="/tienda/" data-k="">Todo</a>`+secs.map(k=>`<a href="${U.c(k)}" data-k="${k}">${SECNAME[k]}</a>`).join('');
$('fcats').innerHTML=secs.map(k=>`<li><a href="${U.c(k)}">${SECNAME[k]}</a></li>`).join('');
$('fposts').innerHTML=POSTS.slice(0,4).map(a=>`<li><a href="${U.b(a.slug)}">${a.title}</a></li>`).join('');

const nModels=P.reduce((s,p)=>s+p.models.length,0);
let railBtns=()=>{};
const GIFT=9.99;  // "Pequeños regalos": menos de $10
if($('vHome')){
$('facts').innerHTML=`<div><b>${secs.length}</b><span>categorías</span></div><div><b>${P.length}</b><span>modelos con precio</span></div><div><b>${money(Math.min(...P.map(p=>p.price)))}</b><span>desde</span></div>`;
$('heroImgs').innerHTML=DATA.hero.map(id=>`<img src="${jp('i',img0(id))}" alt="">`).join('')+`<img class="seal" src="/brand/logo.jpg" alt="Sello La Escapadita a lo Nuestro">`;
$('catTiles').innerHTML=secs.map(k=>{const c=P.filter(p=>p.sec===k).length;return `<a class="cat" href="${U.c(k)}"><img src="${jp('i',img0(SECPROD[k]))}" alt="" loading="lazy"><div class="ct"><div><h3>${SECNAME[k]}</h3><small>${c} productos</small></div><span class="go" aria-hidden="true">→</span></div></a>`;}).join('');
$('newGrid').innerHTML=DATA.dest.map(id=>byId[id]).map(card).join('');
// regalos: primero broches y jazmines intercalados; luego el resto de menor a mayor precio
const gifts=P.filter(p=>p.price<10).sort((a,b)=>a.price-b.price||a.ord-b.ord);
const gB=gifts.filter(p=>p.sec==='broches'),gJ=gifts.filter(p=>/^Jazm/.test(p.tags[0]||'')),mix=[];
for(let i=0;i<Math.max(gB.length,gJ.length);i++){if(gB[i])mix.push(gB[i]);if(gJ[i])mix.push(gJ[i]);}
$('giftRail').innerHTML=mix.concat(gifts.filter(p=>!mix.includes(p))).map(card).join('');
// flechas de los carruseles: avanzan una "página"; nunca se acaban: al final vuelven al primero y viceversa

document.querySelectorAll('.cbtn').forEach(b=>b.addEventListener('click',()=>{const r=$(b.dataset.rail),d=+b.dataset.dir;
 const end=r.scrollWidth-r.clientWidth;
 if(d>0&&r.scrollLeft>=end-4)r.scrollTo({left:0,behavior:'smooth'});
 else if(d<0&&r.scrollLeft<=4)r.scrollTo({left:end,behavior:'smooth'});
 else r.scrollBy({left:d*r.clientWidth,behavior:'smooth'});}));
$('postGrid').innerHTML=POSTS.map(postCard).join('');
}
/* indicadores de desplazamiento: desvanecido en el borde donde hay más contenido (carruseles y barra de categorías) */
function edge(sc,box){const f=()=>{box.classList.toggle('can-l',sc.scrollLeft>4);box.classList.toggle('can-r',sc.scrollLeft+sc.clientWidth<sc.scrollWidth-4);};
 sc.addEventListener('scroll',f,{passive:true});window.addEventListener('resize',f);return f;}
const edges=[];
document.querySelectorAll('.carousel').forEach(c=>{const r=c.querySelector('.rail');if(r)edges.push(edge(r,c));});
const cnw=document.querySelector('.cnw'),cats=$('cats');
if(cnw&&cats){edges.push(edge(cats,cnw));
 cnw.querySelectorAll('.cnb').forEach(b=>b.addEventListener('click',()=>cats.scrollBy({left:(b.classList.contains('l')?-1:1)*cats.clientWidth*.6,behavior:'smooth'})));}
railBtns=()=>edges.forEach(f=>f());
window.addEventListener('load',railBtns);

const st={sec:'',tipos:new Set(),mats:new Set(),nina:new Set(),cols:new Set(),pmin:null,pmax:null,q:'',sort:'new',shown:24,exp:new Set(),qt:[],qfix:''};const PAGE=24;const MAXF=7;
const CORD=DATA.corder;
const SW={'Blanco (perla)':'#f6f1e7','Rojo':'#c0392b','Turquesa':'#2bb3b1','Coral':'#f07a55','Rosado':'#f2a7c0','Azul':'#2c4fa3','Verde':'#2e8b57','Negro':'#222','Morado':'#7d3c98','Cristal':'linear-gradient(135deg,#fff,#cfe3ee,#fff)','Multicolor':'conic-gradient(#c0392b,#e1b12c,#2e8b57,#2c4fa3,#7d3c98,#c0392b)','Dorado':'linear-gradient(135deg,#f3d27a,#c9962b)'};
const NI=p=>p.nina?'Sí':'No';
const money2=v=>'$'+(Number.isInteger(v)?v:v.toFixed(2));
let pb=null;
const qins=[...document.querySelectorAll('.qin')];
const base=()=>P.filter(p=>!st.sec||p.sec===st.sec);
function match(p,skip){
 if(st.q&&!st.qt.every(x=>tokOk(p,x)))return false;
 if(skip!=='p'&&((st.pmin!=null&&p.price<st.pmin)||(st.pmax!=null&&p.price>st.pmax)))return false;
 if(skip!=='t'&&st.tipos.size&&![...st.tipos].some(t=>p.tags.includes(t)))return false;
 if(skip!=='m'&&st.mats.size&&!st.mats.has(p.mat))return false;
 if(skip!=='n'&&st.nina.size&&!st.nina.has(NI(p)))return false;
 if(skip!=='c'&&st.cols.size&&!p.cols.some(c=>st.cols.has(c)))return false;
 return true;}
/* facetas: cada grupo cuenta sobre lo que queda con los DEMÁS filtros aplicados (y la categoría/búsqueda actual);
   un grupo se oculta si no hay al menos 2 opciones para elegir (salvo que tenga algo marcado) */
function facets(keepPrice){const b=base();
 const row=(g,v,c,on,sw)=>`<label class="chk"><input type="checkbox" data-g="${g}" value="${v}" ${on?'checked':''}>${sw?`<span class="sw" style="background:${sw}"></span>`:''}<span>${v}</span><span class="n">${c}</span></label>`;
 // máximo MAXF opciones visibles (más las marcadas); "Ver más" amplía la lista
 const grp=(gid,fid,g,order,count,sel,swf)=>{const opts=order.filter(v=>count[v]||sel.has(v));
  $(gid).hidden=!(opts.length>=2||sel.size);
  const open=st.exp.has(g),short=opts.filter((v,i)=>i<MAXF||sel.has(v)),extra=opts.length-short.length;
  const vis=open?opts:short;
  $(fid).innerHTML=vis.map(v=>row(g,v,count[v]||0,sel.has(v),swf&&swf(v))).join('')+
   (extra>0?`<button type="button" class="fmore" data-g="${g}" aria-expanded="${open}">${open?'Ver menos':'Ver más ('+extra+')'}</button>`:'');};
 const cnt=(skip,f)=>{const c={};b.filter(p=>match(p,skip)).forEach(p=>[].concat(f(p)).forEach(v=>c[v]=(c[v]||0)+1));return c;};
 grp('gTipo','fTipo','t',TORD,cnt('t',p=>p.tags),st.tipos);
 grp('gMat','fMat','m',MORD,cnt('m',p=>p.mat),st.mats);
 grp('gNina','fNina','n',['Sí','No'],cnt('n',NI),st.nina);
 grp('gCol','fCol','c',CORD,cnt('c',p=>p.cols),st.cols,v=>SW[v]);
 // precio: el rango sale de lo que queda con los demás filtros
 const pr=b.filter(p=>match(p,'p')).map(p=>p.price);
 const lo=pr.length?Math.floor(Math.min(...pr)):0,hi=pr.length?Math.ceil(Math.max(...pr)):0;
 if(st.pmin!=null&&st.pmin<=lo)st.pmin=null;if(st.pmax!=null&&st.pmax>=hi)st.pmax=null;
 const act=st.pmin!=null||st.pmax!=null;$('gPrice').hidden=!(hi>lo||act);
 const same=pb&&pb.lo===lo&&pb.hi===hi;pb={lo,hi};
 if(!(keepPrice&&same)){const a=st.pmin??lo,z=st.pmax??hi;
  $('fPrice').innerHTML=`<div class="pvals"><span id="pLo"></span><span id="pHi"></span></div><div class="dual"><div class="trk"><i id="pFill"></i></div><input type="range" id="rLo" min="${lo}" max="${hi}" step="0.5" value="${a}" aria-label="Precio mínimo"><input type="range" id="rHi" min="${lo}" max="${hi}" step="0.5" value="${z}" aria-label="Precio máximo"></div>`;}
 paintPrice();}
function paintPrice(){const L=$('rLo'),H=$('rHi');if(!L||!pb)return;const a=+L.value,z=+H.value,w=pb.hi-pb.lo||1;
 $('pLo').textContent=money2(a);$('pHi').textContent=money2(z);
 $('pFill').style.left=((a-pb.lo)/w*100)+'%';$('pFill').style.right=((pb.hi-z)/w*100)+'%';}
function renderShop(keepPrice){
 $('cats').querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',a.dataset.k===st.sec?'true':'false'));
 {const c=$('cats'),a=c.querySelector('[aria-current="true"]');if(a)c.scrollLeft=a.offsetLeft-(c.clientWidth-a.offsetWidth)/2;setTimeout(railBtns,0);}
 const gift=!st.sec&&st.pmax===GIFT;
 $('h1').textContent=gift?'Pequeños regalos':st.sec?SECNAME[st.sec]:'Todas las prendas';
 $('crumb').textContent=gift?' / Pequeños regalos':st.sec?' / '+SECNAME[st.sec]:'';
$('sub').textContent=gift?'Detalles típicos de menos de $10, ideales para regalar. Precios sin ITBMS.':st.sec?SECSUB[st.sec]:'Precios sin ITBMS. Elige tu modelo y pídelo por WhatsApp con su código.';
 facets(keepPrice);
 let L=base().filter(p=>match(p));
 if(st.sort==='new')L.sort((a,b)=>a.ord-b.ord);
 if(st.sort==='pa')L.sort((a,b)=>a.price-b.price||a.ord-b.ord);
 if(st.sort==='pd')L.sort((a,b)=>b.price-a.price||a.ord-b.ord);
 if(st.sort==='az')L.sort((a,b)=>a.name.localeCompare(b.name,'es')||a.id.localeCompare(b.id));
  const n=L.length,m=L.reduce((s,p)=>s+p.models.length,0);
 $('count').innerHTML=`<b>${n}</b> producto${n===1?'':'s'}`+(st.q&&st.qfix?` · Mostrando resultados para <b>“${st.qfix}”</b> (buscaste “${qins[0].value}”)`:'');
 // búsqueda: el resultado exacto (código o nombre igual a lo buscado) va primero, en su propia fila;
 // los parecidos van en otra fila "¿Quizás buscabas…?" solo si existen
 const ex=st.q?L.filter(p=>norm(p.id)===st.q||norm(p.name)===st.q):[];
 let sh;
 if(ex.length){const rest=L.filter(p=>!ex.includes(p));sh=Math.min(st.shown,rest.length);
  $('grid').innerHTML=`<h2 class="gsep">Resultado exacto</h2>`+ex.map(card).join('')+
   (rest.length?`<h2 class="gsep alt">¿Quizás buscabas…?<small>Otros productos parecidos a “${qins[0].value}”.</small></h2>`+rest.slice(0,st.shown).map(card).join(''):'');
  $('empty').hidden=true;
  $('more').innerHTML=rest.length>sh?`<p>Viendo ${sh} de ${rest.length} productos parecidos</p><div class="bar"><i style="width:${sh/rest.length*100}%"></i></div><button type="button" class="btn" id="moreB">Ver más productos</button>`:'';}
 else{$('grid').innerHTML=L.slice(0,st.shown).map(card).join('');
 $('empty').hidden=n>0;sh=Math.min(st.shown,n);
 $('more').innerHTML=n>sh?`<p>Viendo ${sh} de ${n} productos</p><div class="bar"><i style="width:${sh/n*100}%"></i></div><button type="button" class="btn" id="moreB">Ver más productos</button>`:'';}
 const act=[...(st.pmin!=null||st.pmax!=null?[['p',st.pmin==null&&st.pmax===GIFT?'menos de $10':`${money2(st.pmin??pb.lo)} – ${money2(st.pmax??pb.hi)}`]]:[]),...[...st.tipos].map(t=>['t',t]),...[...st.mats].map(m=>['m',m]),...[...st.nina].map(v=>['n',v]),...[...st.cols].map(c=>['c',c])];
 if(st.q)act.push(['q','“'+qins[0].value+'”']);
 $('active').innerHTML=act.map(([g,v])=>`<button type="button" class="chip" data-g="${g}" data-v="${v}">${g==='n'?'Para niña: '+v:g==='p'?'Precio '+v:v}<i aria-hidden="true">×</i><span class="sr">Quitar filtro</span></button>`).join('')+(act.length>1?'<button type="button" class="chip clear" data-g="all">Quitar todo</button>':'');}
const reset=()=>{st.shown=PAGE;};
const SETS={t:'tipos',m:'mats',n:'nina',c:'cols'};
$('side').addEventListener('change',e=>{const i=e.target;if(i.type!=='checkbox')return;const s=st[SETS[i.dataset.g]];i.checked?s.add(i.value):s.delete(i.value);reset();renderShop();});
$('side').addEventListener('click',e=>{const b=e.target.closest('.fmore');if(!b)return;const g=b.dataset.g;st.exp.has(g)?st.exp.delete(g):st.exp.add(g);facets(true);});
$('side').addEventListener('input',e=>{const i=e.target;if(i.id!=='rLo'&&i.id!=='rHi')return;
 const L=$('rLo'),H=$('rHi');if(+L.value>+H.value){if(i===L)L.value=H.value;else H.value=L.value;}
 st.pmin=+L.value>pb.lo?+L.value:null;st.pmax=+H.value<pb.hi?+H.value:null;paintPrice();reset();renderShop(true);});
const clearAll=()=>{st.exp.clear();st.tipos.clear();st.mats.clear();st.nina.clear();st.cols.clear();st.pmin=st.pmax=null;};
const clearQ=()=>{st.q='';st.qt=[];st.qfix='';qins.forEach(x=>x.value='');};
$('active').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const g=b.dataset.g;
 if(SETS[g])st[SETS[g]].delete(b.dataset.v);else if(g==='p'){st.pmin=st.pmax=null;}else if(g==='q')clearQ();else{clearAll();clearQ();}reset();renderShop();});
qins.forEach(inp=>inp.addEventListener('input',()=>{qins.forEach(x=>{if(x!==inp)x.value=inp.value;});st.q=norm(inp.value);const pq=parseQ(inp.value);st.qt=pq.toks;st.qfix=pq.shown;reset();
 if(view!=='shop'){go('#tienda');}else renderShop();}));
$('sort').addEventListener('change',e=>{st.sort=e.target.value;reset();renderShop();});
$('more').addEventListener('click',e=>{if(e.target.id==='moreB'){st.shown+=PAGE;renderShop();}});
const side=$('side'),scrim=$('scrim');
const openF=()=>{side.classList.add('open');scrim.hidden=false;};const closeF=()=>{side.classList.remove('open');scrim.hidden=true;};
$('openF').onclick=openF;$('closeF').onclick=closeF;scrim.onclick=closeF;

function renderPost(a){
 $('art').innerHTML=`<p class="crumb"><a href="/">Inicio</a> / <a href="/aprende/">Aprende</a></p><span class="tg">${a.tag}</span><h1>${a.title}</h1><p class="dek">${a.dek}</p><img class="hi" src="${jp('i',img0(a.prod))}" alt=""><div class="body">${a.body}</div>
 <div class="shop"><div><b>Encuentra tus prendas</b>Pídelas por WhatsApp con su código.</div><a class="btn pri" href="${a.shop[0]?U.c(a.shop[0]):'/tienda/'}">${a.shop[1]}</a></div>
 ${a.src.length?`<div class="src"><b>Fuentes</b><ul>${a.src.map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join('')}</ul></div>`:''}`;
 $('morePosts').innerHTML=POSTS.filter(x=>x!==a).slice(0,3).map(postCard).join('');}

/* ficha: galería de fotos + selector de modelos (una referencia por modelo) */
let cur=null,ci=0;const ov=$('ov');
function toast(t){const el=$('toast');el.textContent=t;el.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>el.hidden=true,3200);}
const curModel=()=>cur.gal[ci].m;
function showImg(){const g=cur.gal[ci],mk=g.m,cv=mk<0;const M=cv?null:cur.models[mk];
 $('pImg').src=jp('i',g.img);$('pImg').alt=cur.name+(cv?', vista general de todos los modelos':', modelo '+M.ref);
 $('pTag').textContent=cv?'Vista general':M.ref;$('pTag').className='tag'+(cv?' cv':'');
 $('pRef').textContent=cv?'Elige un modelo':M.ref;$('pRef').className=cv?'none':'';
 const k=cv?0:M.imgs.indexOf(g.img);
 $('pRefHelp').textContent=cur.desc||'';if(0)$('pRefHelp').textContent=cv?`Esta foto muestra los ${cur.models.length} modelos juntos. Toca uno abajo para elegirlo.`:[M.desc?M.desc.charAt(0).toUpperCase()+M.desc.slice(1):'',cur.models.length>1?`Modelo ${mk+1} de ${cur.models.length}`:'',M.imgs.length>1?`foto ${k+1} de ${M.imgs.length} de este modelo`:''].filter(Boolean).join(' · ');
 $('pModels').querySelectorAll('.mdl[data-m]').forEach(b=>{const on=+b.dataset.m===mk;b.setAttribute('aria-current',on?'true':'false');if(on&&b.classList.contains('extra'))expand();});
 $('pDots').innerHTML=cur.gal.length>1?cur.gal.map((x,j)=>`<button type="button" data-j="${j}" aria-label="Foto ${j+1}" aria-current="${j===ci}"></button>`).join(''):'';
 $('pPrev').hidden=$('pNext').hidden=cur.gal.length<2;
 $('pOrder').href=wa(`Hola, quiero pedir: ${cur.name}, código ${cur.id} (${money(cur.price)}). ¿Me confirman disponibilidad?`);
 $('pCopy').textContent='Copiar código';}
function openP(id){cur=byId[id];if(!cur)return;ci=0;
 $('pEy').textContent=cur.tags.map(t=>SING[t]||t).join(' · ');$('pName').textContent=cur.name;
 $('pPrice').innerHTML=`<b>${money(cur.price)}</b>${UNIT[cur.unit]?UNIT[cur.unit]+' · ':''}precio sin ITBMS`;
 $('pMeta').innerHTML=[cur.mat,cur.cols&&cur.cols.length?'Color: '+cur.cols.join(', ').toLowerCase():'',cur.medidas||'',cur.nina?'Para niña':''].filter(Boolean).map(x=>`<span>${x}</span>`).join('');
 $('pInc').innerHTML=cur.incl.length?`<span class="ey">Incluye</span><ul class="inc">${cur.incl.map(x=>`<li>${x}</li>`).join('')}</ul>`:'';
 $('pNote').hidden=!cur.note;$('pNote').textContent=cur.note||'';
 const many=cur.models.length>1||cur.vistas.length;
 $('pML').hidden=!many;$('pMLab').textContent=cur.models.length>1?`Elige tu modelo (${cur.models.length})`:'Modelo';
 const tiles=(cur.vistas.length?[`<button type="button" class="mdl cv" data-m="-1"><img src="${jp('t',cur.vistas[0])}" alt=""><b>Todos</b><small>Vista general</small></button>`]:[])
  .concat(cur.models.map((M,k)=>`<button type="button" class="mdl" data-m="${k}"><img src="${jp('t',M.imgs[0])}" alt="" loading="lazy"><b>${M.ref}</b>${M.desc?`<small>${M.desc}</small>`:''}</button>`));
 const VIS=window.matchMedia('(max-width:640px)').matches?5:7;
 const hide=tiles.length>VIS+1?tiles.length-VIS:0;
 $('pModels').classList.toggle('collapsed',hide>0);
 $('pModels').innerHTML=tiles.map((t,j)=>j>=VIS&&hide?t.replace('class="mdl','class="mdl extra'):t).join('')+(hide?`<button type="button" class="mdl morebtn" id="pMore"><b>+${hide}</b><small>Ver ${hide} modelos más</small></button>`:'');
 showImg();ov.hidden=false;document.body.style.overflow='hidden';setH1('product');setHead(U.p(id));$('pClose').focus();}
function closeOv(){if(ov.hidden)return;ov.hidden=true;document.body.style.overflow='';setH1(view);}
const expand=()=>{const pm=$('pModels');pm.classList.remove('collapsed');const mb=$('pMore');if(mb)mb.remove();};
$('pModels').addEventListener('click',e=>{const b=e.target.closest('.mdl');if(!b)return;if(b.id==='pMore'){expand();return;}const m=+b.dataset.m;ci=cur.gal.findIndex(g=>g.m===m);showImg();});
$('pDots').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;ci=+b.dataset.j;showImg();});
$('pPrev').onclick=()=>{ci=(ci-1+cur.gal.length)%cur.gal.length;showImg();};
$('pNext').onclick=()=>{ci=(ci+1)%cur.gal.length;showImg();};
const back=()=>{if(entered)history.back();else go(lastBase&&!lastBase.startsWith('#p-')?lastBase:'#tienda',true);};
$('pClose').onclick=back;ov.addEventListener('click',e=>{if(e.target===ov)back();});
document.addEventListener('keydown',e=>{if(ov.hidden){if(e.key==='Escape')closeF();return;}if(e.key==='Escape')back();if(e.key==='ArrowRight')$('pNext').click();if(e.key==='ArrowLeft')$('pPrev').click();});
async function copy(t){try{await navigator.clipboard.writeText(t);return true;}catch(_){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();let ok=false;try{ok=document.execCommand('copy');}catch(_){}a.remove();return ok;}}
$('pCopy').onclick=async()=>{const m=curModel();const r=m<0?cur.id:cur.models[m].ref;toast(await copy(r)?`Código ${r} copiado.`:`Tu código es ${r}.`);};

let view='',lastBase='',entered=false;
/* un solo <h1> por vista: el de la vista activa es h1; los demás pasan a <p> (la ficha del producto, a h2) */
function setH1(mode){document.querySelectorAll('[data-h1]').forEach(el=>{const k=el.dataset.h1;
 const want=k===mode?'H1':(k==='product'?'H2':'P');if(el.tagName===want)return;
 const n=document.createElement(want);[...el.attributes].forEach(a=>n.setAttribute(a.name,a.value));n.innerHTML=el.innerHTML;el.replaceWith(n);});}
/* título, descripción y canónica de cada URL (los genera tienda.py en DATA.seo) */
const ORIGIN='https://laescapadita.com';
function setHead(path){const m=DATA.seo[path];if(!m)return;document.title=m.t;
 const d=document.querySelector('meta[name="description"]');if(d)d.content=m.d;
 const c=document.querySelector('link[rel="canonical"]');if(c)c.href=ORIGIN+path;}
function show(v){view=v;if($('vHome'))$('vHome').hidden=v!=='home';$('vShop').hidden=v!=='shop';$('vPost').hidden=v!=='post';$('catnav').hidden=v!=='shop';
 document.querySelectorAll('.mnav a').forEach(a=>a.setAttribute('aria-current',a.dataset.v===v?'page':'false'));if(ov.hidden)setH1(v);}
/* rutas internas (#…) <-> URLs reales */
const P2H={'/':'#inicio','/tienda/':'#tienda','/regalos/':'#regalos'};
Object.entries(UR.c).forEach(([k,u])=>P2H[u]='#c-'+k);Object.entries(UR.p).forEach(([id,u])=>P2H[u]='#p-'+id);Object.entries(UR.b).forEach(([sl,u])=>P2H[u]='#blog-'+sl);
P2H['/envios-y-devoluciones/']='#info';P2H['/aprende/']='#idx';
const H2P={};Object.entries(P2H).forEach(([u,h])=>H2P[h]=u);H2P['#aprende']='/#aprende';
const curRoute=()=>{const p=location.pathname.replace(/index\.html$/,'');if(p==='/'&&location.hash==='#aprende')return '#aprende';return P2H[p]||P2H[p+'/']||'#inicio';};
function go(h,replace){const u=H2P[h]||'/';history[replace?'replaceState':'pushState'](null,'',u);route();}
function route(){const h=curRoute();let m;
 if((m=h.match(/^#p-([A-Z]+-\d{3})$/))){if(!view){st.sec=byId[m[1]]?byId[m[1]].sec:'';show('shop');renderShop();setHead(U.c(st.sec));lastBase=st.sec?'#c-'+st.sec:'#tienda';}openP(m[1]);return;}
 closeOv();entered=false;setHead(H2P[h]||'/');
 if(h==='#regalos'){st.sec='';clearAll();st.pmax=GIFT;reset();show('shop');renderShop();window.scrollTo(0,0);}
 else if(h==='#tienda'){if(st.sec!==''||st.pmax===GIFT){st.sec='';clearAll();reset();}show('shop');renderShop();if(lastBase!==h)window.scrollTo(0,0);}
 else if((m=h.match(/^#c-(\w+)$/))&&SECNAME[m[1]]){if(st.sec!==m[1]){st.sec=m[1];clearAll();reset();}show('shop');renderShop();if(lastBase!==h)window.scrollTo(0,0);}
 else if((m=h.match(/^#blog-([\w-]+)$/))&&POSTS.find(a=>a.slug===m[1])){show('post');renderPost(POSTS.find(a=>a.slug===m[1]));window.scrollTo(0,0);}
 else if(h==='#info'||h==='#idx'){show('post');window.scrollTo(0,0);}
 else if(!$('vHome')){location.href=H2P[h]||'/';return;}
 else if(h==='#aprende'){show('home');setTimeout(()=>$('aprende').scrollIntoView(),0);}
 else{show('home');setTimeout(railBtns,50);if(lastBase!==h)window.scrollTo(0,0);}
 lastBase=h;}
/* clics en enlaces internos: cambian de página sin recargar */
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;
 const path=u.pathname,h=path==='/'&&u.hash==='#aprende'?'#aprende':P2H[path];if(!h)return;
 if(h==='#info'||h==='#idx'||((h==='#inicio'||h==='#aprende')&&!$('vHome')))return;
 e.preventDefault();if(h.startsWith('#p-'))entered=true;history.pushState(null,'',path+(h==='#aprende'?'#aprende':''));route();});
window.addEventListener('popstate',route);
/* enlaces viejos con # (ej. /#p-C-001, /#c-cadenas) -> URL nueva */
(()=>{const h=location.hash;if(h&&h!=='#aprende'){const k=h.startsWith('#c-')||h.startsWith('#p-')||h.startsWith('#blog-')||['#inicio','#tienda','#regalos'].includes(h)?h:null;if(k&&H2P[k])history.replaceState(null,'',H2P[k]);}})();
route();
(()=>{const q=new URLSearchParams(location.search).get('q');if(q){qins.forEach(x=>x.value=q);qins[0].dispatchEvent(new Event('input'));}})();
})();

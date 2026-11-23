// Raumplaner · Kneitinger im Antoniushaus
// Skizze, Konfigurator und WhatsApp-Anfrage. Preise und Pakete oben unter EINSTELLUNGEN pflegen.
/* =====================================================================
   EINSTELLUNGEN – hier Preise, Pakete und Extras pflegen
   Preise in Euro inklusive MwSt. (Stand 11/2026, Kalkulation siehe LIESMICH.md). Felder mit "VORSCHLAG" sind noch nicht freigegeben.
   Eigene PNG-Bilder: Datei in den Ordner "img/" legen und den Namen bei
   "png" eintragen. Fehlt die Datei, wird automatisch das gezeichnete
   Symbol angezeigt.
   ===================================================================== */
var WA_NUMBER = '4994160094669';          // WhatsApp-Business-Nummer ohne + und ohne 0
var MAIL = 'info@antoniushaus-kneitinger.de';
var CODES = { 'ANTONIUS10': 0.10 };        // Gutscheincodes und Rabatt
var MAX_P = 44;

// unit: 'day' = pro Tag, 'person' = pro Person, 'flat' = pauschal
var PACKAGES = [
  { id:'flex', group:'Arbeiten & Vernetzen', name:'Coworking-Tagespass (Einzelplatz)', short:'Coworking Tagespass', price:25, unit:'person', layout:'cowork', persons:[1,12,1],
    addons:['lunch'], word:'Coworking',
    info:'Eigener Schreibtisch an offenen Coworking-Tagen (Mo–Do, 9–17 Uhr, außer an exklusiv gebuchten Tagen), inkl. Kaffee, Wasser und WLAN. 10er-Karte 220 €, Monatsmitgliedschaft 249 €.' },
  { id:'cowork', group:'Arbeiten & Vernetzen', name:'Tech-Coworking „Denkraum Pro“', short:'Team-Raum exklusiv', price:350, half:220, unit:'day', layout:'banquet', persons:[2,44,10], days:true, halfday:true,
    addons:['snack','lunch','extraScreen','clean'], word:'Team' },
  { id:'brunch', group:'Arbeiten & Vernetzen', name:'Teambuilding Brunch', short:'Teambuilding Brunch', price:36, unit:'person', layout:'banquet', persons:[10,44,30], min:500, minLabel:'Mindestumsatz',
    addons:['mic','drinks2','yoga'], word:'Brunch' },
  { id:'kreativ', group:'Gestalten', name:'Atelier Plus: Kreativraum', short:'Atelier', price:240, unit:'day', layout:'atelier', persons:[2,20,8], days:true,
    addons:['snack','vernissage','clean','lights'], word:'Atelier' },
  { id:'foto', group:'Gestalten', name:'Atelier Plus: Fotostudio', short:'Fotostudio', price:290, half:170, unit:'day', layout:'studio', persons:[1,10,3], days:true, halfday:true,
    addons:['snack','makeup','clean'], word:'Shooting' },
  { id:'popup', group:'Gestalten', name:'Pop-up Event', short:'Pop-up Event', unit:'none', layout:'atelier', persons:[2,44,20],
    addons:[], word:'Pop-up' },
  { id:'hochzeit', group:'Feiern', name:'Familienfeier', short:'Familienfeier', price:35, unit:'person', layout:'banquet', persons:[10,44,30], min:600, minLabel:'Mindestumsatz',
    addons:['sekt','mic','lights'], word:'Familie' },
  { id:'freunde', group:'Feiern', name:'Treffen unter Freunden', short:'Treffen unter Freunden', price:29, unit:'person', layout:'banquet', persons:[10,44,30], min:600, minLabel:'Mindestumsatz',
    addons:['sekt','mic','lights'], word:'Freunde' },
  { id:'anfrage', group:'Feiern', name:'Individuelle Anfrage', short:'Individuelle Anfrage', unit:'none', layout:'rows', persons:[1,44,20],
    addons:[], word:'Ihr' }
];

// pop: Position im Raumbild in Prozent (x,y)
var ADDONS = {
  snack:      { name:'Getränke- & Snackpauschale', price:16, unit:'person', perDay:true, png:'img/snacks.png',    pop:[16,78], icon:'coffee' },
  studiSnack: { name:'Studi-Pauschale (Kaffee, Wasser, Snack)', price:8, unit:'person', perDay:true, png:'img/snacks.png', pop:[16,78], icon:'coffee' },
  lunch:      { name:'Mittagessen aus der Küche', price:16, unit:'person', perDay:true, png:'img/lunch.png', pop:[30,80], icon:'plate' },
  extraScreen:{ name:'Zusätzlicher Monitor/Beamer', price:30, unit:'flat', perDay:true, png:'img/screen.png', pop:[50,14], icon:'screen' },
  clean:      { name:'Reinigung nach Atelier/Modellbau', price:40, unit:'flat', png:'img/clean.png', pop:[84,80], icon:'broom' },
  fingerfood: { name:'Fingerfood', price:18, unit:'person', png:'img/fingerfood.png', pop:[30,80], icon:'plate', note:'VORSCHLAG' },
  drinks2:    { name:'2 Getränke pro Gast', price:10, unit:'person', png:'img/drinks.png', pop:[16,78], icon:'glass', note:'VORSCHLAG' },
  mic:        { name:'Funkmikrofon & Lautsprecher', price:40, unit:'flat', png:'img/mic.png', pop:[50,16], icon:'mic', note:'VORSCHLAG' },
  lights:     { name:'Lichtquellen', price:80, unit:'flat', png:'img/lights.png', pop:[84,18], icon:'light', fx:'lights' },
  vernissage: { name:'Vernissage-Abend', price:150, unit:'flat', png:'img/vernissage.png', pop:[50,16], icon:'frame' },
  makeup:     { name:'Make-up-Platz mit Spiegel', price:60, unit:'flat', png:'img/makeup.png', pop:[16,20], icon:'mirror' },
  buffet:     { name:'Buffet aus der Küche', price:29, unit:'person', png:'img/buffet.png', pop:[30,80], icon:'plate', note:'VORSCHLAG' },
  sekt:       { name:'Sektempfang', price:7, unit:'person', png:'img/sekt.png', pop:[16,78], icon:'glass', note:'VORSCHLAG' },
  duo:        { name:'Live-Duo', price:500, unit:'flat', png:'img/duo.png', pop:[50,16], icon:'note' },
  shooting:   { name:'Fotoshooting im eigenen Studio', price:190, unit:'flat', png:'img/camera.png', pop:[84,50], icon:'camera' },
  yoga:       { name:'Yoga-Session', price:null, unit:'flat', png:'img/yoga.png', pop:[50,16], icon:'flower', label:'auf Anfrage' },
  torte:      { name:'Torte', price:null, unit:'flat', png:'img/torte.png', pop:[30,50], icon:'cake', label:'auf Anfrage' }
};

/* ============================ ICONS (Fallback) ============================ */
var ICONS = {
  coffee:'<path d="M14 26h26v14a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10z" fill="#000"/><path d="M40 30h4a6 6 0 0 1 0 12h-4" fill="none" stroke="#000" stroke-width="3"/><path d="M20 12c0 4 4 4 4 8M28 10c0 4 4 4 4 8" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  plate:'<circle cx="32" cy="34" r="20" fill="#fff" stroke="#000" stroke-width="3"/><circle cx="32" cy="34" r="11" fill="#000"/><path d="M8 14v14M56 14v14" stroke="#000" stroke-width="3" stroke-linecap="round"/>',
  screen:'<rect x="8" y="12" width="48" height="30" rx="3" fill="#000"/><rect x="12" y="16" width="40" height="22" fill="#dcdcdc"/><path d="M26 50h12M32 42v8" stroke="#000" stroke-width="3"/>',
  broom:'<path d="M40 8 26 34" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M20 32l14 6-6 18-18-8z" fill="#000"/>',
  glass:'<path d="M22 10h20l-3 18a7 7 0 0 1-14 0z" fill="#bdbdbd" stroke="#000" stroke-width="2.5"/><path d="M32 35v14M24 52h16" stroke="#000" stroke-width="3" stroke-linecap="round"/>',
  mic:'<rect x="24" y="8" width="16" height="28" rx="8" fill="#000"/><path d="M18 30a14 14 0 0 0 28 0M32 44v10M24 56h16" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>',
  light:'<path d="M32 8 20 30h24z" fill="#000"/><path d="M20 30 8 58h48L44 30z" fill="#bdbdbd" opacity=".7"/>',
  flower:'<circle cx="32" cy="22" r="8" fill="#000"/><circle cx="22" cy="30" r="8" fill="#bdbdbd"/><circle cx="42" cy="30" r="8" fill="#bdbdbd"/><circle cx="32" cy="30" r="5" fill="#000"/><path d="M32 36v20" stroke="#000" stroke-width="3"/>',
  frame:'<rect x="10" y="10" width="44" height="36" fill="#fff" stroke="#000" stroke-width="4"/><path d="M14 42l12-14 8 8 6-6 10 12z" fill="#dcdcdc"/><path d="M22 46l-6 12M42 46l6 12" stroke="#000" stroke-width="3"/>',
  mirror:'<ellipse cx="32" cy="26" rx="16" ry="20" fill="#eee" stroke="#000" stroke-width="3"/><path d="M32 46v10M22 58h20" stroke="#000" stroke-width="3"/>',
  note:'<path d="M26 44V14l24-6v30" fill="none" stroke="#000" stroke-width="4"/><circle cx="20" cy="44" r="7" fill="#000"/><circle cx="44" cy="38" r="7" fill="#000"/>',
  camera:'<rect x="8" y="18" width="48" height="32" rx="5" fill="#000"/><rect x="22" y="12" width="16" height="8" rx="2" fill="#000"/><circle cx="32" cy="34" r="10" fill="#dcdcdc" stroke="#bdbdbd" stroke-width="3"/>',
  cake:'<rect x="12" y="30" width="40" height="20" rx="3" fill="#bdbdbd"/><rect x="18" y="18" width="28" height="14" rx="3" fill="#fff" stroke="#000" stroke-width="2"/><path d="M32 8v8" stroke="#000" stroke-width="3"/>'
};
function iconURI(k){ return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' + ICONS[k] + '</svg>'); }
function imgTag(a){ return '<img src="' + a.png + '" alt="" onerror="this.onerror=null;this.src=\'' + iconURI(a.icon) + '\'">'; }

/* ============================ RAUM-ZEICHNUNG ============================ */
// Raum: 600 × 400 Einheiten. Innenraum x 30–480, y 30–370, Balkon rechts.
var NT = 50, NC = 50;
function stageSVG(id){
  var s = '<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  s += '<defs><pattern id="fl'+id+'" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><path d="M0 30L30 0" stroke="#efefef" stroke-width="1"/></pattern></defs>';
  s += '<rect x="0" y="0" width="600" height="400" fill="#f4f4f4"/>';
  s += '<rect x="30" y="30" width="450" height="340" fill="url(#fl'+id+')" stroke="#000" stroke-width="6"/>';
  // Fenster oben
  for (var i=0;i<4;i++) s += '<rect x="'+(70+i*105)+'" y="26" width="60" height="8" fill="#cfcfcf"/>';
  // Balkon
  s += '<rect x="480" y="90" width="90" height="220" fill="#f7f7f7" stroke="#000" stroke-width="3" stroke-dasharray="8 6"/>';
  s += '<text x="525" y="205" font-size="14" fill="#000" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="700" letter-spacing="2" transform="rotate(90 525 205)">BALKON</text>';
  s += '<rect x="476" y="150" width="8" height="100" fill="#cfcfcf"/>';
  // Tür unten
  s += '<rect x="90" y="366" width="60" height="8" fill="#f4f4f4"/><path d="M90 366 a60 60 0 0 1 60 -60" fill="none" stroke="#bdbdbd" stroke-width="2"/>';
  // Sonderelemente (Hintergrund, Staffeleien, Pinnwände, Display)
  s += '<g class="f off" data-k="backdrop"><path d="M120 50 Q255 20 390 50 L390 70 Q255 44 120 70 Z" fill="#fff" stroke="#bdbdbd"/><rect x="150" y="66" width="210" height="150" fill="#fff" opacity=".75"/></g>';
  s += '<g class="f off" data-k="studiolights"><path d="M110 250 l40 -40 l10 10 z" fill="#000"/><path d="M400 250 l-40 -40 l-10 10 z" fill="#000"/><circle cx="255" cy="280" r="10" fill="#000"/><rect x="243" y="292" width="24" height="20" fill="#000"/></g>';
  s += '<g class="f off" data-k="walls"><rect x="60" y="50" width="8" height="120" fill="#000"/><rect x="440" y="60" width="8" height="120" fill="#000"/><rect x="200" y="44" width="110" height="8" fill="#000"/></g>';
  s += '<g class="f off" data-k="pinboards"><rect x="80" y="40" width="80" height="12" fill="#8a8a8a"/><rect x="200" y="40" width="80" height="12" fill="#8a8a8a"/><rect x="320" y="40" width="80" height="12" fill="#8a8a8a"/></g>';
  s += '<g class="f off" data-k="display"><rect x="200" y="40" width="110" height="12" rx="2" fill="#000"/></g>';
  // Tische
  for (var t=0;t<NT;t++) s += '<g class="f off" data-t="'+t+'"><rect x="-30" y="-15" width="60" height="30" rx="4" fill="#fff" stroke="#000" stroke-width="2.5"/></g>';
  // Stühle / Personen
  for (var c=0;c<NC;c++) s += '<g class="f off" data-c="'+c+'"><circle r="8" fill="#000"/></g>';
  s += '</svg>';
  return s;
}

// Layouts liefern Tisch-Positionen [x,y,w,h,rund?] und Stuhl-Positionen [x,y]
function L_banquet(p){ // zwei lange Tafeln
  var T=[], C=[], rowsY=[140,260], perSide=Math.ceil(p/4);
  rowsY.forEach(function(y){
    for (var i=0;i<5;i++) T.push([110+i*62, y, 62, 34]);
    for (var j=0;j<11;j++){ C.push([88+j*26, y-30]); C.push([88+j*26, y+30]); }
  });
  return {T:T, C:C.slice(0,p), props:[]};
}
function L_dinner(p){
  var T=[], C=[], pos=[[130,150],[255,150],[380,150],[130,280],[255,280],[380,280]];
  pos.forEach(function(q){ T.push([q[0],q[1],46,46,true]);
    for (var k=0;k<8;k++){ var a=k/8*Math.PI*2; C.push([q[0]+Math.cos(a)*40, q[1]+Math.sin(a)*40]); } });
  return {T:T, C:C.slice(0,p), props:[]};
}
function L_rows(p){
  var C=[]; for (var r=0;r<6;r++) for (var i=0;i<8;i++) C.push([130+i*36, 140+r*36]);
  return {T:[], C:C.slice(0,p), props:[]};
}
function L_standing(p){
  var T=[], C=[], pos=[[120,130],[250,120],[380,130],[150,240],[300,230],[420,250]];
  pos.forEach(function(q){ T.push([q[0],q[1],30,30,true]); });
  for (var i=0;i<p;i++){ var q=pos[i%6], a=(i/6|0)*1.3 + (i%6); C.push([q[0]+Math.cos(a)*30, q[1]+Math.sin(a)*30]); }
  return {T:T, C:C, props:[]};
}
function L_cowork(p){ // Einzeltische in Reihen: jede Person bekommt einen eigenen Tisch, bis 48 Plätze
  var T=[], C=[], PER=12, ROWS=[85,148,211,274], left=Math.max(0, p);
  // Reihe für Reihe von vorne auffüllen, jede Reihe mittig, damit alle zusammensitzen
  for (var r=0; r<ROWS.length && left>0; r++){
    var n = Math.min(PER, left), x0 = 100 + (PER - n) * 15;
    for (var i=0;i<n;i++){ var x = x0 + i*30; T.push([x, ROWS[r], 22, 18]); C.push([x, ROWS[r] + 22]); }
    left -= n;
  }
  return {T:T, C:C, props:[]};
}
function L_uni(p){
  var T=[[150,170,110,70],[330,170,110,70],[150,290,110,60],[330,290,110,60]], C=[];
  T.forEach(function(q){ for (var k=0;k<6;k++){ var side=k<3?-1:1; C.push([q[0]-36+(k%3)*36, q[1]+side*(q[3]/2+14)]); } });
  return {T:T, C:C.slice(0,p), props:['pinboards','display']};
}
function L_atelier(p){
  var T=[[200,200,130,60],[330,280,100,50]], C=[];
  for (var i=0;i<p;i++){ var a=i/p*Math.PI*2; C.push([255+Math.cos(a)*140, 210+Math.sin(a)*110]); }
  return {T:T, C:C, props:['walls']};
}
function L_studio(p){
  var C=[]; for (var i=0;i<p;i++) C.push([200+i*30, 330]);
  return {T:[[255,150,40,40,true]], C:C, props:['backdrop','studiolights']};
}
var LAYOUTS = { banquet:L_banquet, dinner:L_dinner, rows:L_rows, standing:L_standing, cowork:L_cowork, uni:L_uni, atelier:L_atelier, studio:L_studio };

function Stage(el){
  this.el = el;
  // Grafik zeigt nur Raum, Tische und Personen (keine Extras-Icons, Lichteffekte oder Deko)
  el.innerHTML = stageSVG(el.id) + '<div class="label"></div><div class="cap">Schematische Skizze · 50 m²</div>';
  this.svg = el.querySelector('svg');
}
Stage.prototype.render = function(layout, persons, label, addons){
  var L = LAYOUTS[layout](persons), svg = this.svg;
  svg.querySelectorAll('[data-t]').forEach(function(g, i){
    var t = L.T[i];
    if (!t){ g.classList.add('off'); return; }
    var r = g.querySelector('rect');
    r.setAttribute('x', -t[2]/2); r.setAttribute('y', -t[3]/2); r.setAttribute('width', t[2]); r.setAttribute('height', t[3]); r.setAttribute('rx', t[4] ? t[2]/2 : 4);
    g.style.transform = 'translate(' + t[0] + 'px,' + t[1] + 'px)';
    g.classList.remove('off');
  });
  svg.querySelectorAll('[data-c]').forEach(function(g, i){
    var c = L.C[i];
    if (!c){ g.classList.add('off'); g.style.transform = 'translate(255px,370px) scale(.2)'; return; }
    g.style.transform = 'translate(' + c[0] + 'px,' + c[1] + 'px)';
    g.classList.remove('off');
  });
  svg.querySelectorAll('[data-k]').forEach(function(g){ g.classList.add('off'); });
  this.el.querySelector('.label').textContent = label;
};

/* ============================ HERO: Autoplay ============================ */
var hero = new Stage(document.getElementById('heroStage'));
var heroIdx = 0, heroTimer = null;
var bestStage = new Stage(document.getElementById('bestStage'));
var BEST = {
  banquet:  { name:'Bankett', info:'Zwei lange Tafeln. Gut für Hochzeiten, Dinner-Konzerte und Feiern, bis 44 Personen.' },
  rows:     { name:'Reihen', info:'Stuhlreihen. Gut für Konzerte, Lesungen und Vorträge, bis 44 Personen.' },
  standing: { name:'Stehempfang', info:'Stehtische im Raum für Empfänge und Vernissagen.' }
};
function showBest(k){
  var c = BEST[k];
  document.querySelectorAll('[data-b]').forEach(function(b){ var on = b.dataset.b === k; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  document.getElementById('bestInfo').textContent = c.info;
  bestStage.render(k, 0, c.name, []);
}
document.querySelectorAll('[data-b]').forEach(function(b){ b.onclick = function(){ showBest(b.dataset.b); }; });
showBest('banquet');
document.getElementById('mapLoad').onclick = function(){
  var box = document.getElementById('mapBox');
  var f = document.createElement('iframe');
  f.title = 'Karte: Kneitinger im Antoniushaus, Mühlweg 13, 93053 Regensburg';
  f.src = 'https://www.google.com/maps?q=M%C3%BChlweg+13,+93053+Regensburg&output=embed';
  f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  f.setAttribute('allowfullscreen', '');
  f.style.minHeight = '320px';
  box.innerHTML = '';
  box.appendChild(f);
};
var heroModes = document.getElementById('heroModes');
PACKAGES.forEach(function(p, i){
  var b = document.createElement('button'); b.textContent = p.short;
  b.onclick = function(){ stopHero(); showHero(i); };
  heroModes.appendChild(b);
});
function showHero(i){
  heroIdx = i; var p = PACKAGES[i];
  hero.render(p.layout, p.persons[2], p.short + ' · ' + p.persons[2] + ' Personen', (p.incl || []).concat(p.addons.slice(0,1)));
  heroModes.querySelectorAll('button').forEach(function(b, j){ b.classList.toggle('on', j === i); });
}
function stopHero(){ clearInterval(heroTimer); heroTimer = null; }
showHero(0);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  heroTimer = setInterval(function(){ showHero((heroIdx + 1) % PACKAGES.length); }, 3200);

/* ============================ KONFIGURATOR ============================ */
var cfgStage = new Stage(document.getElementById('cfgStage'));
var miniStage = new Stage(document.getElementById('miniStage'));
var state = { pk:'cowork', persons:10, days:1, half:false, addons:[] };
function pkg(){ return PACKAGES.filter(function(p){ return p.id === state.pk; })[0]; }
// Paket kann den Preis eines Extras überschreiben (addonPrice)
function aPrice(p, k){ return (p.addonPrice && k in p.addonPrice) ? p.addonPrice[k] : ADDONS[k].price; }
function eur(n){ return n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' €'; }

var pkGroup = null;
function pkGroups(){ var g = []; PACKAGES.forEach(function(p){ if (g.indexOf(p.group) < 0) g.push(p.group); }); return g; }
function buildPk(){
  var box = document.getElementById('pkList'), cur = pkg();
  if (!pkGroup) pkGroup = cur.group;
  var html = '<div class="tabs" role="group" aria-label="Kategorie">';
  pkGroups().forEach(function(g){ var on = g === pkGroup; html += '<button type="button" data-g="' + g + '" class="' + (on ? 'on' : '') + '" aria-pressed="' + on + '">' + g + '</button>'; });
  html += '</div><div class="pk" style="margin-top:12px">';
  PACKAGES.forEach(function(p){
    if (p.group !== pkGroup) return;
    var pr = p.unit === 'none' ? 'nach Absprache' : p.unit === 'person' ? eur(p.price) + ' p. P.' : (p.halfday ? 'ab ' + eur(p.half) : eur(p.price) + (p.unit === 'day' ? ' / Tag' : ' + Mindestumsatz'));
    html += '<button data-id="' + p.id + '" class="' + (p.id === state.pk ? 'on' : '') + '"><b>' + p.short + '</b><span>' + pr + '</span></button>';
  });
  html += '</div>';
  box.innerHTML = html;
  box.querySelectorAll('[data-g]').forEach(function(b){ b.onclick = function(){ pkGroup = b.dataset.g; var first = PACKAGES.filter(function(p){ return p.group === pkGroup; })[0]; choose(first.id); }; });
  box.querySelectorAll('button[data-id]').forEach(function(b){ b.onclick = function(){ choose(b.dataset.id); }; });
}
function choose(id){
  state.pk = id; var p = pkg();
  state.persons = p.persons[2]; state.days = 1; state.half = false;
  state.addons = (p.incl || []).slice();
  buildPk(); buildQty(); buildAddons(); update();
}
function buildQty(){
  var p = pkg(), h = '';
  h += '<div class="row"><span>Personen</span><div class="stepper"><button data-d="-1" aria-label="weniger">−</button><output id="pOut">' + state.persons + '</output><button data-d="1" aria-label="mehr">+</button></div></div>';
  h += '<input type="range" id="pRange" min="' + p.persons[0] + '" max="' + p.persons[1] + '" value="' + state.persons + '" aria-label="Personen">';
  if (p.halfday) h += '<div class="row"><span>Dauer</span><div class="seg"><button data-h="1" class="' + (state.half ? 'on' : '') + '">Halbtag (4 Std.)</button><button data-h="0" class="' + (!state.half ? 'on' : '') + '">Ganzer Tag</button></div></div>';
  if (p.info) h += '<p class="note">' + p.info + '</p>';
  var box = document.getElementById('qtyBox'); box.innerHTML = h;
  box.querySelectorAll('[data-d]').forEach(function(b){ b.onclick = function(){ setPersons(state.persons + (+b.dataset.d)); }; });
  box.querySelector('#pRange').oninput = function(e){ setPersons(+e.target.value); };
  box.querySelectorAll('[data-h]').forEach(function(b){ b.onclick = function(){ state.half = b.dataset.h === '1'; if (state.half) state.days = 1; buildQty(); update(); }; });
}
function setPersons(n){
  var p = pkg(); state.persons = Math.max(p.persons[0], Math.min(p.persons[1], n));
  document.getElementById('pOut').textContent = state.persons; document.getElementById('pRange').value = state.persons; update();
}
function buildAddons(){
  var p = pkg(), box = document.getElementById('adList'), h = '';
  p.addons.forEach(function(k){
    var a = ADDONS[k], ap = aPrice(p, k), incl = (p.incl || []).indexOf(k) >= 0, on = state.addons.indexOf(k) >= 0;
    var pr = incl ? 'inklusive' : (ap === null ? (a.label || 'auf Anfrage') : '+ ' + eur(ap) + (a.unit === 'person' ? ' p. P.' : '') + (a.perDay ? (a.unit === 'person' ? '/Tag' : ' / Tag') : ''));
    h += '<label class="ad' + (on ? ' on' : '') + (incl ? ' incl' : '') + '" data-k="' + k + '"><input type="checkbox"' + (on ? ' checked' : '') + (incl ? ' disabled' : '') + '><span class="ic">' + imgTag(a) + '</span><span><b>' + a.name + '</b><span>' + pr + '</span></span></label>';
  });
  box.innerHTML = h;
  box.querySelectorAll('.ad:not(.incl)').forEach(function(l){
    l.querySelector('input').onchange = function(e){
      var k = l.dataset.k;
      if (e.target.checked) state.addons.push(k); else state.addons = state.addons.filter(function(x){ return x !== k; });
      l.classList.toggle('on', e.target.checked); update();
    };
  });
}
function calc(){
  var p = pkg();
  if (p.unit === 'none') return { lines: [[p.name, 'nach Absprache']], total: 0, code: '' };
  var L = [], sub = 0, days = (p.days && !state.half) ? state.days : 1, base;
  if (p.unit === 'person'){ base = p.price * state.persons; L.push([p.name + ' · ' + state.persons + ' × ' + eur(p.price), base]); }
  else if (p.unit === 'day'){ var dp = state.half ? p.half : p.price; base = dp * days; L.push([p.name + (state.half ? ' · Halbtag' : ' · ' + days + (days > 1 ? ' Tage' : ' Tag')), base]); }
  else if (p.unit === 'roomperson'){ base = Math.min(p.roomMax, Math.max(p.roomMin, Math.round(p.rate * state.persons * 100) / 100)); L.push([p.name + ' · Raummiete ' + state.persons + ' × ' + eur(p.rate) + ' (min. ' + eur(p.roomMin) + ', max. ' + eur(p.roomMax) + ')', base]); }
  else { base = p.price; L.push([p.name + ' · Abendmiete', base]); }
  sub += base;
  var food = (p.unit === 'person') ? base : 0;
  state.addons.forEach(function(k){
    var a = ADDONS[k];
    if ((p.incl || []).indexOf(k) >= 0){ L.push([a.name, 'inkl.']); return; }
    var ap = aPrice(p, k);
    if (ap === null){ L.push([a.name, 'auf Anfrage']); return; }
    var v = ap * (a.unit === 'person' ? state.persons : 1) * (a.perDay ? days : 1);
    L.push([a.name + (a.unit === 'person' ? ' · ' + state.persons + ' × ' + eur(ap) : ''), v]); sub += v;
    if (a.unit === 'person') food += v;
  });
  if (p.min){
    var gap = Math.max(0, p.min - food);
    if (gap > 0){ L.push([p.minLabel + ' (Aufstockung)', gap]); sub += gap; }
  }
  var code = (document.getElementById('code').value || '').trim().toUpperCase(), disc = 0;
  if (CODES[code]){ disc = Math.round(sub * CODES[code] * 100) / 100; L.push(['Gutschein ' + code + ' (−' + (CODES[code] * 100) + ' %)', -disc]); }
  return { lines: L, total: sub - disc, code: CODES[code] ? code : '' };
}
var lastTotal = null;
function update(){
  var p = pkg(), r = calc();
  document.getElementById('lines').innerHTML = r.lines.map(function(l){ return '<div><span>' + l[0] + '</span><span>' + (typeof l[1] === 'number' ? eur(l[1]) : l[1]) + '</span></div>'; }).join('');
  var t = document.getElementById('total'); t.textContent = p.unit === 'none' ? 'auf Anfrage' : eur(r.total);
  if (lastTotal !== null && lastTotal !== r.total){ t.classList.remove('bump'); void t.offsetWidth; t.classList.add('bump'); }
  lastTotal = r.total;
  document.getElementById('codeOk').textContent = r.code ? '✓ Code aktiv' : '';
  var label = p.short + ' · ' + state.persons + ' Personen';
  cfgStage.render(p.layout, state.persons, label, state.addons);
  miniStage.render(p.layout, state.persons, label, state.addons);
  var msg = message(r);
  document.getElementById('mailLink').href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Raumanfrage Antoniushaus: ' + p.short) + '&body=' + encodeURIComponent(msg);
}
function message(r){
  var p = pkg(), d = document.getElementById('datum').value, n = document.getElementById('name').value.trim();
  if (d){ var x = d.split('-'); d = x[2] + '.' + x[1] + '.' + x[0]; }
  var m = ['Hallo! Ich möchte euren Raum im Antoniushaus anfragen:', '', 'Paket: ' + p.name, 'Personen: ' + state.persons];
  if (p.halfday && state.half) m.push('Dauer: Halbtag'); else if (p.days) m.push('Tage: ' + state.days);
  if (d) m.push('Wunschdatum: ' + d);
  var ex = state.addons.map(function(k){ return ADDONS[k].name; });
  if (ex.length) m.push('Extras: ' + ex.join(', '));
  if (r.code) m.push('Gutscheincode: ' + r.code);
  m.push(p.unit === 'none' ? 'Preis: bitte nach Absprache' : 'Geschätzter Preis laut Website: ' + eur(r.total) + ' inkl. MwSt.');
  if (n) m.push('', 'Viele Grüße, ' + n);
  return m.join('\n');
}
document.getElementById('code').oninput = update;
document.getElementById('datum').onchange = update;
document.getElementById('name').oninput = update;
document.getElementById('send').onclick = function(){
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message(calc())), '_blank');
};
// Paket per Link vorwählen, z. B. raum.html?paket=hochzeit
var q = new URLSearchParams(location.search).get('paket');
choose(PACKAGES.some(function(p){ return p.id === q; }) ? q : 'cowork');

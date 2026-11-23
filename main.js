// Mobiles Menü
(function () {
  var btn = document.querySelector('.menue-btn'), nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var offen = nav.classList.toggle('offen');
    btn.setAttribute('aria-expanded', offen ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('offen'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();

// resmio erst nach Klick laden: vorher werden keine Daten an resmio übertragen
(function () {
  var btn = document.getElementById('resmio-laden');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var box = document.getElementById('resmio-hinweis');
    if (box) box.remove();
    var js = document.createElement('script');
    // Schwarz-weißes Widget. Die resmio-ID steht hinter "id=".
    js.src = 'https://static.resmio.com/static/de/widget.js#id=kneitinger-im-antoniushaus&height=400&width=275&fontSize=14px&backgroundColor=%23ffffff&color=%23000000&linkBackgroundColor=%23000000&facebookLogin=false&newsletterSignup=false&commentsDisabled=false';
    js.async = true;
    document.body.appendChild(js);
  });
})();

// Kontaktformular über Formspree (ohne eigenen Server)
(function () {
  var form = document.getElementById('kontaktformular');
  if (!form) return;
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.action.indexOf('DEINE_FORM_ID') !== -1) {
      status.textContent = 'Das Formular ist noch nicht eingerichtet. Bitte schreiben Sie an info@antoniushaus-kneitinger.de.';
      return;
    }
    var knopf = form.querySelector('button[type="submit"]');
    knopf.disabled = true;
    status.textContent = 'Wird gesendet …';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (r.ok) { form.reset(); status.textContent = 'Danke! Ihre Nachricht ist angekommen. Wir melden uns bald.'; }
        else { status.textContent = 'Das hat leider nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie an info@antoniushaus-kneitinger.de.'; }
      })
      .catch(function () { status.textContent = 'Keine Verbindung. Bitte versuchen Sie es später noch einmal.'; })
      .then(function () { knopf.disabled = false; });
  });
})();

// Filter auf den Katalogseiten
(function () {
  var chips = document.querySelectorAll('[data-filter]');
  if (!chips.length) return;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      document.querySelectorAll('[data-tags]').forEach(function (el) {
        el.hidden = !(f === 'alle' || el.getAttribute('data-tags').split(' ').indexOf(f) !== -1);
      });
      document.querySelectorAll('.gruppe').forEach(function (g) {
        g.hidden = !g.querySelector('[data-tags]:not([hidden])');
      });
    });
  });
})();

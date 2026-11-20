/** Systemis — formulaire de la page Contact. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('cf-status');
  var submit = form.querySelector('button[type="submit"]');
  var horizon = form.querySelector('[name="horizon"]');
  var ACTIVE = ['bg-primary/10', 'border-primary', 'text-primary'];

  // Boutons "Horizon d'intervention" : sélection unique.
  form.querySelectorAll('[data-horizon]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      form.querySelectorAll('[data-horizon]').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
        ACTIVE.forEach(function (c) { b.classList.remove(c); });
      });
      btn.setAttribute('aria-pressed', 'true');
      ACTIVE.forEach(function (c) { btn.classList.add(c); });
      horizon.value = btn.textContent.trim();
    });
  });

  function show(msg, ok) {
    status.textContent = msg;
    status.classList.remove('hidden', 'text-primary', 'text-[#ba1a1a]');
    status.classList.add(ok ? 'text-primary' : 'text-[#ba1a1a]');
  }

  function val(name) {
    var el = form.elements[name];
    return el ? String(el.value).trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submit.disabled) return;

    if (!val('name')) {
      show('Merci d\'indiquer votre nom.', false);
      form.elements.name.focus();
      return;
    }
    if (!window.SystemisLeads.isEmail(val('email'))) {
      show('Merci d\'indiquer une adresse e-mail valide.', false);
      form.elements.email.focus();
      return;
    }

    var parts = val('name').split(/\s+/);
    submit.disabled = true;
    submit.style.opacity = '0.6';
    show('Envoi en cours…', true);

    window.SystemisLeads.send({
      source: 'Contact',
      firstName: parts.shift(),
      lastName: parts.join(' '),
      email: val('email'),
      company: val('company'),
      topic: val('topic'),
      horizon: val('horizon'),
      message: val('message'),
      website: val('website'),
    })
      .then(function () {
        form.reset();
        horizon.value = '';
        form.querySelectorAll('[data-horizon]').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
          ACTIVE.forEach(function (c) { b.classList.remove(c); });
        });
        show('Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24 heures.', true);
      })
      .catch(function () {
        show(window.SystemisLeads.errorMessage, false);
      })
      .then(function () {
        submit.disabled = false;
        submit.style.opacity = '';
      });
  });
})();

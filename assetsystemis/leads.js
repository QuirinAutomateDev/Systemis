/**
 * Systemis — envoi des demandes (formulaire Contact + modal Diagnostic).
 * Les demandes sont transmises au Google Apps Script qui les enregistre
 * dans le Google Sheet et déclenche les notifications e-mail + WhatsApp.
 */
(function () {
  // URL de l'application Web Apps Script (Déployer > Application Web).
  var ENDPOINT = 'COLLER_ICI_URL_APPS_SCRIPT';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function send(data) {
    if (!/^https:\/\/script\.google\.com\//.test(ENDPOINT)) {
      return Promise.reject(new Error('endpoint_not_configured'));
    }
    data.page = window.location.pathname;
    // Content-Type text/plain : évite la requête préalable CORS refusée par Apps Script.
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok) throw new Error((res && res.error) || 'send_failed');
        return res;
      });
  }

  window.SystemisLeads = {
    send: send,
    isEmail: function (v) { return EMAIL_RE.test(String(v || '').trim()); },
    errorMessage:
      "L'envoi n'a pas abouti. Réessayez dans un instant ou écrivez-nous à call@systemis.pro.",
  };
})();

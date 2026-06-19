(function () {

  const modalHTML = `
  <div id="diagnostic-modal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.75); backdrop-filter:blur(8px);" onclick="if(event.target===this)closeDiagnosticModal()">
    <div style="display:flex; align-items:center; justify-content:center; min-height:100%; padding:16px;">
      <div style="background:#1f2022; border:1px solid rgba(255,173,5,0.2); max-width:520px; width:100%; border-radius:8px; position:relative; max-height:90vh; overflow-y:auto;">

        <!-- Header fixe -->
        <div style="padding:32px 32px 0; position:sticky; top:0; background:#1f2022; z-index:1;">
          <button onclick="closeDiagnosticModal()" style="position:absolute; top:16px; right:20px; background:transparent; border:none; color:#9f8e79; cursor:pointer; font-size:22px; line-height:1;">✕</button>
          <span style="display:inline-block; padding:4px 12px; font-size:10px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; color:#ffd295; border:1px solid rgba(255,210,149,0.2); background:rgba(255,210,149,0.05); border-radius:2px; margin-bottom:16px; font-family:'Manrope',sans-serif;">DIAGNOSTIC GRATUIT</span>
          <h2 style="font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; color:#e3e2e4; margin-bottom:6px;">Parlons de votre entreprise.</h2>
          <p style="font-family:'Manrope',sans-serif; font-size:13px; color:#d7c3ac; margin-bottom:20px;">Remplissez ce formulaire — nous vous recontactons sous 24h.</p>
          <div style="display:flex; gap:8px; margin-bottom:28px;">
            <div id="step-bar-1" style="height:3px; flex:1; background:#ffad05; border-radius:2px; transition:all 0.3s;"></div>
            <div id="step-bar-2" style="height:3px; flex:1; background:rgba(255,173,5,0.2); border-radius:2px; transition:all 0.3s;"></div>
          </div>
        </div>

        <!-- Étape 1 -->
        <div id="modal-step-1" style="padding:0 32px 32px;">
          <div style="display:grid; gap:14px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div>
                <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Prénom</label>
                <input type="text" placeholder="Jean" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
              </div>
              <div>
                <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Nom</label>
                <input type="text" placeholder="Dupont" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
              </div>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Email professionnel</label>
              <input type="email" placeholder="jean@entreprise.com" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">WhatsApp / Téléphone</label>
              <input type="tel" placeholder="+229 XX XX XX XX" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Nom de l'entreprise</label>
              <input type="text" placeholder="Mon Entreprise SARL" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
            </div>
          </div>
          <button onclick="goToStep2()" style="width:100%; margin-top:22px; background:#ffad05; color:#442b00; padding:13px; border:none; border-radius:4px; font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700; cursor:pointer; letter-spacing:-0.3px;">
            Continuer →
          </button>
        </div>

        <!-- Étape 2 -->
        <div id="modal-step-2" style="display:none; padding:0 32px 32px;">
          <div style="display:grid; gap:14px;">
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Secteur d'activité</label>
              <select style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">
                <option value="" style="background:#1f2022;">Sélectionnez votre secteur</option>
                <option value="commerce" style="background:#1f2022;">Commerce &amp; Distribution</option>
                <option value="tech" style="background:#1f2022;">Technologie &amp; Digital</option>
                <option value="services" style="background:#1f2022;">Services B2B</option>
                <option value="industrie" style="background:#1f2022;">Industrie &amp; Production</option>
                <option value="sante" style="background:#1f2022;">Santé &amp; Bien-être</option>
                <option value="education" style="background:#1f2022;">Éducation &amp; Formation</option>
                <option value="immobilier" style="background:#1f2022;">Immobilier &amp; Construction</option>
                <option value="autre" style="background:#1f2022;">Autre</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:10px;">Taille de l'entreprise</label>
              <div style="display:flex; gap:10px;">
                <label style="flex:1; cursor:pointer;">
                  <input type="radio" name="diag-taille" value="1-10" style="display:none;" onchange="selectTaille(this)"/>
                  <div class="taille-opt" style="text-align:center; padding:10px; border:1px solid rgba(255,255,255,0.08); border-radius:4px; font-family:'Manrope',sans-serif; font-size:13px; color:#d7c3ac; transition:all 0.2s; cursor:pointer;">1 – 10</div>
                </label>
                <label style="flex:1; cursor:pointer;">
                  <input type="radio" name="diag-taille" value="10-50" style="display:none;" onchange="selectTaille(this)"/>
                  <div class="taille-opt" style="text-align:center; padding:10px; border:1px solid rgba(255,255,255,0.08); border-radius:4px; font-family:'Manrope',sans-serif; font-size:13px; color:#d7c3ac; transition:all 0.2s; cursor:pointer;">10 – 50</div>
                </label>
                <label style="flex:1; cursor:pointer;">
                  <input type="radio" name="diag-taille" value="50+" style="display:none;" onchange="selectTaille(this)"/>
                  <div class="taille-opt" style="text-align:center; padding:10px; border:1px solid rgba(255,255,255,0.08); border-radius:4px; font-family:'Manrope',sans-serif; font-size:13px; color:#d7c3ac; transition:all 0.2s; cursor:pointer;">50 +</div>
                </label>
              </div>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">Principal défi en ce moment</label>
              <textarea placeholder="Décrivez brièvement votre situation et ce que vous souhaitez améliorer..." rows="4" style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box; resize:vertical;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'"></textarea>
            </div>
            <div>
              <label style="display:block; font-family:'Manrope',sans-serif; font-size:11px; font-weight:700; color:#d7c3ac; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:7px;">
                Comment nous avez-vous connus ?
                <span style="font-weight:400; text-transform:none; font-size:11px;"> (optionnel)</span>
              </label>
              <select style="width:100%; background:#121315; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:11px 13px; color:#e3e2e4; font-family:'Manrope',sans-serif; font-size:14px; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#ffad05'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">
                <option value="" style="background:#1f2022;">Sélectionnez une option</option>
                <option value="reseaux" style="background:#1f2022;">Réseaux sociaux</option>
                <option value="bouche" style="background:#1f2022;">Bouche à oreille</option>
                <option value="google" style="background:#1f2022;">Google / Recherche</option>
                <option value="recommandation" style="background:#1f2022;">Recommandation</option>
                <option value="autre" style="background:#1f2022;">Autre</option>
              </select>
            </div>
          </div>
          <div style="display:flex; gap:12px; margin-top:22px;">
            <button onclick="goToStep1()" style="flex:1; background:transparent; color:#d7c3ac; padding:13px; border:1px solid rgba(255,255,255,0.1); border-radius:4px; font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700; cursor:pointer;">
              ← Retour
            </button>
            <button onclick="submitDiagnostic()" style="flex:2; background:#ffad05; color:#442b00; padding:13px; border:none; border-radius:4px; font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700; cursor:pointer; letter-spacing:-0.3px;">
              Envoyer ma demande
            </button>
          </div>
        </div>

        <!-- Confirmation -->
        <div id="modal-success" style="display:none; padding:48px 32px; text-align:center;">
          <div style="width:64px; height:64px; background:rgba(255,173,5,0.1); border:2px solid #ffad05; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:28px; color:#ffad05;">✓</div>
          <h3 style="font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; color:#ffad05; margin-bottom:12px;">Demande envoyée !</h3>
          <p style="font-family:'Manrope',sans-serif; font-size:14px; color:#d7c3ac; line-height:1.7; margin-bottom:28px;">Nous avons bien reçu votre demande de diagnostic.<br/>Notre équipe vous contactera sous <strong style="color:#e3e2e4;">24 heures</strong>.</p>
          <button onclick="closeDiagnosticModal()" style="background:#ffad05; color:#442b00; padding:12px 36px; border:none; border-radius:4px; font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700; cursor:pointer;">
            Fermer
          </button>
        </div>

      </div>
    </div>
  </div>`;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Branchement automatique sur tous les boutons contenant "diagnostic"
    document.querySelectorAll('button, a').forEach(function (el) {
      if (el.textContent.toLowerCase().includes('diagnostic')) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openDiagnosticModal();
        });
      }
    });
  });

  window.openDiagnosticModal = function () {
    document.getElementById('diagnostic-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    resetModal();
  };

  window.closeDiagnosticModal = function () {
    document.getElementById('diagnostic-modal').style.display = 'none';
    document.body.style.overflow = '';
  };

  window.goToStep2 = function () {
    document.getElementById('modal-step-1').style.display = 'none';
    document.getElementById('modal-step-2').style.display = 'block';
    document.getElementById('step-bar-2').style.background = '#ffad05';
  };

  window.goToStep1 = function () {
    document.getElementById('modal-step-2').style.display = 'none';
    document.getElementById('modal-step-1').style.display = 'block';
    document.getElementById('step-bar-2').style.background = 'rgba(255,173,5,0.2)';
  };

  window.selectTaille = function (input) {
    document.querySelectorAll('.taille-opt').forEach(function (el) {
      el.style.borderColor = 'rgba(255,255,255,0.08)';
      el.style.color = '#d7c3ac';
      el.style.background = 'transparent';
    });
    var div = input.nextElementSibling;
    div.style.borderColor = '#ffad05';
    div.style.color = '#ffad05';
    div.style.background = 'rgba(255,173,5,0.05)';
  };

  window.submitDiagnostic = function () {
    document.getElementById('modal-step-2').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
  };

  function resetModal() {
    document.getElementById('modal-step-1').style.display = 'block';
    document.getElementById('modal-step-2').style.display = 'none';
    document.getElementById('modal-success').style.display = 'none';
    document.getElementById('step-bar-2').style.background = 'rgba(255,173,5,0.2)';
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDiagnosticModal();
  });

})();

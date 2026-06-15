// ─── FAS ───────────────────────────────────────────────────────────────────
const phases = ['Projektering', 'Produktion'];
let currentPhase = 0;
let pendingPhase = null;
 
function changePhase(dir) {
  const next = currentPhase + dir;
  if (next < 0 || next >= phases.length) return;
  if (dir === 1) {
    pendingPhase = next;
    document.getElementById('confirm-from').textContent = phases[currentPhase];
    document.getElementById('confirm-to').textContent = phases[next];
    document.getElementById('confirm-overlay').classList.add('show');
  } else {
    currentPhase = next;
    updatePhaseUI();
  }
}
 
function confirmPhase() {
  currentPhase = pendingPhase;
  document.getElementById('confirm-overlay').classList.remove('show');
  updatePhaseUI();
}
 
function cancelPhase() {
  pendingPhase = null;
  document.getElementById('confirm-overlay').classList.remove('show');
}
 
function updatePhaseUI() {
  document.getElementById('phase-text').textContent = phases[currentPhase];
  document.getElementById('topbar-fas').textContent = phases[currentPhase];
  document.getElementById('arrow-left').classList.toggle('disabled', currentPhase === 0);
  document.getElementById('arrow-right').classList.toggle('disabled', currentPhase === phases.length - 1);
}
 
// ─── DATA ──────────────────────────────────────────────────────────────────
const columns = [
  {
    id: 'byggherreansvar',
    title: 'Byggherreansvar & laguppfyllelse',
    cards: [
      {
        key: 'pbl_ansvar',
        title: 'Byggherreansvar enligt PBL',
        sub: 'Är byggherrens ansvar dokumenterat och känt i projektorganisationen?',
        tooltip: 'Byggherren har det fulla ansvaret för att byggnadsåtgärder utförs enligt PBL, PBF och BBR.',
        checks: [
          'Byggherrens ansvar är skriftligt dokumenterat',
          'Ansvarsfördelning är kommunicerad till projektorganisationen',
          'Ansvarsdokumentet är godkänt och signerat av byggherre',
          'Dokumentet är tillgängligt i projektets system'
        ]
      },
      {
        key: 'ka_utsedd',
        title: 'Kontrollansvarig (KA) är utsedd',
        sub: 'Är KA utsedd och dokumenterad enligt PBL 10 kap?',
        tooltip: 'KA ska vara certifierad och registrerad. Uppdraget ska regleras i ett skriftligt avtal.',
        checks: [
          'KA är formellt utsedd och dokumenterad',
          'KA är certifierad enligt PBL',
          'KA:s uppdragsbeskrivning är fastställd',
          'KA är anmäld till byggnadsnämnden'
        ]
      },
      {
        key: 'kravstallning',
        title: 'Kravställning från byggherre är definerad',
        sub: 'Är byggherrens krav dokumenterade i projektets handlingar?',
        tooltip: 'Byggherrens krav ska vara tydligt definierade och förankrade med projektorganisationen.',
        checks: [
          'Kravdokument är upprättat och versionshanterat',
          'Funktionskrav är specificerade',
          'Kraven är förankrade med projektorganisationen',
          'Kravdokumentet är godkänt av byggherre'
        ]
      },
      {
        key: 'kontrollplan',
        title: 'Kontrollplan',
        sub: 'Finns kontrollplan upprättad enligt PBL?',
        tooltip: 'Kontrollplanen ska beskriva vilka kontroller som ska utföras, vem som ansvarar och hur resultatet dokumenteras.',
        checks: [
          'Kontrollplan är upprättad enligt PBL',
          'Kontrollplanen är godkänd av byggnadsnämnden',
          'Ansvar för respektive kontrollpunkt är fördelat',
          'Kontrollplanen är känd av projektorganisationen'
        ]
      },
      {
        key: 'bygglov',
        title: 'Bygglov och startbesked',
        sub: 'Är bygglov beviljat och startbesked erhållet?',
        tooltip: 'Byggnadsarbeten får inte påbörjas innan startbesked har givits av byggnadsnämnden.',
        checks: [
          'Bygglov är beviljat',
          'Startbesked är erhållet',
          'Startbesked finns tillgängligt på arbetsplatsen',
          'Eventuella villkor i startbeskedet är uppfyllda'
        ]
      }
    ]
  },
  {
    id: 'avtal',
    title: 'Avtal & upphandling',
    cards: [
      {
        key: 'affarsform',
        title: 'Affärsform är vald',
        sub: 'Är affärsform och entreprenadform beslutad?',
        tooltip: 'Val av affärsform påverkar ansvarsfördelning, risk och kontrollmöjligheter under projektet.',
        checks: [
          'Affärsform är beslutad och dokumenterad',
          'Entreprenadjuridisk form är fastställd',
          'Beslutet är förankrat med styrgrupp',
          'Affärsformen är kommunicerad till projektteamet'
        ]
      },
      {
        key: 'tidsplan_kontrakt',
        title: 'Tidsplan enligt kontrakt',
        sub: 'Finns kontraktsenlig tidsplan upprättad?',
        tooltip: 'Tidsplanen ska vara avtalad med samtliga parter och reglera milstolpar och leveranser.',
        checks: [
          'Huvudtidsplan är upprättad och godkänd',
          'Tidsplanen är förankrad med alla kontraktsparter',
          'Milstolpar är definierade och kommunicerade',
          'Tidsplanen är versionshanterad i projektportalen'
        ]
      },
      {
        key: 'konsultavtal',
        title: 'Avtal med konsult finns',
        sub: 'Är alla projekterande konsulter kontrakterade?',
        tooltip: 'Konsultavtal ska reglera ansvar, leveranser, ersättning och immateriella rättigheter.',
        checks: [
          'Alla erforderliga konsulter är kontrakterade',
          'Uppdragsbeskrivningar är fastställda i avtalen',
          'Ersättningsform är reglerad i avtalen',
          'Avtal är signerade och arkiverade'
        ]
      },
      {
        key: 'ersattningsform',
        title: 'Ersättningsform är fastställd',
        sub: 'Är ersättningsform beslutad för alla kontrakt?',
        tooltip: 'Ersättningsformen påverkar incitament och riskfördelning mellan parterna.',
        checks: [
          'Ersättningsform är beslutad och dokumenterad',
          'Ersättningsmodellen är förankrad med ekonomiansvarig',
          'Indexklausuler är reglerade i avtalen',
          'Betalningsplan är fastställd'
        ]
      },
      {
        key: 'kontroll_verifiering',
        title: 'Kontroll- & verifieringskrav är reglerade',
        sub: 'Är krav på kontroll och verifiering reglerade i avtalen?',
        tooltip: 'Avtalen ska tydligt reglera vilka kontroller och verifieringar leverantören ansvarar för.',
        checks: [
          'Kontrollkrav är specificerade i avtalen',
          'Verifieringskrav är dokumenterade',
          'Dokumentationskrav är reglerade',
          'Krav är accepterade av leverantören'
        ]
      }
    ]
  },
  {
    id: 'projektering',
    title: 'Projektering',
    cards: [
      {
        key: 'projektorganisation',
        title: 'Projektorganisation',
        sub: 'Är projektorganisationen fastställd och känd?',
        tooltip: 'En tydlig projektorganisation med definierade roller och ansvar är grundläggande för ett framgångsrikt projekt.',
        checks: [
          'Projektorganisation är fastställd och dokumenterad',
          'Roller och ansvar är tydligt definierade',
          'Organisationsschema är kommunicerat till alla parter',
          'Beslutsmandat är definierade per roll'
        ]
      },
      {
        key: 'byggherre_krav_proj',
        title: 'Byggherrens krav inför projektering',
        sub: 'Är byggherrens krav definierade inför projekteringsstarten?',
        tooltip: 'Tydliga krav från byggherren är en förutsättning för att projekteringen ska kunna genomföras effektivt.',
        checks: [
          'Rumsprogram är fastställt',
          'Tekniska krav är specificerade',
          'Gestaltningsprinciper är definierade',
          'Kravdokument är överlämnat till projekterande konsulter'
        ]
      },
      {
        key: 'funktionskrav',
        title: 'Funktionskrav är definerade',
        sub: 'Är funktionskraven specificerade och dokumenterade?',
        tooltip: 'Funktionskrav ska beskriva vad byggnaden ska klara av, inte hur det ska uppnås.',
        checks: [
          'Funktionskrav är dokumenterade',
          'Krav är verifierbara och mätbara',
          'Funktionskraven är accepterade av projektorganisationen',
          'Krav är integrerade i projekteringsunderlaget'
        ]
      },
      {
        key: 'arbetsmiljo_proj',
        title: 'Arbetsmiljörisker är beaktade',
        sub: 'Är arbetsmiljörisker identifierade och beaktade i projekteringen?',
        tooltip: 'BAS-P ansvarar för att samordna arbetsmiljöfrågor under projekteringsskedet.',
        checks: [
          'BAS-P är utsedd',
          'Arbetsmiljörisker är identifierade och dokumenterade',
          'Riskhanteringsplan är upprättad',
          'Arbetsmiljöhänsyn är integrerade i projekteringshandlingarna'
        ]
      }
    ]
  },
  {
    id: 'overlamnande',
    title: 'Överlämnande & förvaltning',
    cards: [
      {
        key: 'relationshandlingar',
        title: 'Relationshandlingar finns',
        sub: 'Finns uppdaterade relationshandlingar tillgängliga?',
        tooltip: 'Relationshandlingar ska spegla det faktiskt utförda arbetet och utgör underlag för förvaltning.',
        checks: [
          'Relationshandlingar är upprättade',
          'Handlingarna är granskade och godkända',
          'Relationshandlingar är arkiverade i rätt system',
          'Förvaltningen har fått tillgång till handlingarna'
        ]
      },
      {
        key: 'drift_underhall',
        title: 'Drift- & underhållsinstruktioner',
        sub: 'Finns drift- och underhållsinstruktioner för alla installationer?',
        tooltip: 'Instruktionerna ska täcka alla tekniska system och installationer i byggnaden.',
        checks: [
          'Drift- och underhållsinstruktioner är upprättade',
          'Instruktioner täcker alla tekniska system',
          'Instruktionerna är överlämnade till förvaltningen',
          'Driftansvarig är utbildad på systemen'
        ]
      },
      {
        key: 'overlamnande_forvaltning',
        title: 'Överlämnande till förvaltning sker',
        sub: 'Är överlämnandet till förvaltningen planerat och dokumenterat?',
        tooltip: 'Överlämnandet ska ske strukturerat och inkludera utbildning av förvaltningspersonal.',
        checks: [
          'Överlämnandeprocess är dokumenterad',
          'Förvaltningspersonal är identifierad',
          'Överlämnandemöte är genomfört',
          'Protokoll från överlämnandemöte är upprättat'
        ]
      }
    ]
  },
  {
    id: 'verifiering',
    title: 'Verifiering',
    cards: [
      {
        key: 'kontrollplan_uppfylld',
        title: 'Kontrollplan är uppfylld',
        sub: 'Är alla kontrollpunkter i kontrollplanen genomförda och dokumenterade?',
        tooltip: 'Kontrollplanen ska vara helt ifylld och dokumenterad innan slutbesked kan erhållas.',
        checks: [
          'Alla kontrollpunkter är genomförda',
          'Resultat är dokumenterade i kontrollplanen',
          'Avvikelser är hanterade och stängda',
          'KA har signerat kontrollplanen'
        ]
      },
      {
        key: 'kontrollprogram',
        title: 'Kontrollprogram är uppfyllt',
        sub: 'Är kontrollprogrammets alla delar genomförda?',
        tooltip: 'Kontrollprogrammet beskriver de tekniska kontroller som ska utföras av oberoende part.',
        checks: [
          'Alla provningar är genomförda',
          'Provningsprotokoll är upprättade',
          'Godkända provningar är dokumenterade',
          'Kontrollprogrammet är signerat av ansvarig'
        ]
      },
      {
        key: 'funktionskrav_verifiering',
        title: 'Verifiering av funktionskrav är genomförd',
        sub: 'Är alla funktionskrav verifierade och dokumenterade?',
        tooltip: 'Verifieringen ska visa att byggnaden uppfyller de krav som ställdes vid projekteringsstart.',
        checks: [
          'Alla funktionskrav är verifierade',
          'Verifieringsrapport är upprättad',
          'Avvikelser mot krav är dokumenterade och hanterade',
          'Byggherre har godkänt verifieringsresultaten'
        ]
      },
      {
        key: 'intyg_dokumentation',
        title: 'Intyg & dokumentation',
        sub: 'Finns alla erforderliga intyg och certifikat tillgängliga?',
        tooltip: 'Intyg och certifikat är nödvändiga för att erhålla slutbesked från byggnadsnämnden.',
        checks: [
          'Brandskyddsintyg är upprättat',
          'Energideklaration är genomförd',
          'OVK är utförd och godkänd',
          'Alla obligatoriska intyg är arkiverade'
        ]
      }
    ]
  },
  {
    id: 'regelverk',
    title: 'Regelverk',
    isRegelverk: true,
    cards: [
      { key: 'bbr', title: 'BBR', sub: 'Boverkets byggregler', tooltip: 'BBR innehåller regler om utformning och tekniska egenskapskrav på byggnadsverk.', info: 'Boverkets byggregler (BBR) innehåller regler om utformning samt tekniska egenskapskrav på byggnadsverk. Reglerna gäller vid uppförande av nya byggnader samt vid ändring av byggnader.', links: [{ title: 'Boverkets webbplats', sub: 'boverket.se – officiell information om BBR', url: 'https://www.boverket.se' }, { title: 'BBR – fullständig text', sub: 'Läs hela regelverket hos Boverket', url: 'https://www.boverket.se/sv/lag--ratt/boverkets-forfattningssamling/boverkets-byggregler---bbr/' }] },
      { key: 'pbl', title: 'PBL', sub: 'Plan- och bygglagen', tooltip: 'PBL reglerar planläggning av mark och vatten samt byggande.', info: 'Plan- och bygglagen (PBL) innehåller bestämmelser om planläggning av mark och vatten och om byggande. Lagen syftar till att främja en samhällsutveckling med jämlika och goda sociala levnadsförhållanden.', links: [{ title: 'PBL på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan--och-bygglag-2010900_sfs-2010-900/' }, { title: 'Boverket om PBL', sub: 'Boverkets vägledning om PBL', url: 'https://www.boverket.se/sv/PBL-kunskapsbanken/' }] },
      { key: 'afs', title: 'AFS', sub: 'Arbetsmiljöverkets författningssamling', tooltip: 'AFS innehåller regler om arbetsmiljö och säkerhet på arbetsplatsen.', info: 'Arbetsmiljöverkets författningssamling (AFS) innehåller föreskrifter och allmänna råd om arbetsmiljö. Reglerna gäller för alla arbetsgivare och syftar till att förebygga ohälsa och olycksfall i arbetet.', links: [{ title: 'Arbetsmiljöverkets webbplats', sub: 'av.se – alla AFS-föreskrifter', url: 'https://www.av.se/arbetsmiljoarbete-och-inspektioner/lagar-och-regler-om-arbetsmiljo/arbetsmiljoverkets-foreskrifter/' }] },
      { key: 'miljobalken', title: 'Miljöbalken', sub: 'Sveriges miljölagstiftning', tooltip: 'Miljöbalken samlar regler om miljöskydd, naturvård och hushållning med naturresurser.', info: 'Miljöbalken är en samlad svensk miljölagstiftning som trädde i kraft 1999. Den innehåller regler om miljöskydd, naturvård, hushållning med mark, vatten och andra naturresurser samt miljökonsekvensbeskrivningar.', links: [{ title: 'Miljöbalken på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/' }] },
      { key: 'rattvistbyggande', title: 'Rättvist byggande', sub: 'Etiska riktlinjer för byggbranschen', tooltip: 'Rättvist byggande handlar om schyssta villkor och motverkande av osund konkurrens i byggbranschen.', info: 'Rättvist byggande är ett initiativ inom byggbranschen som syftar till att motverka osund konkurrens, säkerställa schyssta arbetsvillkor och bidra till en mer hållbar och transparent bransch.', links: [{ title: 'Rättvist byggande', sub: 'Läs mer om initiativet', url: 'https://www.rattvistbyggande.se/' }] }
    ]
  }
];
 
// ─── STATE ─────────────────────────────────────────────────────────────────
const state = {};
columns.forEach(col => {
  col.cards.forEach(card => {
    state[card.key] = { checks: [], flagged: false, comment: '' };
  });
});
 
// ─── RENDER BOARD ──────────────────────────────────────────────────────────
function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = columns.map(col => `
    <div class="column">
      <div class="col-title">${col.title}</div>
      ${col.cards.map(card => `
        <div class="card" onclick="openModal('${card.key}')">
          <div class="card-top">
            <div class="card-title">${card.title}</div>
            <div class="card-icons">
              <div class="status-badge s-none" id="badge-${card.key}"><div class="status-dot"></div><span></span></div>
              <div class="bevaka-badge" id="bevaka-badge-${card.key}"><div class="bevaka-dot"></div>Bevakas</div>
            </div>
          </div>
          <div class="card-footer">
            <div class="card-btn"><i class="ti ti-arrow-right"></i></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}
 
// ─── STATUS ────────────────────────────────────────────────────────────────
function getStatus(key) {
  const card = findCard(key);
  if (!card || card.isRegelverk) return null;
  const total = card.checks.length;
  const checked = (state[key].checks || []).filter(Boolean).length;
  if (checked === 0) return null;
  if (checked < total) return 'pagaende';
  return 'klar';
}
 
function applyBadge(el, status) {
  if (!el) return;
  const map = {
    pagaende: { cls: 's-pagaende', dot: 'd-pagaende', text: 'Pågående' },
    klar:     { cls: 's-klar',     dot: 'd-klar',     text: 'Klar' }
  };
  if (!status) {
    el.className = 'status-badge s-none';
    el.querySelector('.status-dot').className = 'status-dot';
    el.querySelector('span').textContent = '';
  } else {
    const m = map[status];
    el.className = 'status-badge ' + m.cls;
    el.querySelector('.status-dot').className = 'status-dot ' + m.dot;
    el.querySelector('span').textContent = m.text;
  }
}
 
function findCard(key) {
  for (const col of columns) {
    for (const card of col.cards) {
      if (card.key === key) return card;
    }
  }
  return null;
}
 
function isRegelverk(key) {
  const col = columns.find(c => c.cards.some(card => card.key === key));
  return col && col.isRegelverk;
}
 
// ─── MODAL ─────────────────────────────────────────────────────────────────
let currentKey = null;
 
function openModal(key) {
  currentKey = key;
  const card = findCard(key);
  if (!card) return;
 
  document.getElementById('modal-title').textContent = card.title;
  document.getElementById('modal-sub').textContent = card.sub;
  document.getElementById('modal-tooltip').textContent = card.tooltip;
 
  if (isRegelverk(key)) {
    document.getElementById('modal-tasks').style.display = 'none';
    document.getElementById('modal-regelverk').style.display = 'block';
    document.getElementById('modal-info-text').textContent = card.info;
    document.getElementById('modal-links').innerHTML = card.links.map(l => `
      <a class="info-link" href="${l.url}" target="_blank">
        <div class="info-link-icon"><i class="ti ti-external-link"></i></div>
        <div>
          <div class="info-link-title">${l.title}</div>
          <div class="info-link-sub">${l.sub}</div>
        </div>
        <i class="ti ti-chevron-right info-link-arrow"></i>
      </a>
    `).join('');
    applyBadge(document.getElementById('modal-badge'), null);
    document.getElementById('modal-bevaka-badge').className = 'bevaka-badge-modal s-none';
  } else {
    document.getElementById('modal-tasks').style.display = 'block';
    document.getElementById('modal-regelverk').style.display = 'none';
    const s = state[key];
    document.getElementById('modal-checks').innerHTML = card.checks.map((q, i) => `
      <div class="checkbox-item">
        <input type="checkbox" id="chk-${i}" ${s.checks[i] ? 'checked' : ''} onchange="updateModal()">
        <label for="chk-${i}">${q}</label>
      </div>
    `).join('');
    document.getElementById('modal-comment').value = s.comment || '';
    updateModal();
  }
 
  document.getElementById('overlay').classList.add('show');
}
 
function updateModal() {
  if (!currentKey || isRegelverk(currentKey)) return;
  const card = findCard(currentKey);
  const boxes = document.querySelectorAll('#modal-checks input[type=checkbox]');
  state[currentKey].checks = Array.from(boxes).map(b => b.checked);
  const total = card.checks.length;
  const checked = state[currentKey].checks.filter(Boolean).length;
  const pct = total > 0 ? (checked / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = checked + ' / ' + total;
  const status = getStatus(currentKey);
  applyBadge(document.getElementById('modal-badge'), status);
  applyBadge(document.getElementById('badge-' + currentKey), status);
  const flagged = state[currentKey].flagged;
  document.getElementById('bevaka-badge-' + currentKey).classList.toggle('visible', flagged);
  document.getElementById('modal-bevaka-badge').className = flagged ? 'bevaka-badge-modal visible' : 'bevaka-badge-modal s-none';
  const btn = document.getElementById('bevaka-btn');
  btn.classList.toggle('active', flagged);
  document.getElementById('bevaka-icon').className = flagged ? 'ti ti-flag-filled' : 'ti ti-flag';
  document.getElementById('bevaka-text').textContent = flagged ? 'Bevakas' : 'Bevaka';
}
 
function toggleFlag() {
  if (!currentKey) return;
  state[currentKey].flagged = !state[currentKey].flagged;
  updateModal();
}
 
function saveModal() {
  if (!currentKey) return;
  state[currentKey].comment = document.getElementById('modal-comment').value;
  updateModal();
  closeModal();
}
 
function closeModal() {
  document.getElementById('overlay').classList.remove('show');
  currentKey = null;
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}
 
// ─── INIT ──────────────────────────────────────────────────────────────────
renderBoard();
updatePhaseUI();
 

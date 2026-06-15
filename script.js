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
 
// ─── YRKESGRUPPER ──────────────────────────────────────────────────────────
const yrkesgrupper = ['ark', 'kon', 'vvs', 'el', 'geo', 'brand'];
const yrkesNamn = {
  ark: 'Arkitekt',
  kon: 'Konstruktör',
  vvs: 'VVS-konsult',
  el: 'Elkonsult',
  geo: 'Geotekniker',
  brand: 'Brandkonsult'
};
 
function toggleExpandMain(id) {
  const content = document.getElementById('expand-content-' + id);
  const arrow = document.getElementById('expand-arrow-' + id);
  content.classList.toggle('open');
  arrow.classList.toggle('open');
}
 
function toggleYrke(cardKey, yrke) {
  const subs = document.getElementById('subs-' + cardKey + '-' + yrke);
  const arrow = document.getElementById('arrow-' + cardKey + '-' + yrke);
  subs.classList.toggle('open');
  arrow.classList.toggle('open');
}
 
function updateYrke(cardKey, yrke) {
  const subs = document.querySelectorAll('#subs-' + cardKey + '-' + yrke + ' input[type=checkbox]');
  const anyChecked = Array.from(subs).some(cb => cb.checked);
  const yrkeBox = document.getElementById('yrke-' + cardKey + '-' + yrke);
  if (yrkeBox) yrkeBox.checked = anyChecked;
  updateExpandMain(cardKey);
}
 
function updateExpandMain(cardKey) {
  const allChecked = yrkesgrupper.every(yrke => {
    const box = document.getElementById('yrke-' + cardKey + '-' + yrke);
    return box && box.checked;
  });
  const mainBox = document.getElementById('expand-main-' + cardKey);
  if (mainBox) mainBox.checked = allChecked;
  // Uppdatera kortets status
  updateCardStatus(cardKey);
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
      },
      {
        key: 'tekniska_egenskaper',
        title: 'Tekniska egenskapskrav är uppfyllda',
        sub: 'Är de tekniska egenskapskraven enligt BBR beaktade?',
        tooltip: 'BBR ställer krav på bärförmåga, brandskydd, hygien, buller, energihushållning m.m.',
        checks: [
          'Bärförmåga och stadga är verifierad',
          'Brandskyddskrav är beaktade i projekteringen',
          'Energikrav enligt BBR är uppfyllda',
          'Bullerkrav är verifierade',
          'Tillgänglighetskrav är beaktade'
        ]
      },
      {
        key: 'slutbesked',
        title: 'Slutbesked är planerat',
        sub: 'Är processen för att erhålla slutbesked planerad?',
        tooltip: 'Slutbesked krävs för att byggnaden ska få tas i bruk. Alla villkor i startbeskedet måste vara uppfyllda.',
        checks: [
          'Ansökan om slutbesked är planerad',
          'Alla kontrollpunkter i kontrollplanen är genomförda',
          'KA har lämnat sitt utlåtande',
          'Slutsamråd är genomfört med byggnadsnämnden'
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
          'Avtal är signerade och arkiverade'
        ],
        expandCheck: {
          id: 'konsultavtal_expand',
          label: 'Uppfyller samtliga projektörer kraven enligt PBL, PBF och BBR?'
        }
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
        ],
        expandCheck: {
          id: 'kontroll_expand',
          label: 'Har CV mottagits från samtliga konsulter?'
        }
      },
      {
        key: 'upphandlingsstrategi',
        title: 'Upphandlingsstrategi är fastställd',
        sub: 'Är upphandlingsstrategin beslutad och dokumenterad?',
        tooltip: 'En tydlig upphandlingsstrategi skapar förutsättningar för effektiv konkurrens och kvalitetssäkring.',
        checks: [
          'Upphandlingsstrategi är dokumenterad',
          'Utvärderingskriterier är fastställda',
          'Förfrågningsunderlag är upprättat',
          'Upphandlingen är genomförd enligt LOU om tillämpligt'
        ]
      },
      {
        key: 'ansvarsforsakring',
        title: 'Ansvarsförsäkringar är kontrollerade',
        sub: 'Har alla konsulter och entreprenörer giltiga ansvarsförsäkringar?',
        tooltip: 'Giltiga ansvarsförsäkringar är ett grundläggande krav för alla som arbetar i projektet.',
        checks: [
          'Alla konsulters försäkringsbevis är kontrollerade',
          'Försäkringsbelopp är tillräckliga',
          'Försäkringarna gäller under hela projekttiden',
          'Kopia på försäkringsbevis är arkiverade'
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
      },
      {
        key: 'projekteringshandlingar',
        title: 'Projekteringshandlingar är granskade',
        sub: 'Är alla projekteringshandlingar granskade och godkända?',
        tooltip: 'Granskning av projekteringshandlingar säkerställer att kraven är uppfyllda innan byggstart.',
        checks: [
          'Handlingar är granskade av byggherre',
          'Teknisk granskning är genomförd',
          'Avvikelser mot krav är hanterade',
          'Slutliga handlingar är godkända och arkiverade'
        ]
      },
      {
        key: 'samordning_projektering',
        title: 'Samordning av projektering',
        sub: 'Är projekteringen samordnad mellan alla discipliner?',
        tooltip: 'God samordning minskar risken för kollisioner och fel i byggskedet.',
        checks: [
          'Projekteringsmöten hålls regelbundet',
          'BIM-samordning eller likvärdig process är etablerad',
          'Kollisionskontroller är genomförda',
          'Samordningsprotokoll är upprättade'
        ]
      },
      {
        key: 'miljo_projektering',
        title: 'Miljöhänsyn i projekteringen',
        sub: 'Är miljökrav och hållbarhetsmål integrerade i projekteringen?',
        tooltip: 'Miljöhänsyn i projekteringsskedet påverkar byggnadens miljöprestanda under hela livscykeln.',
        checks: [
          'Miljömål är fastställda för projektet',
          'Materialval är genomförda med hänsyn till miljö',
          'Energiprestanda är beräknad och verifierad',
          'Miljöcertifiering är planerad om tillämpligt'
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
      },
      {
        key: 'garantibesiktning',
        title: 'Garantibesiktning är planerad',
        sub: 'Är garantibesiktning planerad och inbokad?',
        tooltip: 'Garantibesiktning ska normalt genomföras två år efter slutbesked.',
        checks: [
          'Garantibesiktning är planerad',
          'Datum för garantibesiktning är fastställt',
          'Ansvarig för garantibesiktning är utsedd',
          'Felrapportering under garantitiden är dokumenterad'
        ]
      },
      {
        key: 'forvaltningssystem',
        title: 'Förvaltningssystem är uppdaterat',
        sub: 'Är förvaltningssystemet uppdaterat med projektets information?',
        tooltip: 'Ett uppdaterat förvaltningssystem är grunden för effektiv fastighetsförvaltning.',
        checks: [
          'Fastighetsinformation är inlagd i förvaltningssystemet',
          'Tekniska system är registrerade',
          'Underhållsplan är upprättad',
          'Nyckelhantering är dokumenterad'
        ]
      },
      {
        key: 'hyresgast_inflyttning',
        title: 'Hyresgästinflyttning är planerad',
        sub: 'Är inflyttningsprocessen planerad och kommunicerad?',
        tooltip: 'En välplanerad inflyttningsprocess skapar goda förutsättningar för hyresgästernas första tid.',
        checks: [
          'Inflyttningsschema är fastställt',
          'Hyresgäster är informerade om inflyttningsprocess',
          'Besiktning vid inflyttning är planerad',
          'Felanmälningsrutin är kommunicerad till hyresgäster'
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
      },
      {
        key: 'besiktning',
        title: 'Slutbesiktning är genomförd',
        sub: 'Är slutbesiktning genomförd och godkänd?',
        tooltip: 'Slutbesiktning ska genomföras av oberoende besiktningsman och är underlag för slutbesked.',
        checks: [
          'Slutbesiktning är genomförd',
          'Besiktningsprotokoll är upprättat',
          'Anmärkningar är åtgärdade',
          'Besiktningsman har godkänt åtgärdade anmärkningar'
        ]
      },
      {
        key: 'energiuppfoljning',
        title: 'Energiuppföljning är planerad',
        sub: 'Är uppföljning av byggnadens energiprestanda planerad?',
        tooltip: 'Energiuppföljning säkerställer att byggnaden uppnår de energikrav som ställts i projektet.',
        checks: [
          'Energimätning är installerad och driftsatt',
          'Uppföljningsplan för energianvändning är upprättad',
          'Ansvarig för energiuppföljning är utsedd',
          'Energiprestanda är verifierad mot krav'
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
      { key: 'pbl', title: 'PBL', sub: 'Plan- och bygglagen', tooltip: 'PBL reglerar planläggning av mark och vatten samt byggande.', info: 'Plan- och bygglagen (PBL) innehåller bestämmelser om planläggning av mark och vatten och om byggande.', links: [{ title: 'PBL på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan--och-bygglag-2010900_sfs-2010-900/' }, { title: 'Boverket om PBL', sub: 'Boverkets vägledning om PBL', url: 'https://www.boverket.se/sv/PBL-kunskapsbanken/' }] },
      { key: 'afs', title: 'AFS', sub: 'Arbetsmiljöverkets författningssamling', tooltip: 'AFS innehåller regler om arbetsmiljö och säkerhet på arbetsplatsen.', info: 'Arbetsmiljöverkets författningssamling (AFS) innehåller föreskrifter och allmänna råd om arbetsmiljö.', links: [{ title: 'Arbetsmiljöverkets webbplats', sub: 'av.se – alla AFS-föreskrifter', url: 'https://www.av.se/arbetsmiljoarbete-och-inspektioner/lagar-och-regler-om-arbetsmiljo/arbetsmiljoverkets-foreskrifter/' }] },
      { key: 'miljobalken', title: 'Miljöbalken', sub: 'Sveriges miljölagstiftning', tooltip: 'Miljöbalken samlar regler om miljöskydd, naturvård och hushållning med naturresurser.', info: 'Miljöbalken är en samlad svensk miljölagstiftning som trädde i kraft 1999.', links: [{ title: 'Miljöbalken på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/' }] },
      { key: 'rattvistbyggande', title: 'Rättvist byggande', sub: 'Etiska riktlinjer för byggbranschen', tooltip: 'Rättvist byggande handlar om schyssta villkor och motverkande av osund konkurrens i byggbranschen.', info: 'Rättvist byggande är ett initiativ inom byggbranschen som syftar till att motverka osund konkurrens.', links: [{ title: 'Rättvist byggande', sub: 'Läs mer om initiativet', url: 'https://www.rattvistbyggande.se/' }] }
    ]
  }
];
 
// ─── STATE ─────────────────────────────────────────────────────────────────
const state = {};
columns.forEach(col => {
  col.cards.forEach(card => {
    state[card.key] = { checks: [], flagged: false, comment: '', expandChecks: {} };
    if (card.expandCheck) {
      yrkesgrupper.forEach(yrke => {
        state[card.key].expandChecks[yrke] = { cv: false, ref: false, annat: false };
      });
    }
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
  if (!card || isRegelverk(key)) return null;
  const s = state[key];
  const total = card.checks.length + (card.expandCheck ? 1 : 0);
  let checked = (s.checks || []).filter(Boolean).length;
  if (card.expandCheck) {
    const allYrken = yrkesgrupper.every(yrke => {
      const e = s.expandChecks[yrke];
      return e && (e.cv || e.ref || e.annat);
    });
    if (allYrken) checked++;
  }
  if (checked === 0) return null;
  if (checked < total) return 'pagaende';
  return 'klar';
}
 
function updateCardStatus(key) {
  const status = getStatus(key);
  applyBadge(document.getElementById('badge-' + key), status);
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
 
function renderExpandCheck(card) {
  const s = state[card.key];
  const allChecked = yrkesgrupper.every(yrke => {
    const e = s.expandChecks[yrke];
    return e && (e.cv || e.ref || e.annat);
  });
  return `
    <div class="divider"></div>
    <div class="expand-item">
      <div class="expand-header">
        <input type="checkbox" id="expand-main-${card.key}" ${allChecked ? 'checked' : ''} style="pointer-events:none; width:15px; height:15px; accent-color:#e87722;">
        <label class="expand-label">${card.expandCheck.label}</label>
        <div class="expand-arrow" id="expand-arrow-${card.key}" onclick="toggleExpandMain('${card.key}')">
          <i class="ti ti-chevron-down"></i>
        </div>
      </div>
      <div class="expand-content" id="expand-content-${card.key}">
        ${yrkesgrupper.map(yrke => {
          const e = s.expandChecks[yrke];
          const yrkeChecked = e && (e.cv || e.ref || e.annat);
          return `
            <div class="yrke-item">
              <div class="yrke-header">
                <input type="checkbox" id="yrke-${card.key}-${yrke}" ${yrkeChecked ? 'checked' : ''} style="pointer-events:none; width:13px; height:13px; accent-color:#e87722;">
                <label class="yrke-label">${yrkesNamn[yrke]}</label>
                <div class="yrke-arrow" id="arrow-${card.key}-${yrke}" onclick="toggleYrke('${card.key}','${yrke}')">
                  <i class="ti ti-chevron-down"></i>
                </div>
              </div>
              <div class="yrke-subs" id="subs-${card.key}-${yrke}">
                <div class="sub-item"><input type="checkbox" id="${card.key}-${yrke}-cv" ${e && e.cv ? 'checked' : ''} onchange="updateSubCheck('${card.key}','${yrke}','cv',this.checked)"><label for="${card.key}-${yrke}-cv">CV</label></div>
                <div class="sub-item"><input type="checkbox" id="${card.key}-${yrke}-ref" ${e && e.ref ? 'checked' : ''} onchange="updateSubCheck('${card.key}','${yrke}','ref',this.checked)"><label for="${card.key}-${yrke}-ref">Referensprojekt</label></div>
                <div class="sub-item"><input type="checkbox" id="${card.key}-${yrke}-annat" ${e && e.annat ? 'checked' : ''} onchange="updateSubCheck('${card.key}','${yrke}','annat',this.checked)"><label for="${card.key}-${yrke}-annat">Annat</label></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
 
function toggleExpandMain(cardKey) {
  const content = document.getElementById('expand-content-' + cardKey);
  const arrow = document.getElementById('expand-arrow-' + cardKey);
  content.classList.toggle('open');
  arrow.classList.toggle('open');
}
 
function toggleYrke(cardKey, yrke) {
  const subs = document.getElementById('subs-' + cardKey + '-' + yrke);
  const arrow = document.getElementById('arrow-' + cardKey + '-' + yrke);
  subs.classList.toggle('open');
  arrow.classList.toggle('open');
}
 
function updateSubCheck(cardKey, yrke, field, val) {
  state[cardKey].expandChecks[yrke][field] = val;
  const e = state[cardKey].expandChecks[yrke];
  const yrkeChecked = e.cv || e.ref || e.annat;
  const yrkeBox = document.getElementById('yrke-' + cardKey + '-' + yrke);
  if (yrkeBox) yrkeBox.checked = yrkeChecked;
  const allChecked = yrkesgrupper.every(y => {
    const ex = state[cardKey].expandChecks[y];
    return ex && (ex.cv || ex.ref || ex.annat);
  });
  const mainBox = document.getElementById('expand-main-' + cardKey);
  if (mainBox) mainBox.checked = allChecked;
  updateModal();
}
 
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
    let checksHTML = card.checks.map((q, i) => `
      <div class="checkbox-item">
        <input type="checkbox" id="chk-${i}" ${s.checks[i] ? 'checked' : ''} onchange="updateModal()">
        <label for="chk-${i}">${q}</label>
      </div>
    `).join('');
    if (card.expandCheck) {
      checksHTML += renderExpandCheck(card);
    }
    document.getElementById('modal-checks').innerHTML = checksHTML;
    document.getElementById('modal-comment').value = s.comment || '';
    updateModal();
  }
 
  document.getElementById('overlay').classList.add('show');
}
 
function updateModal() {
  if (!currentKey || isRegelverk(currentKey)) return;
  const card = findCard(currentKey);
  const boxes = document.querySelectorAll('#modal-checks > .checkbox-item input[type=checkbox]');
  state[currentKey].checks = Array.from(boxes).map(b => b.checked);
  const status = getStatus(currentKey);
  const total = card.checks.length + (card.expandCheck ? 1 : 0);
  let checked = state[currentKey].checks.filter(Boolean).length;
  if (card.expandCheck) {
    const allYrken = yrkesgrupper.every(yrke => {
      const e = state[currentKey].expandChecks[yrke];
      return e && (e.cv || e.ref || e.annat);
    });
    if (allYrken) checked++;
  }
  const pct = total > 0 ? (checked / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = checked + ' / ' + total;
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

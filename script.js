const lorem = [
  ["Lorem ipsum dolor sit amet, consectetur adipiscing?", "Sed do eiusmod tempor incididunt ut labore et dolore?", "Ut enim ad minim veniam, quis nostrud exercitation?"],
  ["Duis aute irure dolor in reprehenderit in voluptate?", "Excepteur sint occaecat cupidatat non proident sunt?", "Sunt in culpa qui officia deserunt mollit anim id?"],
  ["Curabitur pretium tincidunt lacus nulla mauris?", "Nunc eleifend consequat lorem sed dignissim ligula?", "Pellentesque habitant morbi tristique senectus et netus?"],
  ["Vestibulum ante ipsum primis in faucibus orci luctus?", "Fusce dapibus tellus ac cursus commodo tortor?", "Nullam quis risus eget urna mollis ornare vel eu?"],
  ["Aenean lacinia bibendum nulla sed consectetur lorem?", "Donec sed odio dui curabitur blandit tempus porttitor?", "Maecenas faucibus mollis interdum sed posuere consectetur?"],
];
 
// Vanliga kontrollfrågor
const cards = {
  organisation: { title: 'Byggherrens ansvar enligt PBL', sub: 'Ansvarsfördelningen inom byggherreorganisationen är beskriven?', tooltipHTML: 'Detta i enlighet med PBL, PBF samt Boverkets byggregler.', checks: lorem[0] },
  avsteg: { title: 'Kontrollansvarig (KA) är utsedd', sub: 'Är KA utsedd enligt PBL?', tooltipHTML: 'Alla avsteg ska vara skriftligt godkända av behörig beställarrepresentant och arkiveras i projektets dokumentsystem.', checks: lorem[1] },
  tillagg: { title: 'Kravställning från byggherre är definerad', sub: 'Är vår kravställning som byggherre dokumenterad i projektets handlingar?', tooltipHTML: 'Kontrollera att samtliga tilläggsavtal är formellt signerade och inte överstiger beslutade ekonomiska ramar.', checks: lorem[2] },
  avtalSystem: { title: 'Kontrollplan', sub: 'Finns kontrollplan enligt PBL?', tooltipHTML: 'Alla avtal ska vara uppladdade och sökbara i projektportalen senast 5 arbetsdagar efter signering.', checks: lorem[3] },
  budget: { title: 'Affärsform är vald', sub: 'Är det beslutat om val av affärsform?', tooltipHTML: 'Jämför senaste prognos mot investeringsbeslutets budget. Avvikelser över 5% ska eskaleras till styrgruppen.', checks: lorem[4] },
  betalplan: { title: 'Tidsplan enligt kontrakt', sub: 'Finns huvudtidsplan & projekteringstidsplan?', tooltipHTML: 'Kontrollera att fakturor matchar avtalad betalplan.', checks: lorem[0] },
  riktkostnad: { title: 'Avtal med konsult finns?', sub: 'Har man kontrakterat projekterande konsulter?', tooltipHTML: 'Riktkostnaden ska uppdateras månadsvis och kommuniceras till ekonomiansvarige och styrgrupp.', checks: lorem[1] },
  slutkostnad: { title: 'Ersättningsform är fastställd', sub: 'Ersättningsform är beslutad?', tooltipHTML: 'Slutkostnadsprognosen ska baseras på utfall + återstående arbete.', checks: lorem[2] },
  budgetforandringar: { title: 'Kontroll- och verifieringskrav är reglerade', sub: 'Är byggherrens krav på kontroll, verifiering och dokumentation reglerade i avtalet?', tooltipHTML: 'Alla budgetförändringar ska beslutas av behörig person enligt attestordningen.', checks: lorem[3] },
  huvudtidsplan: { title: 'Projektorganisation', sub: 'Är projektorganisationen fastställd?', tooltipHTML: 'Kontrollera att huvudtidsplanen är godkänd av alla parter.', checks: lorem[4] },
  projektering: { title: 'Byggherrens krav är definerade inför projektering', sub: 'Finns krav från byggherren?', tooltipHTML: 'Verifiera att projekteringshandlingar levereras enligt plan.', checks: lorem[0] },
  produktion: { title: 'Funktionskrav är definerade', sub: 'Är funktionskrav fastställda?', tooltipHTML: 'Stäm av mot entreprenörens detaljplan.', checks: lorem[1] },
  avvikelserTid: { title: 'Arbetsmiljörisker är beaktade i projektering', sub: 'Är arbetsmiljörisker identifierade?', tooltipHTML: 'Tidsavvikelser över 2 veckor ska dokumenteras med rotorsak och åtgärdsplan.', checks: lorem[2] },
  dokSystem: { title: 'Relationshandlingar finns', sub: 'Finns relationshandlingar?', tooltipHTML: 'Kontrollera att dokumentstrukturen följer projektets informationsplan.', checks: lorem[3] },
  arkivering: { title: 'Drift- & underhållsinstruktioner finns', sub: 'Finns drift- & underhållsinstruktioner?', tooltipHTML: 'Sluthandlingar ska arkiveras inom 30 dagar efter godkännande.', checks: lorem[4] },
  versioner: { title: 'Överlämnande till förvaltning', sub: 'Har fastigheten överlämnats till förvaltningen?', tooltipHTML: 'Föråldrade versioner ska markeras inaktuella.', checks: lorem[0] },
  byggmoten: { title: 'Kontrollplan är uppfylld', sub: 'Är kontrollplanen uppfylld?', tooltipHTML: 'Protokoll ska upprättas och distribueras inom 5 arbetsdagar.', checks: lorem[1] },
  avvikelserRamp: { title: 'Kontrollprogram är uppfyllt', sub: 'Är krav i kontrollprogrammet uppfyllda?', tooltipHTML: 'Avvikelser ska vara godkända av beställaren.', checks: lorem[2] },
  kmaplan: { title: 'Verifiering av funktionskrav är genomförd', sub: 'Är verifiering genomförd?', tooltipHTML: 'UE med kontraktsvärde över 500 tkr ska ha en projektspecifik KMA-plan.', checks: lorem[3] },
  kvalitetsplan: { title: 'Intyg & dokumentation finns', sub: 'Finns intyg & dokumentation på plats?', tooltipHTML: 'Kontrollera att kvalitetsplanen är reviderad för aktuell fas.', checks: lorem[4] },
};
 
// Regelverk – egna informationsrutor med länkar
const regelverk = {
  bbr: {
    title: 'BBR',
    sub: 'Boverkets byggregler',
    tooltipHTML: 'BBR innehåller regler om utformning och tekniska egenskapskrav på byggnadsverk.',
    info: 'Boverkets byggregler (BBR) innehåller regler om utformning samt tekniska egenskapskrav på byggnadsverk. Reglerna gäller vid uppförande av nya byggnader samt vid ändring av byggnader.',
    links: [
      { title: 'Boverkets webbplats', sub: 'boverket.se – officiell information om BBR', url: 'https://www.boverket.se' },
      { title: 'BBR – fullständig text', sub: 'Läs hela regelverket hos Boverket', url: 'https://www.boverket.se/sv/lag--ratt/boverkets-forfattningssamling/boverkets-byggregler---bbr/' }
    ]
  },
  pbl: {
    title: 'PBL',
    sub: 'Plan- och bygglagen',
    tooltipHTML: 'PBL reglerar planläggning av mark och vatten samt byggande.',
    info: 'Plan- och bygglagen (PBL) innehåller bestämmelser om planläggning av mark och vatten och om byggande. Lagen syftar till att främja en samhällsutveckling med jämlika och goda sociala levnadsförhållanden.',
    links: [
      { title: 'PBL på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan--och-bygglag-2010900_sfs-2010-900/' },
      { title: 'Boverket om PBL', sub: 'Boverkets vägledning om PBL', url: 'https://www.boverket.se/sv/PBL-kunskapsbanken/' }
    ]
  },
  afs: {
    title: 'AFS',
    sub: 'Arbetsmiljöverkets författningssamling',
    tooltipHTML: 'AFS innehåller regler om arbetsmiljö och säkerhet på arbetsplatsen.',
    info: 'Arbetsmiljöverkets författningssamling (AFS) innehåller föreskrifter och allmänna råd om arbetsmiljö. Reglerna gäller för alla arbetsgivare och syftar till att förebygga ohälsa och olycksfall i arbetet.',
    links: [
      { title: 'Arbetsmiljöverkets webbplats', sub: 'av.se – alla AFS-föreskrifter', url: 'https://www.av.se/arbetsmiljoarbete-och-inspektioner/lagar-och-regler-om-arbetsmiljo/arbetsmiljoverkets-foreskrifter/' }
    ]
  },
  miljobalken: {
    title: 'Miljöbalken',
    sub: 'Sveriges miljölagstiftning',
    tooltipHTML: 'Miljöbalken samlar regler om miljöskydd, naturvård och hushållning med naturresurser.',
    info: 'Miljöbalken är en samlad svensk miljölagstiftning som trädde i kraft 1999. Den innehåller regler om miljöskydd, naturvård, hushållning med mark, vatten och andra naturresurser samt miljökonsekvensbeskrivningar.',
    links: [
      { title: 'Miljöbalken på riksdagen.se', sub: 'Läs hela lagtexten', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/' }
    ]
  },
  rattvistbyggande: {
    title: 'Rättvist byggande',
    sub: 'Etiska riktlinjer för byggbranschen',
    tooltipHTML: 'Rättvist byggande handlar om schyssta villkor och motverkande av osund konkurrens i byggbranschen.',
    info: 'Rättvist byggande är ett initiativ inom byggbranschen som syftar till att motverka osund konkurrens, säkerställa schyssta arbetsvillkor och bidra till en mer hållbar och transparent bransch.',
    links: [
      { title: 'Byggföretagen', sub: 'Information om branschinitiativ', url: 'https://www.rattvistbyggande.se/' }
    ]
  }
};
 
function openModal(key) {
  // Kolla om det är ett regelverk
  if (regelverk[key]) {
    const r = regelverk[key];
    document.getElementById('modal-title').textContent = r.title;
    document.getElementById('modal-sub').textContent = r.sub;
    document.getElementById('modal-tooltip').innerHTML = r.tooltipHTML;
    document.getElementById('modal-info-text').textContent = r.info;
 
    // Bygg länkarna
    const linksEl = document.getElementById('modal-links');
    linksEl.innerHTML = r.links.map(l => `
      <a class="info-link" href="${l.url}" target="_blank">
        <div class="info-link-icon"><i class="ti ti-external-link"></i></div>
        <div>
          <div class="info-link-title">${l.title}</div>
          <div class="info-link-sub">${l.sub}</div>
        </div>
        <i class="ti ti-chevron-right info-link-arrow"></i>
      </a>
    `).join('');
 
    // Visa regelverk, dölj vanliga uppgifter
    document.getElementById('modal-tasks').style.display = 'none';
    document.getElementById('modal-regelverk').style.display = 'block';
 
  } else {
    // Vanlig kontrollfråga
    const c = cards[key];
    document.getElementById('modal-title').textContent = c.title;
    document.getElementById('modal-sub').textContent = c.sub;
    document.getElementById('modal-tooltip').innerHTML = c.tooltipHTML;
    const checkList = document.getElementById('modal-checks');
    checkList.innerHTML = c.checks.map((q, i) => `
      <div class="checkbox-item">
        <input type="checkbox" id="chk-${i}">
        <label for="chk-${i}">${q}</label>
      </div>
    `).join('');
 
    // Visa vanliga uppgifter, dölj regelverk
    document.getElementById('modal-tasks').style.display = 'block';
    document.getElementById('modal-regelverk').style.display = 'none';
  }
 
  document.getElementById('overlay').style.display = 'flex';
}
 
function closeModal() {
  document.getElementById('overlay').style.display = 'none';
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

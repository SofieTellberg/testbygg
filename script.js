const lorem = [
  ["Lorem ipsum dolor sit amet, consectetur adipiscing?", "Sed do eiusmod tempor incididunt ut labore et dolore?", "Ut enim ad minim veniam, quis nostrud exercitation?"],
  ["Duis aute irure dolor in reprehenderit in voluptate?", "Excepteur sint occaecat cupidatat non proident sunt?", "Sunt in culpa qui officia deserunt mollit anim id?"],
  ["Curabitur pretium tincidunt lacus nulla mauris?", "Nunc eleifend consequat lorem sed dignissim ligula?", "Pellentesque habitant morbi tristique senectus et netus?"],
  ["Vestibulum ante ipsum primis in faucibus orci luctus?", "Fusce dapibus tellus ac cursus commodo tortor?", "Nullam quis risus eget urna mollis ornare vel eu?"],
  ["Aenean lacinia bibendum nulla sed consectetur lorem?", "Donec sed odio dui curabitur blandit tempus porttitor?", "Maecenas faucibus mollis interdum sed posuere consectetur?"],
];
 
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
  test: { title: 'test', sub:'test?', tooltipHTML: 'testa test', checks: lorem[3] }
};
 
function openModal(key) {
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
  document.getElementById('overlay').style.display = 'flex';
}
function closeModal() {
  document.getElementById('overlay').style.display = 'none';
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

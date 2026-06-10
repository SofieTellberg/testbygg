const lorem = [
  ["Lorem ipsum dolor sit amet, consectetur adipiscing?", "Sed do eiusmod tempor incididunt ut labore et dolore?", "Ut enim ad minim veniam, quis nostrud exercitation?"],
  ["Duis aute irure dolor in reprehenderit in voluptate?", "Excepteur sint occaecat cupidatat non proident sunt?", "Sunt in culpa qui officia deserunt mollit anim id?"],
  ["Curabitur pretium tincidunt lacus nulla mauris?", "Nunc eleifend consequat lorem sed dignissim ligula?", "Pellentesque habitant morbi tristique senectus et netus?"],
  ["Vestibulum ante ipsum primis in faucibus orci luctus?", "Fusce dapibus tellus ac cursus commodo tortor?", "Nullam quis risus eget urna mollis ornare vel eu?"],
  ["Aenean lacinia bibendum nulla sed consectetur lorem?", "Donec sed odio dui curabitur blandit tempus porttitor?", "Maecenas faucibus mollis interdum sed posuere consectetur?"],
];
 
const cards = {
  organisation: { title: 'Organisation enligt kontrakt', sub: 'Är det samma organisation som på kontraktet? Uppfylls rollerna?', tooltipHTML: 'Projekteringen ska dokumenteras. Vid ändring av en byggnad får erfarenheter från den befintliga byggnaden användas. Om olika personer utför olika delar av projekteringen ska projekteringen samordnas.', checks: lorem[0] },
  avsteg: { title: 'Avsteg från kontrakt', sub: 'Finns dokumenterade avsteg? Är de godkända?', tooltipHTML: 'Alla avsteg ska vara skriftligt godkända av behörig beställarrepresentant och arkiveras i projektets dokumentsystem.', checks: lorem[1] },
  tillagg: { title: 'Tilläggsavtal / ändringsavtal', sub: 'Är tilläggsavtal upprättade och signerade?', tooltipHTML: 'Kontrollera att samtliga tilläggsavtal är formellt signerade och inte överstiger beslutade ekonomiska ramar.', checks: lorem[2] },
  avtalSystem: { title: 'Avtal i interna system', sub: 'Finns avtal tillgängliga i interna system?', tooltipHTML: 'Alla avtal ska vara uppladdade och sökbara i projektportalen senast 5 arbetsdagar efter signering.', checks: lorem[3] },
  budget: { title: 'Budget enligt beslut', sub: 'Följer projektet fastställd budget?', tooltipHTML: 'Jämför senaste prognos mot investeringsbeslutets budget. Avvikelser över 5% ska eskaleras till styrgruppen.', checks: lorem[4] },
  betalplan: { title: 'Betalplan enligt kontrakt', sub: 'Följs betalplanen i enlighet med kontrakt?', tooltipHTML: 'Kontrollera att fakturor matchar avtalad betalplan.', checks: lorem[0] },
  riktkostnad: { title: 'Riktkostnad', sub: 'Är riktkostnaden uppdaterad och kommunicerad?', tooltipHTML: 'Riktkostnaden ska uppdateras månadsvis och kommuniceras till ekonomiansvarige och styrgrupp.', checks: lorem[1] },
  slutkostnad: { title: 'Slutkostnadsprognos', sub: 'Är slutkostnadsprognosen uppdaterad?', tooltipHTML: 'Slutkostnadsprognosen ska baseras på utfall + återstående arbete.', checks: lorem[2] },
  budgetforandringar: { title: 'Hantering av budgetförändringar', sub: 'Hur hanteras och dokumenteras budgetförändringar?', tooltipHTML: 'Alla budgetförändringar ska beslutas av behörig person enligt attestordningen.', checks: lorem[3] },
  huvudtidsplan: { title: 'Huvudtidsplan', sub: 'Är huvudtidsplanen aktuell och följs den?', tooltipHTML: 'Kontrollera att huvudtidsplanen är godkänd av alla parter.', checks: lorem[4] },
  projektering: { title: 'Projekteringstidsplan / FAS 1', sub: 'Följs projekteringstidsplanen för FAS 1?', tooltipHTML: 'Verifiera att projekteringshandlingar levereras enligt plan.', checks: lorem[0] },
  produktion: { title: 'Produktionstidsplan / FAS 2', sub: 'Följs produktionstidsplanen för FAS 2?', tooltipHTML: 'Stäm av mot entreprenörens detaljplan.', checks: lorem[1] },
  avvikelserTid: { title: 'Eventuella avvikelser från tidsplan', sub: 'Finns avvikelser och är de dokumenterade?', tooltipHTML: 'Tidsavvikelser över 2 veckor ska dokumenteras med rotorsak och åtgärdsplan.', checks: lorem[2] },
  dokSystem: { title: 'Dokumentation i interna system', sub: 'Är all dokumentation uppladdad och åtkomlig?', tooltipHTML: 'Kontrollera att dokumentstrukturen följer projektets informationsplan.', checks: lorem[3] },
  arkivering: { title: 'Arkivering av handlingar', sub: 'Arkiveras handlingar enligt rutin?', tooltipHTML: 'Sluthandlingar ska arkiveras inom 30 dagar efter godkännande.', checks: lorem[4] },
  versioner: { title: 'Versionshantering', sub: 'Används korrekt versionshantering på ritningar?', tooltipHTML: 'Föråldrade versioner ska markeras inaktuella.', checks: lorem[0] },
  byggmoten: { title: 'Kontroll av kontinuerliga byggmöten', sub: 'Hålls och dokumenteras byggmöten löpande?', tooltipHTML: 'Protokoll ska upprättas och distribueras inom 5 arbetsdagar.', checks: lorem[1] },
  avvikelserRamp: { title: 'Avvikelser mot ramprogram', sub: 'Finns avvikelser mot ramprogram? Är de hanterade?', tooltipHTML: 'Avvikelser ska vara godkända av beställaren.', checks: lorem[2] },
  kmaplan: { title: 'Kontroll av UE:s KMA-plan', sub: 'Har underentreprenörer godkänd KMA-plan?', tooltipHTML: 'UE med kontraktsvärde över 500 tkr ska ha en projektspecifik KMA-plan.', checks: lorem[3] },
  kvalitetsplan: { title: 'Kvalitetsplan', sub: 'Är kvalitetsplanen aktuell och följs den?', tooltipHTML: 'Kontrollera att kvalitetsplanen är reviderad för aktuell fas.', checks: lorem[4] },
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

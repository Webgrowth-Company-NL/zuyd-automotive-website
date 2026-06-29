# Claude Design prompt, Zuyd Automotive

> Plak deze prompt in Claude Design en **voeg het logo toe als bijlage**. Vervang de `[...]`-placeholders waar je exacte gegevens hebt (kleuren, telefoon, openingstijden). De rest komt uit het SEO-/marktonderzoek (`seo-onderzoek.md`).

---

## De prompt (kopieer hieronder)

Ontwerp een moderne, premium website voor **Zuyd Automotive**, een autohandel in Breda die betaalbare occasions verkoopt (zwaartepunt rond de 9.000 tot 11.000 euro). Het bedrijf wordt gerund door twee mensen, **Leroy en Max**. Het onderscheidende kenmerk: bezoekers plannen online zelf een **persoonlijke bezichtiging in met Leroy**. Dat is de belangrijkste conversie en moet het hart van het ontwerp zijn.

Ik voeg het **logo** toe als bijlage (een woordmerk "ZUYD AUTOMOTIVE" en een rond embleem met een grote Z). Het merk is bewust rustig en volwassen. Gebruik dit palet, afgeleid uit het logo:

- **Primair, staalblauw:** `#5C7382` (de logokleur, voor merk, headers, knoppen)
- **Diep staalblauw (hover/contrast):** `#42525E`
- **Crème / off-white:** `#EAE5D8` (warme lichte vlakken, kaart-achtergronden, contrast op blauw)
- **Bijna-zwart slate (tekst):** `#27333B`
- **Warm wit (pagina-achtergrond):** `#F7F6F2`

Houd het palet **monochroom en sober**: staalblauw plus crème plus warme neutralen. Geen felle extra accentkleur toevoegen, de kracht zit in rust en contrast. Maak primaire knoppen en de bezichtiging-CTA in vol staalblauw met crème of wit tekst, zodat ze duidelijk uitspringen op de lichte achtergrond.

De vormtaal van het logo is **strak, geometrisch, zelfverzekerd** (zware uppercase schreefloze letters). Laat de typografie en componenten daarbij aansluiten. Gebruik het ronde Z-embleem voor het favicon, het app-icoon en als avatar in de bezichtiging-flow.

### Merkgevoel en positionering
- **Vertrouwd, persoonlijk, nuchter, maar strak en eigentijds.** Niet de typische drukke, goedkoop ogende autodealer-site met rode uitroeptekens en knipperende aanbiedingen. Het tegenovergestelde: kalm, helder, veel witruimte, premium.
- De grootste concurrenten in Breda hebben sobere, verouderde sites zonder online afspraak. Zuyd moet er direct moderner en betrouwbaarder uitzien. De vertrouwensbenchmark in de regio is een dealer met 1.500 reviews en een 9,2.
- Toon **echte mensen** (Leroy en Max) en een echt verhaal. In een markt met veel anonieme handel is aantoonbare echtheid het verschil. Geen stockfoto-gevoel.
- De auto's zijn de helden: groot, goed belichte voertuigfotografie, rustige achtergronden.

### Doelgroep
Particuliere kopers die een betrouwbare, betaalbare tweedehands auto zoeken in en rond Breda. Vaak een gezin, starter of iemand die een tweede auto zoekt. Ze willen geen verkooppraatjes, ze willen vertrouwen, duidelijkheid en gemak. Veel bezoek komt van mobiel.

### Pagina's om te ontwerpen
Ontwerp in elk geval deze schermen, mobiel en desktop:

1. **Homepage**
   - Hero: sterke kop die lokaal en vertrouwen combineert (richting "Betrouwbare occasions in Breda, persoonlijk uitgekozen door Leroy en Max"). Eén heldere primaire CTA "Plan een bezichtiging" en een secundaire "Bekijk de voorraad". Rustige hero met een mooie auto of de showroom.
   - Uitgelichte occasions: een strakke grid van 3 tot 6 auto-kaarten (foto, merk + model, bouwjaar, km-stand, prijs, brandstof, transmissie).
   - USP-blok: waarom Zuyd (persoonlijke service, eerlijke prijzen, garantie/APK, je koopt van mensen met een naam).
   - Een persoonlijk blok over Leroy en Max met foto.
   - Een vertrouwensband: reviews/beoordeling, eventueel BOVAG/RDW, garantie.
   - Afsluitende bezichtiging-CTA-sectie.

2. **Voorraad (overzicht)**
   - Filterbare lijst van auto's. Filters voor merk, prijs (schuif), brandstof, transmissie (handgeschakeld/automaat), bouwjaar, kilometerstand.
   - Auto-kaarten in een nette grid, met duidelijke prijs en een "Bekijk auto"-actie. Status-badge mogelijk (Beschikbaar, Gereserveerd, Verkocht).

3. **Auto-detailpagina**
   - Grote fotogalerij bovenaan.
   - Titel als "[Merk] [Model] [uitvoering]" met prijs prominent.
   - Specificatieblok (bouwjaar, km, brandstof, transmissie, vermogen, kleur, APK, opties).
   - **Primaire, opvallende CTA "Plan een bezichtiging met Leroy"** die direct naar de boeking leidt, met de auto al als context. Secundaire CTA's: bellen en WhatsApp.
   - Vertrouwensblok (garantie, mogelijkheid tot proefrit, inruil bespreekbaar).

4. **Bezichtiging inplannen (de signature-flow)**
   - Een rustige, stapsgewijze boeking-ervaring waarin de bezoeker een dag en tijdslot bij **Leroy** kiest, naam en telefoon invult, en de gekozen auto ziet. Eindigt met een vriendelijke bevestiging.
   - Voelt persoonlijk, alsof je een afspraak met een mens maakt, niet met een formulier. Toon Leroy's naam en foto in de flow.
   - Ontwerp dit als een modal of een eigen pagina, mobiel-eerst.

5. **Over ons**
   - Het verhaal van Zuyd, Leroy en Max. Foto's, persoonlijkheid, waarom ze dit doen, waar ze voor staan. Bouwt E-E-A-T en vertrouwen.

6. **Inkoop / inruil** (mag eenvoudiger)
   - "Wij kopen of ruilen je auto in", met een kort formulier of CTA.

7. **Contact**
   - Adres (Riethil 14, Breda), kaart/route, openingstijden, telefoon, en opnieuw de bezichtiging-CTA.

### Designrichtlijnen
- Strakke, moderne component-stijl in lijn met shadcn/ui (zachte radius, subtiele schaduwen, duidelijke knop-hiërarchie). Eén duidelijke accentkleur uit het logo voor primaire acties.
- Royale witruimte, sterke typografische hiërarchie, één heldere H1 per pagina.
- Mobiel-eerst. De meeste bezoekers zijn op telefoon; bellen, WhatsApp en bezichtiging-boeken moeten op mobiel binnen handbereik zijn (denk aan een sticky onderbalk op de detailpagina).
- Auto-kaarten consistent: foto met vaste verhouding, prijs altijd op dezelfde plek, leesbare specs-iconen.
- Toegankelijk contrast (WCAG AA), grote tikbare knoppen.
- Geen clichés uit de autobranche: geen schreeuwerige kortingsstickers, geen donkere "garage"-clichés tenzij het logo daar echt om vraagt. Mik op vertrouwen en kwaliteit.

### Toon van de teksten in het ontwerp
Nederlands, persoonlijk en nuchter ("wij", niet "ik"). Geen jargon, geen verkooptrucs. Voorbeelden: "Plan een bezichtiging met Leroy", "Bekijk onze occasions", "Een eerlijke auto, persoonlijk uitgezocht". Gebruik geen gedachtestreepjes in de copy.

Lever een samenhangend ontwerp met een duidelijk visueel systeem (kleuren, typografie, knoppen, kaarten) dat over alle schermen consistent is.

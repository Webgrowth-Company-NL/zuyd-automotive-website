/*
 * Forester: teksten aanwijzen op de site zelf.
 *
 * Doet niets, tenzij de pagina in een frame van Forester staat. Dan stuurt
 * Forester de teksten van de site (content/secties.json), zoekt dit script
 * ze op de pagina op en maakt ze klikbaar. Een klik gaat terug naar Forester,
 * dat de tekst laat aanpassen en opslaat; daarna vervangen we hem hier meteen,
 * zodat je het resultaat ziet terwijl Vercel de echte site bouwt.
 *
 * Geen onzichtbare tekens in de html en geen aparte bewerkversie: de site die
 * bezoekers zien, is de site die je bewerkt. Hetzelfde bestand werkt op elke
 * headless site; kopieer het naar public/ en laad het in de layout.
 */
(function () {
  if (window.parent === window) return;

  var FORESTER = /^https:\/\/([\w-]+\.)*webgrowth\.company$|^http:\/\/localhost(:\d+)?$/;
  var ouder = null;
  var bladen = [];
  var bewerken = true;
  var gepland = 0;

  var GEEN_TEKST_SLEUTEL = /^(href|url|link|slug|id|icon|icoon|image|img|foto|photo|src|kleur|color|avatar)$|(_url|_href|Url|Href)$/i;
  var GEEN_TEKST_WAARDE = /^(https?:|mailto:|tel:|\/|#)/i;

  function schoon(s) {
    return String(s).replace(/\s+/g, " ").trim();
  }

  function escape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /** Een tekst met {plekken} wordt een patroon: "{stad} · Riethil 14" past op "Breda · Riethil 14". */
  function patroonVan(tekst) {
    if (!/\{\w+\}/.test(tekst)) return null;
    return new RegExp("^" + tekst.split(/\{\w+\}/).map(escape).join(".+?") + "$");
  }

  function verzamel(sectie, waarde, pad, uit) {
    if (typeof waarde === "string") {
      var sleutel = null;
      for (var i = pad.length - 1; i >= 0; i--) if (typeof pad[i] === "string") { sleutel = pad[i]; break; }
      if ((sleutel && GEEN_TEKST_SLEUTEL.test(sleutel)) || GEEN_TEKST_WAARDE.test(waarde.trim())) return uit;
      var tekst = schoon(waarde);
      if (tekst.length >= 2) uit.push({ sectie: sectie, pad: pad, tekst: tekst, patroon: patroonVan(tekst) });
      return uit;
    }
    if (Array.isArray(waarde)) waarde.forEach(function (w, i) { verzamel(sectie, w, pad.concat([i]), uit); });
    else if (waarde && typeof waarde === "object") Object.keys(waarde).forEach(function (k) { verzamel(sectie, waarde[k], pad.concat([k]), uit); });
    return uit;
  }

  function sleutelVan(b) {
    return b.sectie + "|" + JSON.stringify(b.pad);
  }

  function passend(tekst) {
    return bladen.filter(function (b) { return b.tekst === tekst || (b.patroon && b.patroon.test(tekst)); });
  }

  /**
   * Het diepste element waarvan de hele tekst een tekst uit Forester is. Een
   * knop met "Plan een afspraak" wordt de knop, niet de sectie eromheen.
   */
  function markeer() {
    gepland = 0;
    document.querySelectorAll("[data-forester]").forEach(function (el) { el.removeAttribute("data-forester"); });
    if (!bladen.length) return;
    var gezien = new Set();
    var lopen = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var knoop;
    while ((knoop = lopen.nextNode())) {
      if (!schoon(knoop.nodeValue)) continue;
      var el = knoop.parentElement;
      while (el && el !== document.body) {
        if (gezien.has(el)) break;
        gezien.add(el);
        if (/^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName)) break;
        var treffers = passend(schoon(el.textContent || ""));
        // In een menu staan vaak dezelfde woorden als in een kop elders
        // ("Voorraad"), maar het menu zelf komt meestal niet uit de teksten.
        // Daar alleen wat op elke pagina staat, anders open je de verkeerde.
        if (treffers.length && el.closest("nav")) {
          treffers = treffers.filter(function (b) { return b.sectie.indexOf("shared__") === 0; });
        }
        if (treffers.length) {
          el.setAttribute("data-forester", treffers.map(sleutelVan).join(" "));
          break;
        }
        el = el.parentElement;
      }
    }
  }

  function plan() {
    if (!gepland) gepland = window.setTimeout(markeer, 150);
  }

  function stuur(bericht) {
    if (ouder) window.parent.postMessage(bericht, ouder);
    else window.parent.postMessage({ type: bericht.type, pad: bericht.pad }, "*");
  }

  var stijl = document.createElement("style");
  stijl.textContent =
    "html.forester-bewerken [data-forester]{cursor:text;outline:1px dashed rgba(255,0,150,.35);outline-offset:3px;border-radius:2px;transition:outline-color .15s ease-out,background-color .15s ease-out}" +
    "html.forester-bewerken [data-forester]:hover{outline:2px solid #ff0096;background-color:rgba(255,0,150,.06)}" +
    "html.forester-bewerken [data-forester].forester-actief{outline:2px solid #ff0096;background-color:rgba(255,0,150,.1)}";
  document.head.appendChild(stijl);

  document.addEventListener(
    "click",
    function (e) {
      if (!bewerken || !ouder) return;
      var el = e.target instanceof Element ? e.target.closest("[data-forester]") : null;
      if (!el) return;
      // In bewerkmodus opent een klik op een tekst de tekst, ook als het een link is.
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll(".forester-actief").forEach(function (a) { a.classList.remove("forester-actief"); });
      el.classList.add("forester-actief");
      var keuzes = el.getAttribute("data-forester").split(" ").map(function (k) {
        return bladen.find(function (b) { return sleutelVan(b) === k; });
      }).filter(Boolean);
      stuur({
        type: "forester:klik",
        pad: location.pathname,
        tekstOpPagina: schoon(el.textContent || ""),
        keuzes: keuzes.map(function (b) { return { sectie: b.sectie, pad: b.pad, tekst: b.tekst }; }),
      });
    },
    true,
  );

  window.addEventListener("message", function (e) {
    if (!FORESTER.test(e.origin) || !e.data || typeof e.data.type !== "string") return;
    ouder = e.origin;
    var d = e.data;
    if (d.type === "forester:secties") {
      bladen = [];
      Object.keys(d.secties || {}).forEach(function (id) { verzamel(id, d.secties[id], [], bladen); });
      markeer();
    } else if (d.type === "forester:modus") {
      bewerken = !!d.bewerken;
      document.documentElement.classList.toggle("forester-bewerken", bewerken);
    } else if (d.type === "forester:vervang") {
      // Meteen laten zien wat er opgeslagen is; de echte site volgt na de build.
      var sleutel = d.sectie + "|" + JSON.stringify(d.pad);
      document.querySelectorAll("[data-forester]").forEach(function (el) {
        // Alleen platte tekst zonder {plekken}; iets met een plek erin toont de
        // site pas goed na de build.
        if (el.getAttribute("data-forester").split(" ").indexOf(sleutel) >= 0 && el.children.length === 0 && !/\{\w+\}/.test(d.tekst)) el.textContent = d.tekst;
      });
      bladen.forEach(function (b) {
        if (sleutelVan(b) === sleutel) {
          b.tekst = schoon(d.tekst);
          b.patroon = patroonVan(b.tekst);
        }
      });
      plan();
    }
  });

  document.documentElement.classList.add("forester-bewerken");
  new MutationObserver(plan).observe(document.body, { childList: true, subtree: true, characterData: true });

  // Bij elke pagina (ook na navigeren binnen de site) opnieuw melden, zodat
  // Forester weet waar je bent en de teksten opnieuw stuurt.
  var laatste = "";
  function meld() {
    if (location.pathname === laatste) return;
    laatste = location.pathname;
    stuur({ type: "forester:klaar", pad: location.pathname, titel: document.title });
  }
  meld();
  window.setInterval(meld, 500);
})();

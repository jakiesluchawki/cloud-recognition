export const sources = {
  wmoAtlas: {
    id: "wmoAtlas",
    organization: "World Meteorological Organization",
    title: "International Cloud Atlas",
    label: "WMO Cloud Atlas",
    url: "https://cloudatlas.wmo.int/",
    kind: "Norma klasyfikacyjna",
    trust:
      "Oficjalny, międzynarodowy wzorzec nazw i opisu chmur używany w meteorologii.",
    scope:
      "Rodzaje, gatunki, odmiany, cechy dodatkowe, chmury towarzyszące i zasady identyfikacji.",
    retrieved: "16 czerwca 2026",
  },
  wmoSummary: {
    id: "wmoSummary",
    organization: "World Meteorological Organization",
    title: "Cloud classification summary",
    label: "WMO: tabela klasyfikacji",
    url: "https://cloudatlas.wmo.int/en/cloud-classification-summary.html",
    kind: "Norma klasyfikacyjna",
    trust:
      "Zwięzła tabela urzędowej klasyfikacji WMO, w tym dopuszczalnych kombinacji nazw.",
    scope: "Dziesięć rodzajów oraz przypisane gatunki, odmiany i cechy.",
    retrieved: "16 czerwca 2026",
  },
  faaWeather: {
    id: "faaWeather",
    organization: "Federal Aviation Administration",
    title: "Aviation Weather Handbook FAA-H-8083-28B",
    label: "FAA Aviation Weather Handbook",
    url: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-28-aviation-weather-handbook",
    kind: "Podręcznik lotniczy",
    trust:
      "Aktualny podręcznik FAA łączący meteorologię z podejmowaniem decyzji w lotnictwie.",
    scope:
      "Stabilność, fronty, konwekcja, oblodzenie, turbulencja, burze i interpretacja pogody.",
    retrieved: "16 czerwca 2026",
  },
  easaAircrew: {
    id: "easaAircrew",
    organization: "European Union Aviation Safety Agency",
    title: "Easy Access Rules for Aircrew",
    label: "EASA Aircrew",
    url: "https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-aircrew-regulation-eu-no-11782011",
    kind: "Ramy szkolenia lotniczego",
    trust:
      "Oficjalne europejskie wymagania i materiały konsolidujące zakres wiedzy załóg lotniczych.",
    scope: "Zakres szkolenia meteorologicznego pilotów w Europie.",
    retrieved: "16 czerwca 2026",
  },
  awcCodes: {
    id: "awcCodes",
    organization: "NOAA Aviation Weather Center",
    title: "METAR and TAF data help",
    label: "AWC: METAR i TAF",
    url: "https://aviationweather.gov/help/faq/data/",
    kind: "Wskazówki operacyjne",
    trust:
      "Oficjalny serwis NOAA wyjaśniający format i wykorzystanie lotniczych danych pogodowych.",
    scope: "Grupy zachmurzenia, pułap, widzialność oraz struktura raportów.",
    retrieved: "16 czerwca 2026",
  },
  windyLevels: {
    id: "windyLevels",
    organization: "Windy Community",
    title: "Display wind at various altitudes instead of pressure",
    label: "Windy: wysokość i ciśnienie",
    url: "https://community.windy.com/topic/39492/how-to-configure-windy-web-and-ios-to-display-wind-at-various-altitudes-instead-of-pressure",
    kind: "Objaśnienie interfejsu",
    trust:
      "Dokumentacja społeczności Windy pomaga zrozumieć kontrolki produktu; nie jest normą meteorologiczną.",
    scope: "Przełączanie poziomów ciśnienia i przybliżonych wysokości.",
    retrieved: "16 czerwca 2026",
  },
  windyClouds: {
    id: "windyClouds",
    organization: "Windy Community",
    title: "Cloud base and cloud tops",
    label: "Windy: podstawa i wierzchołki",
    url: "https://community.windy.com/topic/37207/clouds-base-cloud-tops",
    kind: "Objaśnienie interfejsu",
    trust:
      "Wyjaśnia różnicę między parametrami modelu widocznymi w aplikacji; nie zastępuje obserwacji.",
    scope: "Podstawa, wierzchołki, zachmurzenie warstw i ograniczenia modelu.",
    retrieved: "16 czerwca 2026",
  },
  commons: {
    id: "commons",
    organization: "Wikimedia Commons",
    title: "Repozytorium wolnych mediów",
    label: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/",
    kind: "Źródło fotografii",
    trust:
      "Każde zdjęcie ma osobną stronę pliku z autorem, licencją i historią.",
    scope: "Fotografie identyfikacyjne użyte w atlasie.",
    retrieved: "16 czerwca 2026",
  },
};

export const sourceList = Object.values(sources);

export function getSources(ids = []) {
  return ids.map((id) => sources[id]).filter(Boolean);
}

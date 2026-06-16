export const learningModules = [
  {
    id: "obserwacja",
    number: "01",
    level: "Początek",
    title: "Najpierw patrz, potem nazywaj",
    minutes: 12,
    summary:
      "Sześć pytań, które zamieniają „jakaś chmura” w uporządkowaną obserwację.",
    outcomes: ["kształt", "warstwa", "skala", "światło", "opad", "zmiana w czasie"],
    sourceIds: ["wmoAtlas"],
  },
  {
    id: "rodziny",
    number: "02",
    level: "Podstawy",
    title: "Dziesięć rodzajów bez wkuwania",
    minutes: 18,
    summary:
      "Czytaj rdzenie łacińskich nazw i łącz je z wysokością oraz budową chmury.",
    outcomes: ["cirro", "alto", "stratus", "cumulus", "nimbus"],
    sourceIds: ["wmoSummary"],
  },
  {
    id: "procesy",
    number: "03",
    level: "Rozumienie",
    title: "Dlaczego chmura powstaje",
    minutes: 20,
    summary:
      "Wilgoć, unoszenie, ochładzanie i stabilność jako wspólny mechanizm wielu różnych obrazów nieba.",
    outcomes: ["punkt rosy", "kondensacja", "inwersja", "konwekcja"],
    sourceIds: ["faaWeather"],
  },
  {
    id: "fronty",
    number: "04",
    level: "Synoptyka",
    title: "Niebo przed i za frontem",
    minutes: 22,
    summary:
      "Sekwencje chmur są wskazówką, nie zegarkiem. Naucz się odróżniać sygnał od pewnej prognozy.",
    outcomes: ["front ciepły", "front chłodny", "okluzja", "niepewność"],
    sourceIds: ["faaWeather"],
  },
  {
    id: "wiatr",
    number: "05",
    level: "Obserwacja",
    title: "Czytanie wiatru z ruchu chmur",
    minutes: 24,
    summary:
      "Kierunek, uskoki, fale i pozorny ruch: jak wyciągać wnioski z nieba bez udawania, że chmura jest anemometrem.",
    outcomes: ["wiatr z kierunku", "dryf chmur", "uskok", "fala górska", "perspektywa"],
    sourceIds: ["faaWeather", "wmoAtlas"],
  },
  {
    id: "lotnictwo",
    number: "06",
    level: "Lotnictwo",
    title: "Chmury w METAR i TAF",
    minutes: 26,
    summary:
      "FEW, SCT, BKN i OVC; pułap, podstawa, widzialność i to, czego kod nie mówi.",
    outcomes: ["grupy zachmurzenia", "ceiling", "AGL", "CB/TCU"],
    sourceIds: ["awcCodes", "easaAircrew"],
  },
  {
    id: "warstwy",
    number: "07",
    level: "Modele",
    title: "Czytanie atmosfery w pionie",
    minutes: 28,
    summary:
      "MSL, AGL, poziomy ciśnienia i wysokość geopotencjalna bez mylenia warstwy modelu z wysokością nad domem.",
    outcomes: ["AGL", "MSL", "hPa", "geopotencjał", "interpolacja modelu"],
    sourceIds: ["faaWeather", "windyLevels"],
  },
  {
    id: "zagrozenia",
    number: "08",
    level: "Operacyjne",
    title: "Oblodzenie, turbulencja i burze",
    minutes: 32,
    summary:
      "Połącz typ chmury, temperaturę, wodę przechłodzoną i dynamikę, nie wyciągając wniosku z jednej mapy.",
    outcomes: ["icing", "CAT", "konwekcja", "CAPE", "wind shear"],
    sourceIds: ["faaWeather", "easaAircrew"],
  },
  {
    id: "ekspert",
    number: "09",
    level: "Eksperckie",
    title: "Gatunki, odmiany i sporne granice",
    minutes: 35,
    summary:
      "Pełna składnia nazwy WMO, rzadkie cechy oraz uczciwe rozumowanie, kiedy dwa odczytania są obronione.",
    outcomes: ["species", "varietas", "supplementary features", "mother-clouds"],
    sourceIds: ["wmoAtlas", "wmoSummary"],
  },
];

export const placementQuestions = [
  {
    id: "visual",
    prompt: "Na zdjęciu widzisz drobne „ziarenka”. Co sprawdzasz najpierw?",
    answers: [
      { label: "Tylko kolor", score: 0 },
      { label: "Rozmiar elementów i ich cień", score: 2 },
      { label: "Czy pada w mojej miejscowości", score: 1 },
    ],
  },
  {
    id: "codes",
    prompt: "Co w raporcie METAR oznacza BKN?",
    answers: [
      { label: "Zachmurzenie 5–7 oktantów", score: 2 },
      { label: "Rodzaj niskiej chmury", score: 0 },
      { label: "Nie wiem jeszcze", score: 0 },
    ],
  },
  {
    id: "height",
    prompt: "Model pokazuje wiatr na 850 hPa. Czy to stała wysokość nad terenem?",
    answers: [
      { label: "Tak, zawsze dokładnie 1500 m AGL", score: 0 },
      { label: "Nie, to powierzchnia ciśnienia o zmiennej wysokości", score: 2 },
      { label: "Zależy wyłącznie od pory dnia", score: 1 },
    ],
  },
  {
    id: "taxonomy",
    prompt: "Cumulus congestus i Cumulonimbus calvus rozróżnia przede wszystkim…",
    answers: [
      { label: "kolor podstawy", score: 0 },
      { label: "oznaka zlodzenia i wygładzenia wierzchołka", score: 2 },
      { label: "obecność deszczu gdziekolwiek pod chmurą", score: 1 },
    ],
  },
  {
    id: "uncertainty",
    prompt: "Dwie osoby podają różne nazwy tej samej chmury. Najlepsza reakcja to…",
    answers: [
      { label: "sprawdzić kryteria, perspektywę i moment rozwoju", score: 2 },
      { label: "uznać, że jedna na pewno nie zna klasyfikacji", score: 0 },
      { label: "wybrać dłuższą nazwę", score: 0 },
    ],
  },
];

export const hardCases = [
  {
    pair: "Cirrocumulus czy Altocumulus?",
    question: "Małe kłębki tworzą ławicę, ale część ma cień.",
    answer:
      "Nie rozstrzygaj po jednym kłębku. Oceń dominującą wielkość kątową, obecność cieniowania oraz ciągłość z innymi warstwami. Przejście może być rzeczywiste.",
    sourceIds: ["wmoAtlas"],
  },
  {
    pair: "Stratus czy mgła?",
    question: "Podstawa dotyka zbocza, ale obserwator stoi niżej w dolinie.",
    answer:
      "Relacja do powierzchni jest lokalna. Dla obserwatora w dolinie może to być Stratus, podczas gdy na zboczu ta sama kropla chmurowa tworzy mgłę.",
    sourceIds: ["wmoAtlas", "faaWeather"],
  },
  {
    pair: "Cumulus congestus czy Cumulonimbus calvus?",
    question: "Wieża jest ogromna, lecz nie ma jeszcze kowadła.",
    answer:
      "Wielkość nie wystarcza. Szukaj utraty kalafiorowej ostrości i gładkawego, zlodzonego wierzchołka. Calvus nie wymaga jeszcze incus.",
    sourceIds: ["wmoAtlas", "faaWeather"],
  },
];

export const quizQuestions = [
  {
    prompt: "Który sygnał najsilniej wspiera rozpoznanie Cirrostratus?",
    options: ["Ciągły silny deszcz", "Halo wokół Słońca", "Płaska ciemna podstawa"],
    correct: 1,
    explanation:
      "Halo powstaje na kryształkach lodu i jest mocną wskazówką cienkiej wysokiej zasłony.",
  },
  {
    prompt: "Które zachmurzenie w METAR tworzy pułap lotniczy?",
    options: ["Najniższe BKN lub OVC", "Dowolne FEW", "Wyłącznie CB"],
    correct: 0,
    explanation:
      "W uproszczeniu ceiling odnosi się do najniższej warstwy BKN/OVC albo widzialności pionowej.",
  },
  {
    prompt: "Poziom 500 hPa w modelu to…",
    options: [
      "zawsze 5000 m nad terenem",
      "powierzchnia stałego ciśnienia o zmiennej wysokości",
      "wysokość podstawy chmur średnich",
    ],
    correct: 1,
    explanation:
      "Ciśnienie jest współrzędną pionową modelu. Geopotencjał mówi, na jakiej wysokości ta powierzchnia leży.",
  },
];

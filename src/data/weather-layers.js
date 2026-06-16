export const pressureLevels = {
  1000: { altitude: 110, use: "warstwa przyziemna nad niskim terenem" },
  925: { altitude: 760, use: "niska warstwa, inwersje i napływ" },
  850: { altitude: 1460, use: "temperatura i adwekcja w dolnej troposferze" },
  700: { altitude: 3010, use: "wilgoć i ruch pionowy poziomu średniego" },
  500: { altitude: 5570, use: "zatoki, niże górne i sterowanie przepływem" },
  300: { altitude: 9160, use: "prąd strumieniowy i górna troposfera" },
};

export const cloudBands = {
  low: {
    id: "low",
    label: "Niskie",
    range: "od powierzchni do około 2 km",
  },
  medium: {
    id: "medium",
    label: "Średnie",
    range: "około 2–6,5 km",
  },
  high: {
    id: "high",
    label: "Wysokie",
    range: "od około 6,5 km wzwyż",
  },
};

export const weatherLayers = [
  {
    id: "wind",
    label: "Wiatr",
    shortLabel: "Wiatr",
    icon: "wind",
    category: "Pole na wybranym poziomie",
    supportsPressure: true,
    unit: "kt, m/s lub km/h; kierunek podaje, skąd wieje wiatr",
    question: "Jak model prognozuje poziomy ruch powietrza na wybranej powierzchni?",
    reference:
      "Dla poziomu hPa jest to powierzchnia ciśnienia o zmiennej wysokości MSL, a nie stała odległość nad lokalnym gruntem.",
    compare: [
      "wiatr przy powierzchni i co najmniej jeden sąsiedni poziom hPa",
      "wysokość geopotencjalną poziomu oraz modelową rzeźbę terenu",
      "obserwowany ruch chmur, METAR lub sondaż, jeśli decyzja jest operacyjna",
    ],
    trap:
      "Animowane cząstki są wizualizacją prognozy modelu. Nie są pomiarem i nie pokazują automatycznie porywów ani lokalnego przepływu w dolinie.",
    sourceIds: ["windyOverlays", "windyLevels", "ecmwfModelLevels", "faaWeather"],
    check: {
      prompt: "Co najuczciwiej oznacza wiatr 30 kt na poziomie 850 hPa nad górzystym obszarem?",
      options: [
        "Przy ziemi w każdym punkcie wieje dokładnie 30 kt.",
        "Model prognozuje 30 kt na falującej powierzchni 850 hPa, którą trzeba umieścić względem terenu.",
        "Na wysokości dokładnie 1500 m AGL wieje 30 kt.",
        "Każda chmura niska będzie poruszać się z prędkością 30 kt.",
      ],
      correct: 1,
      explanation:
        "Poziom 850 hPa jest powierzchnią ciśnienia, nie stałą wysokością AGL. Nad wysokim terenem może leżeć bardzo blisko modelowego gruntu albo nawet go przecinać, dlatego potrzebujesz geopotencjału i porównania z warstwą przyziemną.",
    },
  },
  {
    id: "temperature",
    label: "Temperatura",
    shortLabel: "Temperatura",
    icon: "gauge",
    category: "Pole na wybranym poziomie",
    supportsPressure: true,
    unit: "°C lub °F na wysokości lub poziomie wskazanym w interfejsie",
    question: "Jaka jest prognozowana temperatura powietrza w wybranej warstwie?",
    reference:
      "Na powierzchni hPa kolor opisuje temperaturę tej powierzchni, nie temperaturę przy gruncie ani na jednej stałej wysokości AGL.",
    compare: [
      "temperaturę przy powierzchni oraz temperaturę na poziomach wyżej i niżej",
      "punkt rosy lub wilgotność, jeśli oceniasz nasycenie i chmury",
      "wysokość geopotencjalną i profil sondażowy, jeśli szukasz inwersji",
    ],
    trap:
      "Izoterma 0°C na jednym poziomie nie wyznacza sama wysokości zamarzania w całej kolumnie. Profil może przecinać 0°C więcej niż raz.",
    sourceIds: ["windyOverlays", "windyAcademy", "ecmwfModelLevels", "faaWeather"],
    check: {
      prompt: "Dlaczego temperatura na 700 hPa nie jest po prostu temperaturą na stałej wysokości nad Twoim domem?",
      options: [
        "Bo aplikacje pogodowe zawsze zaokrąglają temperaturę do pełnych stopni.",
        "Bo poziom 700 hPa jest używany wyłącznie nad morzem.",
        "Bo wysokość powierzchni 700 hPa zmienia się, a odległość od gruntu zależy dodatkowo od terenu.",
        "Bo temperatura powyżej 850 hPa nie ma związku z chmurami.",
      ],
      correct: 2,
      explanation:
        "Ciśnienie zależy od masy i temperatury całej kolumny powietrza. Powierzchnia 700 hPa faluje w przestrzeni i czasie, a AGL otrzymujesz dopiero po odniesieniu jej wysokości do lokalnego, modelowego terenu.",
    },
  },
  {
    id: "humidity",
    label: "Wilgotność",
    shortLabel: "Wilgotność",
    icon: "rain",
    category: "Pole na wybranym poziomie",
    supportsPressure: true,
    unit: "% wilgotności względnej dla wybranego poziomu",
    question: "Jak blisko nasycenia jest powietrze w wybranej warstwie modelu?",
    reference:
      "Wilgotność względna zależy od temperatury. Wysoka wartość na jednym poziomie nie opisuje automatycznie całej grubości chmury.",
    compare: [
      "wilgotność na poziomach wyżej i niżej, aby ocenić głębokość wilgotnej warstwy",
      "temperaturę i punkt rosy lub pełny profil sondażowy",
      "zachmurzenie modelowe oraz obserwacje satelitarne i powierzchniowe",
    ],
    trap:
      "Wysoka wilgotność względna nie jest równoznaczna z opadem. Potrzebne są kondensacja, dostateczna grubość chmury i proces wzrostu hydrometeorów.",
    sourceIds: ["windyOverlays", "ecmwfModelLevels", "faaWeather"],
    check: {
      prompt: "Mapa pokazuje 95% wilgotności na 700 hPa. Jaki wniosek jest obroniony?",
      options: [
        "Powietrze na tej powierzchni jest blisko nasycenia; trzeba sprawdzić pionową ciągłość wilgoci.",
        "Na pewno pada przy powierzchni.",
        "Podstawa każdej chmury znajduje się dokładnie na 700 hPa.",
        "Wilgotność przy ziemi również wynosi 95%.",
      ],
      correct: 0,
      explanation:
        "To informacja o jednej powierzchni modelu. Może wskazywać wilgotną warstwę lub chmurę, ale dopiero sąsiednie poziomy, temperatura, ruch pionowy i obserwacje pokażą jej głębokość oraz znaczenie dla opadu.",
    },
  },
  {
    id: "cloud-bands",
    label: "Pasma chmur",
    shortLabel: "Chmury niskie/średnie/wysokie",
    icon: "cloud",
    category: "Pokrycie w szerokiej strefie wysokości",
    supportsPressure: false,
    supportsCloudBand: true,
    unit: "% prognozowanego pokrycia chmurami w wybranym paśmie",
    question: "Jak duża część nieba lub komórki modelu jest pokryta chmurami w danej strefie wysokości?",
    reference:
      "To trzy szerokie pasma, nie trzy dokładne poziomy. Granice są przybliżone, a procent nie jest wysokością podstawy ani prawdopodobieństwem opadu.",
    compare: [
      "pozostałe dwa pasma oraz zachmurzenie całkowite",
      "podstawę i wierzchołki chmur, jeśli ważna jest geometria pionowa",
      "satelitę, METAR i widzialność, jeśli liczy się stan obserwowany",
    ],
    trap:
      "100% chmur niskich nie oznacza, że chmura wypełnia całą strefę od ziemi do 2 km ani że jej podstawa znajduje się przy powierzchni.",
    sourceIds: ["windyOverlays", "windyCloudBands", "windyAcademy"],
    check: {
      prompt: "Co oznacza 80% w warstwie „chmury niskie”?",
      options: [
        "Podstawa chmur znajduje się na 80% wysokości troposfery.",
        "Prawdopodobieństwo deszczu wynosi 80%.",
        "Około 80% prognozowanego pokrycia dotyczy niskiego pasma; nie znamy z tego dokładnej podstawy.",
        "Chmura ma grubość równą 80% przedziału od 0 do 2 km.",
      ],
      correct: 2,
      explanation:
        "Procent opisuje pokrycie chmurami w szerokiej strefie wysokości. Nie koduje dokładnej podstawy, grubości ani opadu, dlatego trzeba zestawić go z podstawą, wierzchołkami, innymi pasmami i obserwacjami.",
    },
  },
  {
    id: "cloud-base",
    label: "Podstawa chmur",
    shortLabel: "Podstawa",
    icon: "pin",
    category: "Wysokość nad modelowym gruntem",
    supportsPressure: false,
    unit: "m, ft lub FL zgodnie z legendą; w Windy pole podstawy jest odnoszone do gruntu (AGL)",
    question: "Jak wysoko nad modelowym terenem znajduje się najniższa prognozowana podstawa chmur?",
    reference:
      "AGL oznacza wysokość nad terenem reprezentowanym przez siatkę modelu. Wąska dolina lub szczyt mogą być w tej siatce wygładzone.",
    compare: [
      "elewację rzeczywistego i modelowego terenu, szczególnie w górach",
      "zachmurzenie niskie, widzialność, mgłę oraz METAR najbliższej stacji",
      "wierzchołki chmur tylko jako osobne pole, a nie drugi koniec tej samej bryły",
    ],
    trap:
      "Nie dodawaj ani nie odejmuj automatycznie rzeczywistej elewacji bez sprawdzenia definicji produktu. Modelowa podstawa AGL może różnić się od obserwowanej nad konkretnym zboczem.",
    sourceIds: ["windyCloudBase", "windyClouds", "windyOverlays", "faaWeather"],
    check: {
      prompt: "Dlaczego mapa podstawy chmur może być zawodna w wąskiej górskiej dolinie?",
      options: [
        "Bo chmury nie mają podstawy nad górami.",
        "Bo model wygładza teren, więc jego AGL może odnosić się do innej wysokości gruntu niż rzeczywista.",
        "Bo każda wartość AGL jest w rzeczywistości wartością MSL.",
        "Bo podstawa chmur jest zawsze liczona od poziomu morza.",
      ],
      correct: 1,
      explanation:
        "AGL jest poprawnym układem odniesienia dla tego pola, ale gruntem jest powierzchnia modelu. Przy ograniczonej rozdzielczości szczyty są obniżane, a doliny spłycane, więc lokalna różnica może być operacyjnie ważna.",
    },
  },
  {
    id: "cloud-tops",
    label: "Wierzchołki chmur",
    shortLabel: "Wierzchołki",
    icon: "stack",
    category: "Górna granica prognozowanego zachmurzenia",
    supportsPressure: false,
    unit: "m, ft lub FL zgodnie z legendą i ustawieniami interfejsu",
    question: "Do jakiej wysokości model prowadzi górną granicę chmur w danym miejscu?",
    reference:
      "Pole wierzchołków ma inną definicję i odniesienie niż pole podstawy. Nie wolno traktować obu map jak dwóch końców jednej, identycznej chmury.",
    compare: [
      "podstawę chmur, pamiętając o odmiennym układzie odniesienia",
      "pasmowe i całkowite zachmurzenie, aby sprawdzić, jaka część nieba tworzy sygnał",
      "temperaturę wierzchołków satelitarnych, radar i informacje konwekcyjne",
    ],
    trap:
      "Proste odjęcie wartości z mapy podstawy od mapy wierzchołków może dać pozornie ujemną grubość, ponieważ pola opisują różne elementy i mogą używać różnych odniesień.",
    sourceIds: ["windyClouds", "windyOverlays", "windyAcademy"],
    check: {
      prompt: "Mapa pokazuje lokalnie wierzchołek niżej niż podstawa. Co zrobić najpierw?",
      options: [
        "Uznać, że model dowiódł istnienia chmury o ujemnej grubości.",
        "Uśrednić obie liczby i użyć wyniku jako pułapu.",
        "Sprawdzić definicje, jednostki i odniesienie obu warstw oraz to, czy opisują ten sam element zachmurzenia.",
        "Zignorować wierzchołki i zawsze ufać wyłącznie podstawie.",
      ],
      correct: 2,
      explanation:
        "Warstwy mogą wybierać różne elementy zachmurzenia i używać różnych odniesień pionowych. Najpierw trzeba odtworzyć definicję produktu, a następnie porównać pasma chmur i obserwacje zamiast liczyć grubość automatycznie.",
    },
  },
  {
    id: "rain-thunder",
    label: "Deszcz i burze",
    shortLabel: "Opad i burze",
    icon: "rain",
    category: "Akumulacja i sygnał konwekcyjny",
    supportsPressure: false,
    unit: "mm lub in dla wskazanego kroku czasu; sygnał burzowy zależy od warstwy i modelu",
    question: "Ile opadu model prognozuje w danym oknie czasu i gdzie sygnalizuje konwekcję?",
    reference:
      "To prognoza dla przedziału czasu na osi, nie chwilowe natężenie i nie obserwacja radarowa. Dokładne okno trzeba odczytać z interfejsu.",
    compare: [
      "oś czasu, model i sąsiednie terminy, aby zrozumieć akumulację",
      "radar i detekcję wyładowań dla tego, co dzieje się teraz",
      "CAPE, wilgoć, ruch pionowy i wiatr, aby ocenić środowisko burz",
    ],
    trap:
      "Kolor opadu modelowego łatwo pomylić z radarem. Jedno pokazuje prognozowaną akumulację, drugie zdalną obserwację hydrometeorów w określonym czasie.",
    sourceIds: ["windyOverlays", "windyAcademy", "faaWeather"],
    check: {
      prompt: "Co trzeba sprawdzić przed porównaniem koloru opadu z dwóch terminów?",
      options: [
        "Tylko nazwę miasta.",
        "Okno akumulacji, model, jednostkę i dokładny czas prognozy.",
        "Wyłącznie wysokość terenu w metrach.",
        "Czy mapa ma włączoną animację wiatru.",
      ],
      correct: 1,
      explanation:
        "Suma opadu ma sens dopiero razem z przedziałem czasu i modelem. Identyczny kolor może reprezentować inną akumulację lub inne okno, a stan bieżący należy dodatkowo konfrontować z radarem i obserwacjami.",
    },
  },
  {
    id: "cape",
    label: "CAPE",
    shortLabel: "CAPE",
    icon: "lightning",
    category: "Potencjał konwekcyjny kolumny",
    supportsPressure: false,
    unit: "J/kg energii potencjalnie dostępnej dla unoszącej się porcji",
    question: "Jak duży potencjał dodatniej wyporności ma przyjęta porcja powietrza w profilu modelu?",
    reference:
      "CAPE jest wynikiem obliczenia dla określonej parceli i profilu. Nie jest prawdopodobieństwem burzy ani miarą siły wszystkich możliwych zagrożeń.",
    compare: [
      "CIN lub warstwę hamującą oraz realny mechanizm unoszenia",
      "wilgoć, uskoki wiatru i organizację przepływu",
      "radar, satelitę, wyładowania i ostrzeżenia dla bieżącej sytuacji",
    ],
    trap:
      "Duże CAPE może pozostać niewykorzystane pod silną inwersją, a mniejsze CAPE przy silnym uskoku i wymuszeniu może towarzyszyć groźnej, zorganizowanej konwekcji.",
    sourceIds: ["windyOverlays", "windyAcademy", "faaWeather"],
    check: {
      prompt: "Mapa pokazuje bardzo duże CAPE. Który wniosek jest poprawny?",
      options: [
        "Burza wystąpi na pewno w każdym miejscu o tym kolorze.",
        "Prawdopodobieństwo gradu jest równe wartości CAPE podzielonej przez sto.",
        "Atmosfera ma potencjał silnych prądów wstępujących, ale potrzebne są jeszcze inicjacja, wilgoć i ocena hamowania oraz uskoku.",
        "CAPE zastępuje radar, satelitę i ostrzeżenia.",
      ],
      correct: 2,
      explanation:
        "CAPE opisuje możliwą energię dodatniej wyporności po uruchomieniu konwekcji. Nie mówi samo, czy porcja przebije warstwę hamującą, czy jest dostatecznie wilgotna i jak uskok zorganizuje rozwijające się komórki.",
    },
  },
];

export function getWeatherLayer(id) {
  return weatherLayers.find((layer) => layer.id === id);
}

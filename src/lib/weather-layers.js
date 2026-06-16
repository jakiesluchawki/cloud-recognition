import {
  cloudBands,
  getWeatherLayer,
  pressureLevels,
} from "../data/weather-layers.js";

export function pressureSurfaceContext(pressure, terrain) {
  const level = pressureLevels[pressure];
  if (!level) throw new Error(`Unknown pressure level: ${pressure}`);

  const agl = level.altitude - terrain;
  return {
    ...level,
    pressure: Number(pressure),
    terrain: Number(terrain),
    agl,
    intersectsTerrain: agl <= 0,
    nearTerrain: agl > 0 && agl < 300,
  };
}

export function weatherLayerReading(
  layerId,
  { pressure = 850, terrain = 300, cloudBand = "low" } = {},
) {
  const layer = getWeatherLayer(layerId);
  if (!layer) throw new Error(`Unknown weather layer: ${layerId}`);

  if (layer.supportsPressure) {
    const context = pressureSurfaceContext(pressure, terrain);
    const height = context.altitude.toLocaleString("pl-PL");
    const ground = context.terrain.toLocaleString("pl-PL");

    if (context.intersectsTerrain) {
      return `Wybrano ${pressure} hPa, orientacyjnie ${height} m MSL, przy modelowym terenie ${ground} m MSL. Ta powierzchnia może przecinać teren: nie interpretuj koloru jak wartości w swobodnej atmosferze dokładnie nad punktem.`;
    }

    const aboveGround = context.agl.toLocaleString("pl-PL");
    const caution = context.nearTerrain
      ? " To bardzo blisko modelowego gruntu, więc rzeźba i parametryzacja warstwy przyziemnej mają duże znaczenie."
      : "";

    return `${layer.label} na ${pressure} hPa opisuje falującą powierzchnię około ${height} m MSL. Nad terenem ${ground} m MSL daje to orientacyjnie ${aboveGround} m AGL, a nie stałą wysokość nad każdym miejscem.${caution}`;
  }

  if (layer.id === "cloud-bands") {
    const band = cloudBands[cloudBand] || cloudBands.low;
    return `${band.label} chmury obejmują szeroką strefę ${band.range}. Kolor pokazuje prognozowane pokrycie w tej strefie, nie dokładną podstawę, grubość chmury ani prawdopodobieństwo opadu.`;
  }

  if (layer.id === "cloud-base") {
    return "Podstawa chmur jest podawana nad modelowym gruntem (AGL). W górach najpierw sprawdź, jak model wygładza teren, a następnie porównaj wynik z METAR, widzialnością i obserwacją.";
  }

  if (layer.id === "cloud-tops") {
    return "Wierzchołki pokazują górną granicę według definicji tej warstwy i legendy. Nie odejmuj od niej automatycznie podstawy: oba pola mogą opisywać inne elementy zachmurzenia i mieć inne odniesienie.";
  }

  if (layer.id === "rain-thunder") {
    return "Kolor opisuje prognozowaną akumulację opadu w oknie czasu widocznym na osi oraz sygnał konwekcyjny produktu. To nie jest chwilowe natężenie ani obraz radarowy.";
  }

  return "CAPE opisuje energię potencjalnie dostępną dla unoszącej się porcji w profilu modelu. To warunek sprzyjający silnym prądom wstępującym, nie procentowa prognoza burzy.";
}

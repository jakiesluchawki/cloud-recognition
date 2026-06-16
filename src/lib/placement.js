export function calculatePlacement(scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);

  if (total >= 8) {
    return {
      id: "operational",
      title: "Masz mocny punkt startu",
      moduleId: "lotnictwo",
      message:
        "Podstawy obserwacji są Ci prawdopodobnie znane. Zacznij od języka operacyjnego, a atlas potraktuj jak precyzyjne zaplecze.",
    };
  }

  if (total >= 4) {
    return {
      id: "intermediate",
      title: "Widzisz już więcej niż kształt",
      moduleId: "procesy",
      message:
        "Nie musisz wracać do alfabetu chmur. Zacznij od procesów, a krótkie braki uzupełnimy po drodze.",
    };
  }

  return {
    id: "beginner",
    title: "Zaczniemy od uważnego patrzenia",
    moduleId: "obserwacja",
    message:
      "Bez pamięciówki i bez ocen. Najpierw nauczysz się zauważać cechy, które później same prowadzą do nazw.",
  };
}

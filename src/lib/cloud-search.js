export function normalizeCloudSearch(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[łŁ]/g, "l")
    .toLowerCase()
    .trim();
}

function flattenSearchValues(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.flatMap(flattenSearchValues);
  if (typeof value === "object") return Object.values(value).flatMap(flattenSearchValues);
  return [String(value)];
}

function includesSearchTokens(text, query) {
  const tokens = query.split(/\s+/).filter(Boolean);
  return tokens.every((token) => text.includes(token));
}

function cloudSearchScore(cloud, profile, taxonomyTerms, query) {
  if (!query) return 1;

  const exactFields = [cloud.name, cloud.polish, cloud.code, cloud.id]
    .map(normalizeCloudSearch);
  if (exactFields.includes(query)) return 100;
  if (query.length >= 3 && exactFields.some((field) => field.includes(query))) return 80;

  const relatedTerms = taxonomyTerms.filter((term) => term.genera.includes(cloud.id));
  const coreText = normalizeCloudSearch([
    cloud.headline,
    cloud.altitude,
    cloud.meaning,
    cloud.trap,
    ...cloud.observe,
  ].join(" "));
  if (includesSearchTokens(coreText, query)) return 60;

  const taxonomyText = normalizeCloudSearch(
    relatedTerms
      .flatMap((term) => [term.name, term.polish, term.definition, term.diagnostic])
      .join(" "),
  );
  if (includesSearchTokens(taxonomyText, query)) return 40;

  const profileText = normalizeCloudSearch(flattenSearchValues(profile).join(" "));
  if (includesSearchTokens(profileText, query)) return 20;
  return 0;
}

export function searchCloudAtlas(
  cloudList,
  {
    query = "",
    level = "wszystkie",
    getProfile = () => null,
    taxonomyTerms = [],
  } = {},
) {
  const normalizedQuery = normalizeCloudSearch(query);
  const effectiveLevel = normalizedQuery ? "wszystkie" : level;

  const candidates = cloudList
    .map((cloud, index) => ({
      cloud,
      index,
      score: cloudSearchScore(
        cloud,
        getProfile(cloud.id),
        taxonomyTerms,
        normalizedQuery,
      ),
    }))
    .filter(({ cloud, score }) => (
      (effectiveLevel === "wszystkie" || cloud.level === effectiveLevel) && score > 0
    ));
  const directMatchScore = candidates.reduce(
    (highest, { score }) => (score >= 80 ? Math.max(highest, score) : highest),
    0,
  );

  return candidates
    .filter(({ score }) => !directMatchScore || score >= 80)
    .sort((first, second) => second.score - first.score || first.index - second.index)
    .map(({ cloud }) => cloud);
}

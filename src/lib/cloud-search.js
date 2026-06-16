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
      .flatMap((term) => [
        term.name,
        term.polish,
        term.definition,
        term.diagnostic,
        ...(term.searchTerms || []),
      ])
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

function taxonomySearchScore(
  term,
  query,
  {
    cloudList,
    includeCompatibleGenera,
  },
) {
  if (!query) return 1;

  const directFields = [term.name, term.polish, term.id].map(normalizeCloudSearch);
  if (directFields.includes(query)) return 100;
  if (query.length >= 3 && directFields.some((field) => field.includes(query))) return 90;

  const aliasText = normalizeCloudSearch(term.searchTerms || []);
  if (aliasText && includesSearchTokens(aliasText, query)) return 80;

  const allowsExplanatorySearch = query.includes(" ") || query.length >= 6;
  const explanatoryText = normalizeCloudSearch([
    term.definition,
    term.diagnostic,
  ].join(" "));
  if (allowsExplanatorySearch && includesSearchTokens(explanatoryText, query)) return 50;

  if (includeCompatibleGenera) {
    const compatibleFields = term.genera.flatMap((id) => {
      const cloud = cloudList.find((candidate) => candidate.id === id);
      return cloud ? [cloud.id, cloud.name, cloud.polish, cloud.code] : [id];
    }).map(normalizeCloudSearch);
    if (compatibleFields.includes(query)) return 30;
  }

  return 0;
}

export function searchTaxonomyTerms(
  terms,
  {
    query = "",
    category = "all",
    cloudList = [],
    includeCompatibleGenera = false,
  } = {},
) {
  const normalizedQuery = normalizeCloudSearch(query);
  const isDirectGenusQuery = normalizedQuery
    && !includeCompatibleGenera
    && cloudList.some((cloud) => {
      const fields = [cloud.id, cloud.name, cloud.polish, cloud.code]
        .map(normalizeCloudSearch);
      return fields.includes(normalizedQuery)
        || (normalizedQuery.length >= 3 && fields.some((field) => field.includes(normalizedQuery)));
    });
  if (isDirectGenusQuery) return [];

  const candidates = terms
    .map((term, index) => ({
      term,
      index,
      score: taxonomySearchScore(term, normalizedQuery, {
        cloudList,
        includeCompatibleGenera,
      }),
    }))
    .filter(({ term, score }) => (
      (category === "all" || term.category === category) && score > 0
    ));
  const directMatchScore = candidates.reduce(
    (highest, { score }) => (score >= 80 ? Math.max(highest, score) : highest),
    0,
  );

  return candidates
    .filter(({ score }) => !directMatchScore || score >= 80)
    .sort((first, second) => second.score - first.score || first.index - second.index)
    .map(({ term }) => term);
}

export interface ModelGroup {
  label: string;
  models: string[];
}

export function normalizeModelQuery(query: string): string {
  return query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function filterInjectionGroups(
  groups: ModelGroup[],
  query: string,
  format: string,
): ModelGroup[] {
  const normalized = normalizeModelQuery(query);
  return groups
    .filter((group) => format === "all" || group.label === format)
    .map((group) => ({
      ...group,
      models: group.models.filter((model) =>
        normalizeModelQuery(model).includes(normalized),
      ),
    }))
    .filter((group) => group.models.length > 0);
}

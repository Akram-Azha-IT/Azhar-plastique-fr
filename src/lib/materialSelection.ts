type CatalogMaterial = { id: string; category: string };

export function resolveMaterialSelection<T extends CatalogMaterial>(
  catalog: readonly T[],
  fragment: string,
): T | undefined {
  const id = fragment.replace(/^#/, "");
  return (
    catalog.find((material) => material.id === id) ??
    catalog.find((material) => material.category === id)
  );
}

export function getMaterialGalleryState(
  offsets: readonly number[],
  scrollLeft: number,
  maxScroll: number,
) {
  const scroll = Math.max(0, Math.min(scrollLeft, maxScroll));
  const atStart = scroll <= 2;
  const atEnd = maxScroll <= 2 || scroll >= maxScroll - 2;
  let index = 0;
  if (offsets.length && maxScroll > 2) {
    index = atEnd
      ? offsets.length - 1
      : offsets.reduce(
          (closest, offset, current) =>
            Math.abs(offset - scroll) < Math.abs(offsets[closest] - scroll)
              ? current
              : closest,
          0,
        );
  }
  return { index, atStart, atEnd };
}

export function getMaterialGalleryStep(
  offsets: readonly number[],
  scrollLeft: number,
  direction: -1 | 1,
  maxScroll: number,
) {
  const step = offsets.length > 1 ? offsets[1] - offsets[0] : maxScroll;
  return Math.max(0, Math.min(maxScroll, scrollLeft + direction * step));
}

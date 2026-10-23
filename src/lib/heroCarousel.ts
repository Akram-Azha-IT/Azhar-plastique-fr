const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function getHeroJourneyProgress(
  scrollY: number,
  top: number,
  distance: number,
) {
  return distance > 0 ? clamp((scrollY - top) / distance) : 0;
}

// Demo 1 uses 70cqw panels and a 30cqw text-animation offset.
export function getHeroSlideProgress(
  left: number,
  width: number,
  index: number,
) {
  if (width <= 0)
    return { image: index === 0 ? 0.5875 : 0, text: index === 0 ? 0.5 : 0 };
  const relative = left - index * width * 0.7;
  return {
    image: clamp((relative + width) / (width * 1.7)),
    text: clamp((relative + width * 0.7) / (width * 1.4)),
  };
}

export function getHeroActiveSlide(left: number, width: number, count: number) {
  if (width <= 0 || count <= 0) return 0;
  return Math.max(0, Math.min(count - 1, Math.round(left / (width * 0.7))));
}

export function getHeroScrollTarget(
  index: number,
  width: number,
  count: number,
) {
  if (count <= 0 || width <= 0) return 0;
  return (((index % count) + count) % count) * width * 0.7;
}

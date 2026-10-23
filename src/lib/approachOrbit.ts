import gsap from "gsap";

export const approachTiming = { hold: 1.4, travel: 0.6 } as const;

export function getApproachRotation(
  current: number,
  index: number,
  count: number,
) {
  const angle = (index * 360) / count;
  return current + gsap.utils.wrap(-180, 180, angle - current);
}

// Reach each labelled stop before changing its content. One circuit visits all steps.
export function createApproachTimeline(
  target: gsap.TweenTarget,
  startIndex: number,
  count: number,
  onArrival: (index: number) => void,
) {
  gsap.set(target, { rotation: (startIndex * 360) / count });
  const timeline = gsap.timeline({ paused: true, repeat: -1 });
  for (let hop = 1; hop <= count; hop++) {
    timeline.to({}, { duration: approachTiming.hold }).to(target, {
      rotation: ((startIndex + hop) * 360) / count,
      duration: approachTiming.travel,
      ease: "power2.inOut",
      onComplete: () => onArrival((startIndex + hop) % count),
    });
  }
  return timeline;
}

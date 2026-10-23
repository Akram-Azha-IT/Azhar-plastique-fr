type PageScroller = (top: number, immediate: boolean) => void;

let smoothScroller: PageScroller | undefined;

// Share the current scroll engine with interactions that also work without Lenis.
export function registerPageScroller(scroller: PageScroller) {
  smoothScroller = scroller;
  return () => {
    if (smoothScroller === scroller) smoothScroller = undefined;
  };
}

export function scrollPageTo(top: number, immediate = false) {
  if (smoothScroller) smoothScroller(top, immediate);
  else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}

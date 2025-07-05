import Lenis from "lenis";

export const useLenisScroll = () => {
  if (typeof window === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 2,
    infinite: false,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    lerp: 0.12,
  });

  interface RafFunction {
    (time: number): void;
  }

  const raf: RafFunction = function raf(time: number): void {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return lenis;
};
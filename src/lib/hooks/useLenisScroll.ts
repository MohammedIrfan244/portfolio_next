"use client";

import { useLenis } from "@/component/providers/SmoothScrollProvider";

/**
 * Hook to access the root Lenis instance from SmoothScrollProvider.
 * Prevents multiple competing requestAnimationFrame loops.
 */
export const useLenisScroll = () => {
  return useLenis();
};

export { useLenis };

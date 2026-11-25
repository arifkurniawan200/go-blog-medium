import { useEffect, useState } from 'react';

export interface PerformanceProfile {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  webglSupported: boolean;
  isLowEndDevice: boolean;
  classicMode: boolean;
  setClassicMode: (val: boolean) => void;
}

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export function usePerformanceMode(): PerformanceProfile {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [classicMode, setClassicMode] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const webgl = detectWebGL();
    const cores = navigator.hardwareConcurrency || 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
    const lowEnd = cores <= 2 || mem <= 2;

    setIsMobile(mobileQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);
    setWebglSupported(webgl);
    setIsLowEndDevice(lowEnd);

    // Automatically activate Classic 2D Mode if reduced motion is preferred, WebGL is unavailable, or device is very constrained
    if (!webgl || motionQuery.matches || lowEnd) {
      setClassicMode(true);
    }

    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setClassicMode(true);
    };

    mobileQuery.addEventListener('change', onMobileChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      mobileQuery.removeEventListener('change', onMobileChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return {
    isMobile,
    prefersReducedMotion,
    webglSupported,
    isLowEndDevice,
    classicMode,
    setClassicMode
  };
}

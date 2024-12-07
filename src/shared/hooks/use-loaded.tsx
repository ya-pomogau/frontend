import { useEffect, useState } from 'react';

export function useLoaded(src: string) {
  const [loaded, setLoaded] = useState<boolean | 'loaded' | 'error'>(false);

  useEffect(() => {
    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.src = src;

    return () => {
      active = false;
    };
  }, [src]);

  return loaded;
}

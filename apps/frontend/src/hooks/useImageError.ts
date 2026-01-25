import { useState } from 'react';

const globalFailedImages = new Set<string>();

export function useImageError(src?: string | null) {
  const [hasError, setHasError] = useState(() => (src ? globalFailedImages.has(src) : false));

  const handleError = () => {
    if (src) {
      globalFailedImages.add(src);
    }
    setHasError(true);
  };

  return { hasError, handleError };
}

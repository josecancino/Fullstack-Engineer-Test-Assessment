import Image from 'next/image';
import { isAllowedHost, buildUnsplashUrl } from '../lib/images';
import { ImageFallback } from './ImageFallback';
import { useImageError } from '../hooks/useImageError';

type Props = {
  src?: string | null;
  title: string;
  priority?: boolean;
  focus?: 'center' | 'top' | 'bottom';
};

export function ArticleCardImage({ src, title, priority = false, focus = 'center' }: Props) {
  const { hasError, handleError } = useImageError(src);

  const allowed = !!src && isAllowedHost(src);
  const showFallback = !src || !allowed || hasError;

  let finalSrc = '';

  if (src && allowed) {
    finalSrc = buildUnsplashUrl(src, {
      w: '640',
      h: '360',
      crop: 'entropy',
    });
  }

  if (showFallback) return <ImageFallback title={title} className="relative w-full aspect-video" />;

  const objectPosition =
    focus === 'top' ? 'center 25%' : focus === 'bottom' ? 'center 75%' : 'center';

  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src={finalSrc}
        alt={title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
        className="object-cover"
        style={{ objectPosition }}
        onError={handleError}
      />
    </div>
  );
}

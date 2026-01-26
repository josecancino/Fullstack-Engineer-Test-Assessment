import Image from 'next/image';
import { isAllowedHost, buildUnsplashUrl } from '@/lib/images';
import { ImageFallback } from '@/components/ImageFallback';
import { useImageError } from '@/hooks/useImageError';

type ImageOrientation = 'portrait' | 'landscape' | null;
type Props = {
  src?: string | null;
  title: string;
  priority?: boolean;
  imageOrientation?: ImageOrientation;
};

export function ArticleImage({ src, title, priority = false, imageOrientation }: Props) {
  const { hasError, handleError } = useImageError(src);

  const allowed = !!src && isAllowedHost(src);
  const showFallback = !src || !allowed || hasError;

  let finalSrc = '';

  if (src && allowed) {
    if (!imageOrientation) {
      finalSrc = buildUnsplashUrl(src, { w: '1600' });
    } else if (imageOrientation === 'landscape') {
      finalSrc = buildUnsplashUrl(src, { w: '1200', h: '675', crop: 'entropy' });
    } else {
      finalSrc = buildUnsplashUrl(src, { w: '1080', h: '1350', crop: 'entropy' });
    }
  }

  const wrapperClass =
    imageOrientation === 'portrait'
      ? 'relative w-full aspect-[4/5] bg-white'
      : 'relative w-full aspect-video bg-white';

  if (showFallback) return <ImageFallback title={title} className={wrapperClass} />;

  return (
    <div className={wrapperClass}>
      <Image
        src={finalSrc}
        alt={title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        className="object-cover"
        style={{ objectPosition: 'center' }}
        onError={handleError}
      />
    </div>
  );
}

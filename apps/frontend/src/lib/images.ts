import { ALLOWED_IMAGE_HOSTS } from '@/lib/data';

export function isAllowedHost(url: string) {
  try {
    return ALLOWED_IMAGE_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function buildUnsplashUrl(url: string, params: Record<string, string>) {
  const u = new URL(url);
  u.searchParams.set('auto', 'format');
  u.searchParams.set('fit', 'crop');
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}

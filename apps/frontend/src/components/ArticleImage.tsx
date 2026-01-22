import Image from 'next/image';
import { useState } from 'react';

const ALLOWED_IMAGE_HOSTS = ['images.unsplash.com'];

function isAllowedHost(url: string) {
    try {
        const { hostname } = new URL(url);
        return ALLOWED_IMAGE_HOSTS.includes(hostname);
    } catch {
        return false;
    }
}

type Props = {
    src?: string | null;
    title: string;
};

export function ArticleImage({ src, title }: Props) {
    const [hasError, setHasError] = useState(false);
    const showFallback = !src || !isAllowedHost(src) || hasError;

    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white p-6 text-center">
                <span className="text-2xl font-black opacity-20 uppercase tracking-tighter select-none line-clamp-2">
                    {title}
                </span>
            </div>

            {!showFallback && (
                <Image
                    src={src}
                    alt={title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-opacity duration-500"
                    onError={() => setHasError(true)}
                />
            )}
        </>
    );
}

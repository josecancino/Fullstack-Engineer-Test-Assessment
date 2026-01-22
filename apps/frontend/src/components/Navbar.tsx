import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold leading-none group-active:scale-95 transition-transform">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors uppercase font-black">Sport</span>
                </Link>
            </div>
        </nav>
    );
}

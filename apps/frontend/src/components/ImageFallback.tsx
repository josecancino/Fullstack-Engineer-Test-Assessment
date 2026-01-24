export function ImageFallback({ title, className }: { title: string; className: string }) {
  return (
    <div className={`${className} grid place-items-center bg-zinc-100`}>
      <span className="text-zinc-400 font-bold text-sm px-6 text-center">{title}</span>
    </div>
  );
}

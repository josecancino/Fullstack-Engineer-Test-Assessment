type Props = {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

export function LoadMore({ isLoading, hasMore, onLoadMore }: Props) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center py-12 border-t border-gray-100">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase italic">
            Fetching more articles...
          </p>
        </div>
      ) : hasMore ? (
        <button
          onClick={onLoadMore}
          data-testid="load-more-button"
          className="px-12 py-3 bg-white border-2 border-red-600 text-red-600 font-bold rounded-md shadow-sm hover:bg-red-50 transition-all active:scale-95 uppercase tracking-widest text-sm"
        >
          See More
        </button>
      ) : null}
    </div>
  );
}

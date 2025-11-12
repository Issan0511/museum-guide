export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <div className="text-sm text-neutral-600">読み込み中...</div>
    </div>
  );
}
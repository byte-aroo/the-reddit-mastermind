export function PreviewList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-white">{label}</span>

      {items.length === 0 ? (
        <span className="text-sm text-gray-400">—</span>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-gray-100 text-sm text-black"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviewList;
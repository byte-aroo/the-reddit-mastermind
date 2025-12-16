export function PreviewRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-white">{label}</span>

      {value ? (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm text-black w-fit">
          {value}
        </span>
      ) : (
        <span className="text-sm text-gray-400">—</span>
      )}
    </div>
  );
}

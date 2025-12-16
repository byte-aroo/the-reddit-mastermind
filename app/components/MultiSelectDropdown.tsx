import { useEffect, useRef, useState } from "react";
import dropdown from "./styles/dropdown.module.css";

type Option = {
  uuid: string;
  name: string;
};

type Props = {
  dropdownType: string;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  options: Option[];
};

export function MultiSelectDropdown({
  dropdownType,
  selectedIds,
  setSelectedIds,
  options,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleOption(id: string) {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id]
    );
  }

  const selectedCount = selectedIds.length;

  return (
    <div ref={ref} className="relative w-80">
      {/* Trigger */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={dropdown.dropdownText}
      >
        <span>
          {selectedCount === 0
            ? dropdownType
            : `${selectedCount} selected`}
        </span>

        <span
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className={dropdown.dropdownList}
        >
          {/* Clear all */}
          <button
            type="button"
            onClick={() => {
              setSelectedIds([]);
              setOpen(false);
            }}
            disabled={selectedCount === 0}
            className={`${dropdown.dropdownButtons} ${
              selectedCount === 0
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
          >
            — Clear all —
          </button>

          <div className="h-px bg-gray-200 my-1" />

          {options.map(option => {
            const selected = selectedIds.includes(option.uuid);

            return (
              <button
                key={option.uuid}
                type="button"
                onClick={() => toggleOption(option.uuid)}
                className={dropdown.dropdownButtons}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="pointer-events-none"
                />
                <span>{option.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

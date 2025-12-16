import { useEffect, useRef, useState } from "react";

type Props = {
  placeholder: string;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export function MultiInputChips({
  placeholder,
  values,
  setValues,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addValue(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) return;

    setValues(prev => [...prev, trimmed]);
    setInputValue("");
  }

  function removeValue(value: string) {
    setValues(prev => prev.filter(v => v !== value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue(inputValue);
    }
  }

  const count = values.length;

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowModal(false);
    }

    if (showModal) {
      document.addEventListener("keydown", onEscape);
    }

    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [showModal]);


  return (
    <>
      {/* Input */}
      <div
        className="
          w-80 px-4 py-3
          rounded-2xl
          bg-white/70 backdrop-blur
          border border-gray-200
          shadow-md
          flex items-center gap-3
          font-medium text-black
          focus-within:shadow-lg
          transition-all
        "
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addValue(inputValue)}
          placeholder={count === 0 ? placeholder : `Add more (${count} added)`}
          className="
            flex-1
            bg-transparent
            outline-none
            text-black
            placeholder:text-gray-700
          "
        />

        {count > 0 && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="
              text-sm
              text-gray-700
              hover:text-black
              transition
            "
          >
            Manage
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowModal(false)}
          />

          {/* Modal box */}
          <div
            className="
              relative z-10 w-105
              rounded-2xl bg-white
              shadow-xl p-6
              flex flex-col gap-4
              text-black
            "
          >
            <h3 className="font-bold text-lg">Manage Items</h3>

            {/* List */}
            <div className="max-h-60 overflow-auto flex flex-col gap-2">
              {values.length === 0 ? (
                <span className="text-sm text-black">
                  No items added
                </span>
              ) : (
                values.map(value => (
                  <div
                    key={value}
                    className="
                      flex justify-between items-center
                      bg-gray-100 rounded-lg
                      px-3 py-2 text-sm
                    "
                  >
                    <span className="truncate">{value}</span>
                    <button
                      onClick={() => removeValue(value)}
                      className="text-gray-500 hover:text-black"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setValues([])}
                className="
                  text-sm text-red-600
                  hover:underline
                "
              >
                Clear all
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2 rounded-xl
                  bg-gray-100 hover:bg-gray-200
                  text-sm font-medium
                "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
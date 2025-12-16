export function NumericInput({
    value,
    setValue,
    placeholder,
}: {
    value: string;
    setValue: (v: string) => void;
    placeholder: string;
}) {
    return <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        placeholder={placeholder}
        onChange={e => {
            const value = e.target.value;

            // Allow empty while typing
            if (value === "") {
                setValue("");
                return;
            }

            // Allow only digits (no +, -, e, .)
            if (!/^[1-9][0-9]*$/.test(value)) {
                return;
            }

            setValue(value);
        }}
        onKeyDown={e => {
            // Block explicitly unwanted keys
            if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-" ||
                e.key === "." ||
                e.key === ","
            ) {
                e.preventDefault();
            }
        }}
        onPaste={e => {
            const pasted = e.clipboardData.getData("text");
            if (!/^[1-9][0-9]*$/.test(pasted)) {
                e.preventDefault();
            }
        }}
        onBlur={() => {
            // Normalize empty to 1
            if (value === "") {
                setValue("");
            }
        }}
        className="
            w-80 px-4 py-3
            rounded-2xl
            bg-white/70 backdrop-blur
            border border-gray-200
            shadow-md
            font-medium text-black
            outline-none
            transition-all
            hover:shadow-lg
            focus:shadow-lg
            placeholder:text-gray-500
        "/>
}
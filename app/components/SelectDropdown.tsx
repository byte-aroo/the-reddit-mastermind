// import { useEffect, useRef, useState } from "react";
// import dropdown from "./styles/dropdown.module.css";

// export function SelectDropdown({
//   dropdownType,
//   dropdownId,
//   setDropdownId,
//   options,
// }: {
//   dropdownType: string;
//   dropdownId: string;
//   setDropdownId: (v: string) => void;
//   options: { uuid: string; name: string }[];
// }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const selected = options.find(option => option.uuid === dropdownId);
  
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={ref} className="relative w-80">      
//       <button
//         onClick={() => setOpen(o => !o)}
//         className={dropdown.dropdownText}
//       >
//         <span>
//           {selected ? selected.name : dropdownType}
//         </span>
//         <span
//           className={`transition-transform ${open ? "rotate-180" : ""}`}
//         >
//           ▾
//         </span>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div
//           className={dropdown.dropdownList}
//         >
//           {options.map(option => (
//             <button
//               key={option.uuid}
//               onClick={() => {
//                 setDropdownId(option.uuid);
//                 setOpen(false);
//               }}
//               className={dropdown.dropdownButtons}
//             >
//               {option.name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import dropdown from "./styles/dropdown.module.css";

type Option = {
  uuid: string;
  name: string;
};

type Props = {
  dropdownType: string;
  dropdownId: string;
  setDropdownId: (v: string) => void;
  options: Option[];
};

export function SelectDropdown({
  dropdownType,
  dropdownId,
  setDropdownId,
  options,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.uuid === dropdownId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-80">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={dropdown.dropdownText}
      >
        <span>
          {selected ? selected.name : dropdownType}
        </span>
        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className={dropdown.dropdownList}>
          {/* Clear option */}
          <button
            type="button"
            onClick={() => {
              setDropdownId("");   // 🔹 deselect
              setOpen(false);
            }}
            className={dropdown.dropdownButtons}
          >
            — Clear selection —
          </button>

          <div className="h-px bg-gray-200 my-1" />

          {options.map(option => {
            const isSelected = option.uuid === dropdownId;

            return (
              <button
                key={option.uuid}
                type="button"
                onClick={() => {
                  setDropdownId(option.uuid);
                  setOpen(false);
                }}
                className={`${dropdown.dropdownButtons} ${
                  isSelected ? "bg-gray-100" : ""
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

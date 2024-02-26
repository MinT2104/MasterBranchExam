import { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const RightSideDropdown = () => {
  const { setCurrentFilter, currentFilter } = useDatePickerStore();
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, setIsDropdown);

  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsDropdown(!isDropdown)}
      className="relative"
    >
      <button className="flex items-center gap-2 bg-blue-500 w-fit py-2 px-6 rounded-[12px] text-white">
        <span>Day</span>
        <MdKeyboardArrowDown className="text-xl" />
      </button>
      {isDropdown ? (
        <div
          style={{ boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}
          className="absolute w-[300px] right-0 h-fit rounded top-12 bg-white"
        >
          <ul className="p-2">
            <li
              onClick={() => setCurrentFilter(0)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Ngày
            </li>
            <li
              onClick={() => setCurrentFilter(1)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Tuần
            </li>
            <li
              onClick={() => setCurrentFilter(2)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Tháng
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default RightSideDropdown;

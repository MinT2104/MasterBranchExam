import { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const RightSideDropdown = () => {
  const { setCurrentFilter, setDetailIndex, currentFilter, setClickedDay } =
    useDatePickerStore();
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, setIsDropdown);

  const handleFilter = (data: number) => {
    setCurrentFilter(data);
    setClickedDay({
      day: null,
      index: { indexDay: -1, weekindex: -1 },
    });
    setDetailIndex(-1);
  };

  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsDropdown(!isDropdown)}
      className="relative"
    >
      <button className="flex items-center gap-2 bg-lightBlue w-fit py-2 px-6 rounded-[12px] text-white">
        <span>
          {currentFilter === 0 ? "Day" : currentFilter === 1 ? "Week" : "Month"}
        </span>
        <MdKeyboardArrowDown className="text-xl" />
      </button>
      {isDropdown ? (
        <div
          style={{ boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}
          className="absolute w-[300px] right-0 h-fit rounded top-12 bg-white z-50"
        >
          <ul className="p-2">
            <li
              onClick={() => handleFilter(0)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Day
            </li>
            <li
              onClick={() => handleFilter(1)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Week
            </li>
            <li
              onClick={() => handleFilter(2)}
              className="w-full p-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              Month
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default RightSideDropdown;

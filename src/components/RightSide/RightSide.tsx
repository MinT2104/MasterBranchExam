import { useDatePickerStore } from "../../stores/DatePickerStore";
import MainCalendar from "./MainCalendar";
import RightSideDropdown from "./RightSideDropdown";

const RightSide = () => {
  const { setNewMonth } = useDatePickerStore();

  return (
    <section className="w-full pt-2 flex flex-col items-between">
      <div className="w-full px-2 flex justify-end">
        <div className="w-full">
          <button
            onClick={() => setNewMonth(new Date())}
            className="py-2 px-4 rounded-[12px] border"
          >
            Today
          </button>
        </div>
        <RightSideDropdown />
      </div>
      <MainCalendar />
    </section>
  );
};

export default RightSide;

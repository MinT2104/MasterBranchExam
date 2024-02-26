import MiniCalendar from "./MiniCalendar";
import DateTitle from "./DateTitle";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const LeftSide = () => {
  const { currentMonth } = useDatePickerStore();

  return (
    <section className="h-full w-96 p-10 text-sm flex flex-col items-center justify-start gap-4 border-r">
      <DateTitle />
      <MiniCalendar />
    </section>
  );
};

export default LeftSide;

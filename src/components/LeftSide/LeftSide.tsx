import MiniCalendar from "./MiniCalendar";
import DateTitle from "./DateTitle";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import UpComingEvent from "../UpcomingEvent/UpComingEvent";

const LeftSide = () => {
  const { currentMonth } = useDatePickerStore();

  return (
    <section className="h-full min-w-96 text-sm flex flex-col items-center justify-start gap-4 border-r">
      <div className="border-b w-full p-10 flex flex-col gap-4">
        <DateTitle />
        <MiniCalendar />
      </div>
      <UpComingEvent />
    </section>
  );
};

export default LeftSide;

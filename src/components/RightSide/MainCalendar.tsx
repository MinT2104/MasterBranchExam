import { useDatePickerStore } from "../../stores/DatePickerStore";
import WeekRenderComponent from "./WeekRenderComponent";
import MonthRenderComponent from "./MonthRenderComponent";
import DayRenderComponent from "./DayRenderComponent";

const MainCalendar = () => {
  const { currentFilter } = useDatePickerStore();

  return (
    <>
      {currentFilter === 2 && <MonthRenderComponent />}
      {currentFilter === 1 && <WeekRenderComponent />}
      {currentFilter === 0 && <DayRenderComponent />}
    </>
  );
};

export default MainCalendar;

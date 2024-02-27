import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { useCallback } from "react";

const DateTitle = () => {
  const { currentMonth, setNewMonth } = useDatePickerStore();
  const monthYear = currentMonth.toString().split(" ");

  const handleSetDate = (num: number) => {
    const newCurrentmonth = new Date(
      new Date(currentMonth).getFullYear(),
      new Date(currentMonth).getMonth() + num
    );
    setNewMonth(newCurrentmonth);
  };

  const RenderTitle = useCallback(() => {
    return (
      <h1 className="font-bold text-xl select-none">
        {monthYear[1] + " " + monthYear[3]}
      </h1>
    );
  }, [currentMonth]);

  return (
    <div className="flex items-center justify-center gap-4">
      <MdKeyboardArrowLeft
        onClick={() => handleSetDate(-1)}
        className="text-xl cursor-pointer"
      />
      <RenderTitle />
      <MdKeyboardArrowRight
        onClick={() => handleSetDate(+1)}
        className="text-xl cursor-pointer"
      />
    </div>
  );
};

export default DateTitle;

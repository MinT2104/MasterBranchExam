import React, { useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";
import PopupNewEvent from "../PopupNewEvent.tsx/PopupNewEvent";

const MonthRenderComponent = () => {
  const { currentMonth, setClickedDay, clickedDay } = useDatePickerStore();
  const [currentDataDate, setCurrentDataDate] = useState("");
  const today = new Date().toLocaleString();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="w-full mb-4 uppercase font-bold  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      {getDayofMonth(currentMonth).map((week, weekindex) => {
        return (
          <div
            key={weekindex}
            className="relative w-full h-full grid  grid-cols-7 text-center items-center justify-center"
          >
            {clickedDay.day === currentDataDate &&
            clickedDay.index.weekindex === weekindex ? (
              <PopupNewEvent />
            ) : null}
            {week.map((data: any, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    clickedDay.day === data.day
                      ? setClickedDay({ day: null, index })
                      : setClickedDay({
                          day: data.day,
                          index: { index, weekindex },
                        });

                    setCurrentDataDate(data.day);
                  }}
                  className={`${data.color}   border h-full text-black justify-center items-center flex cursor-pointer 
                        `}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 ${
                      today.slice(0, 9) ===
                      new Date(data.day).toLocaleString().slice(0, 9)
                        ? "rounded-full  bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {new Date(data.day).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MonthRenderComponent;

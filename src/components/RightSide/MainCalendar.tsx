import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";

const MainCalendar = () => {
  var dataMain: any = null;
  //   const [data, setData] = useState<any>(null);
  const { currentMonth, setCurrentWeekChosen, currentWeekChosen } =
    useDatePickerStore();

  useEffect(() => {
    setCurrentWeekChosen(dataMain);
  }, [dataMain]);

  console.log(currentWeekChosen);

  return (
    <div className="w-full h-full flex flex-col pt-4">
      {getDayofMonth(currentMonth).map((week, index) => {
        const today = new Date().toLocaleString();

        week.filter((data) => {
          if (
            today.slice(0, 9) ===
            new Date(data.day).toLocaleString().slice(0, 9)
          ) {
            // setData(week);
            dataMain = week;
          }
        });
        return (
          <div
            key={index}
            className=" w-full h-full grid grid-cols-7 text-center items-center justify-center"
          >
            {week.map((data: any, index) => {
              if (
                today.slice(0, 9) ===
                new Date(data.day).toLocaleString().slice(0, 9)
              ) {
                // setCurrentWeekChosen(week);
                return;
              }
              //   today.slice(0, 9) ===
              //     new Date(data.day).toLocaleString().slice(0, 9) &&
              //     setCurrentWeekChosen(week);
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log(new Date(data.day));
                  }}
                  className={`${data.color} border h-full text-black justify-center items-center flex cursor-pointer 
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

export default MainCalendar;

import { useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";

const MiniCalendar = () => {
  const {
    currentMonth,
    reloadingWeek,
    currentPickedDate,
    setCurrentPickedDate,
    setReloadingWeek,
  } = useDatePickerStore();

  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "pri", "sat"];
  const today = new Date().toLocaleString();

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="w-full uppercase  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      {/* {currentFilter === 2 && ( */}
      <div className="w-full flex flex-col gap-8">
        {getDayofMonth(currentMonth).map((week, index) => {
          week.filter((data) => {
            if (
              today.slice(0, 9) ===
              new Date(data.day).toLocaleString().slice(0, 9)
            ) {
              // setReloadingDate(data);
            }
          });
          return (
            <div
              key={index}
              className="h-full w-full gap-4 grid grid-cols-7 text-center"
            >
              {week.map((data: any, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setReloadingWeek({ data: week, index });
                    }}
                    className={`${data.color} text-black cursor-pointer ${
                      today.slice(0, 9) ===
                        new Date(data.day).toLocaleString().slice(0, 9) &&
                      "rounded-full flex items-center justify-center w-7 h-7 bg-blue-500 text-white"
                    }
                    ${
                      new Date(data.day).toLocaleString().slice(0, 9) ===
                      new Date(
                        reloadingWeek
                          ? reloadingWeek?.data[reloadingWeek.index]?.day
                          : null
                      )
                        .toLocaleString()
                        .slice(0, 9)
                        ? "rounded-full flex items-center justify-center w-7 h-7 bg-blue-300 text-white"
                        : ""
                    }
                    `}
                  >
                    <span>{new Date(data.day).getDate()}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* )} */}
    </section>
  );
};

export default MiniCalendar;

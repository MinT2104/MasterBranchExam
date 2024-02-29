import { useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";
import { v4 } from "uuid";

const MiniCalendar = () => {
  const { currentMonth, reloadingDate, setReloadingWeek, setReloadingDate } =
    useDatePickerStore();

  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "pri", "sat"];
  const today = new Date().toLocaleString();

  useEffect(() => {
    var dateClock = new Date();
    dateClock.setDate(dateClock.getDate() - 1);

    const weekData = getDayofMonth(currentMonth)?.flatMap((row) =>
      row.filter((data: any) => {
        if (data.day.slice(0, 16) === dateClock.toUTCString().slice(0, 16)) {
          return true;
        }
      })
    );
    setReloadingDate(weekData ? weekData[0] : null);
  }, []);

  useEffect(() => {
    const weekData = getDayofMonth(currentMonth);
    if (weekData && reloadingDate) {
      for (var i = 0; i < weekData.length; i++) {
        weekData[i].map((data: any) => {
          if (data.day === reloadingDate.day) {
            setReloadingWeek({
              data: weekData[i],
              index: { dayIndex: weekData[i].indexOf(data), weekindex: i },
            });
          }
        });
      }
    }
  }, [reloadingDate]);

  return (
    <section className="flex flex-col gap-4 w-full select-none">
      <div className="w-full uppercase  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      {/* {currentFilter === 2 && ( */}
      <div className="w-full flex flex-col gap-8">
        {getDayofMonth(currentMonth)?.map((week, weekindex) => {
          week.filter((data: any) => {
            if (
              today.slice(0, 9) ===
              new Date(data.day).toLocaleString().slice(0, 9)
            ) {
            }
          });
          return (
            <div
              key={weekindex}
              className="h-full w-full gap-4 grid grid-cols-7 text-center"
            >
              {week.map((data: any, dayIndex: number) => {
                return (
                  <div
                    key={v4()}
                    onClick={() => {
                      setReloadingDate(data);
                      setReloadingWeek({
                        data: week,
                        index: {
                          dayIndex,
                          weekindex,
                        },
                      });
                    }}
                    className={`${data.color} text-black cursor-pointer
                    `}
                  >
                    <span
                      className={`
                       ${
                         today.slice(0, 9) ===
                         new Date(data.day).toLocaleString().slice(0, 9)
                           ? "rounded-full flex items-center justify-center w-7 h-7 bg-lightBlue text-white"
                           : reloadingDate?.day === data?.day &&
                             "text-lightBlue"
                       }
                      `}
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
      {/* )} */}
    </section>
  );
};

export default MiniCalendar;

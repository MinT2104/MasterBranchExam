import { useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";

const MiniCalendar = () => {
  const {
    currentMonth,
    reloadingWeek,
    reloadingDate,
    setReloadingWeek,
    setReloadingDate,
  } = useDatePickerStore();

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
        // return true;
      })
    );
    console.log(weekData);
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
  console.log(reloadingWeek);

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="w-full uppercase  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      {/* {currentFilter === 2 && ( */}
      <div className="w-full flex flex-col gap-8">
        {getDayofMonth(currentMonth)?.map((week, index) => {
          week.filter((data: any) => {
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
              {week.map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setReloadingDate(data);
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
                          ? reloadingWeek?.data[reloadingWeek?.index]?.day
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

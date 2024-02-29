import { memo, useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";
import { useEventStore } from "../../stores/EventStore";
import PopupEventDetail from "../PopupEvent/PopupEventDetail";
import { v4 } from "uuid";
import PopupNewEvent from "../PopupEvent/PopupNewEvent";

const WeekRenderComponent = () => {
  const { reloadingWeek, currentFilter } = useDatePickerStore();
  const { getEventsByDay, events } = useEventStore();

  const {
    currentMonth,
    setClickedDay,
    clickedDay,
    setDetailIndex,
    detailIndex,
  } = useDatePickerStore();

  const today = new Date().toLocaleString();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  var currentEvent: string[] = [];

  useEffect(() => {
    currentEvent = [];
  }, [currentMonth]);
  const getCurrentEvent = () => {
    const dayOfMonth = getDayofMonth(currentMonth);
    if (!dayOfMonth) return null;

    const filteredEvents = dayOfMonth.flatMap((subArray: any) =>
      subArray?.filter((event: any) => {
        const eventsByDay = getEventsByDay(event?.day);
        if (eventsByDay && eventsByDay[0]?.day === event.day) {
          currentEvent = [...currentEvent, event.day];
          return true;
        }
        return false;
      })
    );
    return filteredEvents && filteredEvents.length > 0 ? filteredEvents : null;
  };
  getCurrentEvent();

  return (
    <div className="flex flex-col h-full gap-4 py-4">
      <div className="w-full uppercase text-[12px]  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 h-full relative pt-12">
        {reloadingWeek &&
          reloadingWeek.data?.map((dataDay: any, indexDay: number) => {
            return (
              <div
                key={indexDay}
                className="w-full h-full bg-transparent border"
              >
                {currentEvent?.includes(dataDay.day) && (
                  <div
                    key={indexDay + 1000}
                    className=" cursor-pointer top-1 left-0 h-fit w-4/5 flex flex-col gap-[2px]"
                  >
                    {currentEvent?.includes(dataDay.day) &&
                      getEventsByDay(
                        currentEvent[currentEvent.indexOf(dataDay.day)]
                      )?.map((data) => (
                        <>
                          {detailIndex === events.indexOf(data) && (
                            <PopupEventDetail
                              key={v4()}
                              index={indexDay}
                              weekindex={reloadingWeek.index}
                              data={data}
                              eventIndex={events.indexOf(data)}
                            />
                          )}
                          <span
                            key={v4()}
                            onClick={() => {
                              setClickedDay({
                                day: null,
                                index: {
                                  indexDay,
                                  weekindex: reloadingWeek.index,
                                },
                              });
                              setDetailIndex(events.indexOf(data));
                            }}
                            className=" bg-lightBlue z-40 text-white shadow-lg w-full h-fit py-2 rounded px-1 cursor-pointer text-left truncate"
                          >
                            {data.title}
                          </span>
                        </>
                      ))}
                  </div>
                )}
                <div
                  onClick={() => {
                    clickedDay.day === dataDay.day
                      ? setClickedDay({
                          day: null,
                          index: {
                            indexDay,
                            weekindex: reloadingWeek.index.weekindex,
                          },
                        })
                      : setClickedDay({
                          day: dataDay.day,
                          index: {
                            indexDay,
                            weekindex: reloadingWeek.index.weekindex,
                          },
                        });
                    setDetailIndex(-1);
                  }}
                  className={`${dataDay.color} bg-white h-full text-black justify-center items-start flex flex-row cursor-default
            `}
                >
                  <span
                    className={`flex items-center text-2xl justify-center w-10 h-10 hover:bg-slate-200 rounded-full absolute -top-2 ${
                      today.slice(0, 9) ===
                      new Date(dataDay.day).toLocaleString().slice(0, 9)
                        ? "bg-lightBlue text-white"
                        : ""
                    }`}
                  >
                    {new Date(dataDay.day).getDate()}
                  </span>
                </div>
                {clickedDay.day === dataDay.day && currentFilter === 1 ? (
                  <PopupNewEvent />
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(WeekRenderComponent);

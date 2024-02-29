import { memo, useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";
import { useEventStore } from "../../stores/EventStore";
import PopupEventDetail from "../PopupEvent/PopupEventDetail";
import { v4 } from "uuid";
import PopupNewEvent from "../PopupEvent/PopupNewEvent";

const DayRenderComponent = () => {
  const {
    reloadingDate,
    currentFilter,
    reloadingWeek,
    currentMonth,
    setClickedDay,
    setDetailIndex,
    clickedDay,
    detailIndex,
  } = useDatePickerStore();
  const { events, getEventsByDay } = useEventStore();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = new Date().toLocaleString();

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
    <div className="flex flex-col h-full gap-4 py-4 ">
      <div className=" h-full relative pt-20 justify-start">
        {currentEvent?.includes(reloadingDate.day) && (
          <div
            key={v4()}
            className=" cursor-pointer top-1 left-0 h-fit w-fulll flex flex-col gap-[2px]"
          >
            {currentEvent?.includes(reloadingDate.day) &&
              getEventsByDay(
                currentEvent[currentEvent.indexOf(reloadingDate.day)]
              )?.map((data) => (
                <>
                  {detailIndex === events.indexOf(data) && (
                    <PopupEventDetail
                      key={v4()}
                      index={reloadingWeek.index.dayIndex}
                      weekindex={reloadingWeek.index.weekindex}
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
                          dayIndex: reloadingWeek.index.dayIndex,
                          weekindex: reloadingWeek.index,
                        },
                      });
                      setDetailIndex(events.indexOf(data));
                    }}
                    className=" bg-purple-500 z-40 text-white shadow-lg text-xl py-2 w-full h-full rounded px-4 cursor-pointer text-left truncate"
                  >
                    {data.title}
                  </span>
                </>
              ))}
          </div>
        )}
        {clickedDay.day === reloadingDate.day && currentFilter === 0 ? (
          <PopupNewEvent />
        ) : null}
        {reloadingDate && (
          <div
            onClick={() => {
              clickedDay.day === reloadingDate.day
                ? setClickedDay({
                    day: null,
                    index: { ...reloadingWeek.index },
                  })
                : setClickedDay({
                    day: reloadingDate.day,
                    index: { ...reloadingWeek.index },
                  });
              setDetailIndex(-1);
            }}
            className={`${reloadingDate?.color} border h-full text-black justify-start pl-8  items-center flex flex-row cursor-default
            `}
          >
            <div
              className={`flex flex-col items-center text-2xl justify-center   absolute -top-2`}
            >
              <div className="w-full uppercase text-[12px] rounded-full text-center text-[#7e7a7a] justify-start flex flex-col ">
                <span>{dayOfWeek[reloadingWeek.index.dayIndex]}</span>
              </div>
              <div
                className={`w-10 h-10 hover:bg-slate-200 rounded-full flex items-center justify-center  ${
                  today.slice(0, 9) ===
                  new Date(reloadingDate?.day).toLocaleString().slice(0, 9)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {new Date(reloadingDate?.day).getDate()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DayRenderComponent);

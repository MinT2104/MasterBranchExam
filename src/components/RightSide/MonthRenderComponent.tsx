import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";
import PopupNewEvent from "../PopupEvent/PopupNewEvent";
import { useEventStore } from "../../stores/EventStore";
import PopupEventDetail from "../PopupEvent/PopupEventDetail";
import { v4 } from "uuid";

const MonthRenderComponent = () => {
  const { addEvent, events, getEventsByDay } = useEventStore();

  const {
    currentMonth,
    setClickedDay,
    clickedDay,
    detailIndex,
    setDetailIndex,
  } = useDatePickerStore();
  const [currentDataDate, setCurrentDataDate] = useState("");
  const today = new Date().toLocaleString();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var currentEvent: string[] = [];

  useEffect(() => {
    currentEvent = [];
  }, [currentMonth]);
  const getCurrentEvent = () => {
    // currentEvent = [];
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
    <div className="w-full h-full flex flex-col pt-4 select-none">
      <div className="w-full mb-4 uppercase font-bold  text-center text-[#7e7a7a] grid grid-cols-7 ">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      {getDayofMonth(currentMonth)?.map((week, weekindex) => {
        return (
          <div
            key={weekindex}
            className=" w-full h-full grid  grid-cols-7 text-center items-center justify-center"
          >
            {week.map((data: any, indexDay: number) => {
              return (
                <div key={indexDay} className="h-full w-full relative">
                  {currentEvent?.includes(data.day) && (
                    <div
                      key={v4()}
                      className=" absolute cursor-pointer top-1 left-0  h-fit w-4/5 flex flex-col gap-[2px]"
                    >
                      {currentEvent?.includes(data.day) &&
                        getEventsByDay(
                          currentEvent[currentEvent.indexOf(data.day)]
                        )?.map((data, index) => (
                          <>
                            {detailIndex === events.indexOf(data) && (
                              <PopupEventDetail
                                key={v4()}
                                index={indexDay}
                                weekindex={weekindex}
                                data={data}
                                eventIndex={events.indexOf(data)}
                              />
                            )}
                            <span
                              onClick={() => {
                                setClickedDay({
                                  day: null,
                                  index: { indexDay, weekindex },
                                });
                                setDetailIndex(events.indexOf(data));
                              }}
                              key={index}
                              className=" bg-purple-500 z-40 text-white shadow-lg w-full h-full rounded px-1 text-left truncate"
                            >
                              {data.title}
                            </span>
                          </>
                        ))}
                    </div>
                  )}
                  {clickedDay.day === data.day ? <PopupNewEvent /> : null}
                  <div
                    onClick={() => {
                      clickedDay.day === data.day
                        ? setClickedDay({
                            day: null,
                            index: { indexDay, weekindex },
                          })
                        : setClickedDay({
                            day: data.day,
                            index: { indexDay, weekindex },
                          });
                      setCurrentDataDate(data.day);
                      setDetailIndex(-1);
                    }}
                    className={`${data.color} relative border truncate h-full text-black justify-center items-center flex 
                        `}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 ${
                        today.slice(0, 9) ===
                        new Date(data.day).toLocaleString().slice(0, 9)
                          ? "rounded-full  bg-blue-500 text-white "
                          : ""
                      }`}
                    >
                      {new Date(data.day).getDate()}
                    </span>
                  </div>
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

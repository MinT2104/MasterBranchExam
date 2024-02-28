import { FormEvent, useRef, useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { FaBars } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { useEventStore } from "../../stores/EventStore";

const PopupNewEvent = () => {
  const { clickedDay, setClickedDay } = useDatePickerStore();
  const { addEvent, events, getEventsByDay } = useEventStore();
  const [errState, setErrState] = useState<boolean>(false);
  const [typeEvent, setTypeEvent] = useState<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement | any>();

  const eventData = ["Appointment", "Event"];

  var dateClock = new Date(clickedDay?.day);
  dateClock.setDate(dateClock.getDate() + 1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameRef.current?.value) {
      setErrState(true);
      nameRef.current?.focus();
      setTimeout(() => {
        setErrState(false);
      }, 2000);
    } else {
      addEvent({
        title: nameRef.current?.value,
        desc: descRef.current?.value,
        day: clickedDay.day,
        type: eventData[typeEvent],
        created_at: new Date(),
      });
      setClickedDay({ day: null, index: { index: -1, weekindex: -1 } });
    }
  };

  return (
    <section
      style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px` }}
      className={`${
        clickedDay.index.index < 4
          ? "translate-x-[32%]  left-0"
          : "translate-x-[-32%] right-0"
      } ${
        clickedDay.index.weekindex < 2 ? "-top-2" : "bottom-2"
      } w-[400px] h-fit  z-[9999] bg-white absolute border rounded shadow-xl`}
    >
      <div className="p-2 bg-slate-100 flex items-center justify-between">
        <FaBars className="text-xl" />
        <MdClear
          onClick={() =>
            setClickedDay({ day: null, index: { index: -1, weekindex: -1 } })
          }
          className="text-2xl cursor-pointer"
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="px-6 flex items-center flex-col justify-center gap-6 pt-4"
      >
        <input
          ref={nameRef}
          autoFocus={true}
          type="text"
          className={`${
            errState && !nameRef.current?.value
              ? "border-red-500 placeholder:text-red-500"
              : "focus:border-blue-500"
          } py-2 p-2 border-b-[2px] w-full text-xl outline-none`}
          placeholder="Enter title and time"
        />
        <div className="w-full gap-4 flex items-center justify-start">
          {eventData.map((data, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setTypeEvent(index)}
              className={`${
                typeEvent === index
                  ? "bg-sky-400 text-white border-sky-400"
                  : "bg-transparent text-slate-500 "
              } px-6 py-2 rounded border`}
            >
              {data}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-start gap-4 w-full">
          <CiClock2 className="text-2xl" />
          <span className="font-semibold text-xl">
            {dateClock.toUTCString().slice(0, 16)}
          </span>
        </div>
        <textarea
          ref={descRef}
          cols={30}
          placeholder="Enter your event's description"
          className={`h-20 border w-full border-slate-300 outline-none rounded p-2`}
        ></textarea>
        <div className="flex items-center justify-end w-full gap-4 pb-4">
          <button
            type="button"
            className="px-6 py-2 rounded border"
            onClick={() =>
              setClickedDay({ day: null, index: { index: -1, weekindex: -1 } })
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded border bg-sky-500 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default PopupNewEvent;

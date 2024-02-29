import { eventItemsType, useEventStore } from "../../stores/EventStore";
import { MdClear } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiCalendar } from "react-icons/ti";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import PopupEditEvent from "./PopupEditEvent";
import { useState } from "react";

type PropsType = {
  index: number;
  weekindex: number;
  data: eventItemsType;
  eventIndex: number;
};

const PopupEventDetail = (props: PropsType) => {
  const { deleteEvent } = useEventStore();
  const { setDetailIndex, currentFilter } = useDatePickerStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  var dateClock = new Date(props.data?.day);
  dateClock.setDate(dateClock.getDate() + 1);

  return (
    <section
      className={`${
        props.index < 3
          ? "translate-x-[32%]  left-0"
          : "translate-x-[-32%]  right-0"
      } ${
        currentFilter === 2
          ? props.weekindex < 2
            ? "top-6"
            : "bottom-6"
          : "top-20"
      } w-[400px] h-fit z-[99] bg-white absolute border rounded-xl shadow-xl`}
    >
      {isEdit && (
        <PopupEditEvent
          data={props.data}
          eventIndex={props.eventIndex}
          setIsEdit={setIsEdit}
        />
      )}
      <div className="w-full cursor-default flex justify-end gap-4 p-4 items-center">
        <TiPencil
          onClick={() => {
            setIsEdit(true);
          }}
          className="text-xl cursor-pointer"
        />
        <RiDeleteBin5Line
          onClick={() => {
            deleteEvent(props.eventIndex);
            setDetailIndex(-1);
          }}
          className="text-xl cursor-pointer"
        />
        <MdClear
          onClick={() => setDetailIndex(-1)}
          className="text-xl cursor-pointer"
        />
      </div>
      <div>
        <div className="flex flex-col items-start justify-start px-10 gap-4 pb-10">
          <div className=" flex justify-start items-start gap-4 ">
            <div className="w-4 h-4 rounded bg-lightBlue mt-2" />
            <div className="flex flex-col gap-2 items-start justify-start w-64">
              <textarea
                disabled
                rows={props.data.title.length > 22 ? 2 : 1}
                defaultValue={props.data.title}
                className="text-xl font-bold bg-white select-none resize-none"
              ></textarea>
              <span className="text-sm font-normal">
                {dateClock.toUTCString().slice(0, 16)}
              </span>
              {props.data.desc && (
                <textarea
                  disabled
                  rows={3}
                  defaultValue={props.data?.desc}
                  className="bg-white h-fit resize-none text-left font-light text-sm w-64 break-words"
                ></textarea>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TiCalendar className="text-xl" />
            <div className="flex items-center gap-4">
              <span className="font-semibold">Annonymous</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopupEventDetail;

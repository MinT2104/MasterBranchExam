import { eventItemsType, useEventStore } from "../../stores/EventStore";
import { MdClear } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiCalendar } from "react-icons/ti";
import { useDatePickerStore } from "../../stores/DatePickerStore";

type PropsType = {
  index: number;
  weekindex: number;
  data: eventItemsType;
  eventIndex: number;
};

const PopupEventDetail = (props: PropsType) => {
  const { deleteEvent } = useEventStore();
  const { setDetailIndex } = useDatePickerStore();

  var dateClock = new Date(props.data?.day);
  dateClock.setDate(dateClock.getDate() + 1);

  return (
    <section
      className={`${
        props.index < 3
          ? "translate-x-[32%]  left-0"
          : "translate-x-[-32%]  right-0"
      } ${
        props.weekindex < 2 ? "top-6" : "bottom-6"
      } w-[400px] h-fit  z-[9999] bg-white absolute border rounded-xl shadow-xl`}
    >
      <div className="w-full cursor-default flex justify-end gap-4 p-4 items-center">
        <TiPencil
          onClick={() => {
            console.log("update");
          }}
          className="text-xl cursor-pointer"
        />
        <RiDeleteBin5Line
          onClick={() => {
            deleteEvent(props.eventIndex);
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
            <div className="w-4 h-4 rounded bg-cyan-500 mt-2" />
            <div className="flex flex-col gap-2 items-start justify-start w-64">
              <span className="text-xl font-bold">{props.data.title}</span>
              <span className="text-sm font-normal">
                {dateClock.toUTCString().slice(0, 16)}
              </span>
              <textarea
                disabled
                rows={3}
                className="bg-white h-fit resize-none text-left font-light text-sm w-64 break-words"
              >
                {props.data?.desc}
              </textarea>
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

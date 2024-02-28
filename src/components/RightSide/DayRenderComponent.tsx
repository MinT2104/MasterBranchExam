import React, { memo, useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const DayRenderComponent = () => {
  const { reloadingDate } = useDatePickerStore();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = new Date().toLocaleString();

  // const Data = reloadingWeek?.data[reloadingWeek.index];

  return (
    <div className="flex flex-col h-full gap-4 py-4 ">
      <div className="grid grid-cols-1 h-full relative pt-20 justify-start">
        {reloadingDate && (
          <div
            onClick={() => {}}
            className={`${reloadingDate?.color} border h-full text-black justify-start pl-8  items-center flex flex-row cursor-pointer
            `}
          >
            <span
              className={`flex flex-col items-center text-2xl justify-center  absolute -top-2 ${
                today.slice(0, 9) ===
                new Date(reloadingDate?.day).toLocaleString().slice(0, 9)
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <div className="w-full uppercase text-[12px] rounded-full text-center text-[#7e7a7a] justify-start flex flex-col ">
                <span>{dayOfWeek[reloadingDate.dayIndex]}</span>
              </div>
              <div className="w-10 h-10 hover:bg-slate-200 rounded-full flex items-center justify-center">
                {new Date(reloadingDate?.day).getDate()}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DayRenderComponent);

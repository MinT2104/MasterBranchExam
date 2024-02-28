import React, { memo, useEffect } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const WeekRenderComponent = () => {
  const { reloadingWeek } = useDatePickerStore();

  const today = new Date().toLocaleString();
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return (
    <div className="flex flex-col h-full gap-4 py-4">
      <div className="w-full uppercase text-[12px]  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 h-full relative pt-12">
        {reloadingWeek &&
          reloadingWeek.data?.map((data: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  console.log(new Date(data.day));
                }}
                className={`${data.color} border h-full text-black justify-center items-center flex flex-row cursor-pointer 
            `}
              >
                <span
                  className={`flex items-center text-2xl justify-center w-10 h-10 hover:bg-slate-200 rounded-full absolute -top-2 ${
                    today.slice(0, 9) ===
                    new Date(data.day).toLocaleString().slice(0, 9)
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {new Date(data.day).getDate()}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(WeekRenderComponent);

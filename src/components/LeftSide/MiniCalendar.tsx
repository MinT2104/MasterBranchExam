import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";
import { getDayofMonth } from "../../utils/utils";

const MiniCalendar = () => {
  const { currentMonth } = useDatePickerStore();

  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "pri", "sat"];

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="w-full uppercase  text-center text-[#7e7a7a] grid grid-cols-7">
        {dayOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className="w-full flex flex-col gap-4">
        {getDayofMonth(currentMonth).map((week, index) => {
          return (
            <div
              key={index}
              className=" w-full gap-2 grid grid-cols-7 text-center"
            >
              {week.map((data: any, index) => {
                const today = new Date().toLocaleString();
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log(new Date(data.day));
                    }}
                    className={`${data.color} text-black  cursor-pointer ${
                      today.slice(0, 9) ===
                        new Date(data.day).toLocaleString().slice(0, 9) &&
                      "rounded-full flex items-center justify-center w-7 h-7 bg-blue-500 text-white"
                    }`}
                  >
                    <span>{new Date(data.day).getDate()}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MiniCalendar;

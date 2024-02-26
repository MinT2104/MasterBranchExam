import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../../stores/DatePickerStore";

const MiniCalendar = () => {
  const { currentMonth } = useDatePickerStore();
  let lastDayOfmonth = NaN;
  let dateEndOfMonth: number[] = [];

  const getDayofMonth = (day: Date) => {
    const year = day.getFullYear();
    const month = day.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    lastDayOfmonth = daysInMonth;
    const firstDayOfMonth = new Date(
      year,
      month,
      Math.floor(Math.random() * 3 + 1)
    ).getDate();
    let currentCountMonth = 0 - firstDayOfMonth;
    return new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        const day = new Date(year, month, currentCountMonth).toUTCString();
        const color =
          currentCountMonth >= 1 && currentCountMonth <= daysInMonth
            ? "text-black font-normal"
            : "text-slate-400";
        currentCountMonth++;
        return { day, color };
      });
    });
  };

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
                const today = new Date().toUTCString();
                today === data.day && console.log("ok");
                console.log(new Date(data.day).toUTCString().slice(0, 16));
                console.log(today.slice(0, 16));

                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log(new Date(data.day));
                    }}
                    className={`${data.color} text-black  cursor-pointer ${
                      today.slice(0, 16) ===
                        new Date(data.day).toUTCString().slice(0, 16) &&
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

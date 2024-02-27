const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const getDayofMonth = (day: Date) => {
  const year = day.getFullYear();
  const month = day.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const indexDate = dayOfWeek.indexOf(
    new Date(year, month, 1).toUTCString().slice(0, 3).toLowerCase()
  );
  const firstDayOfMonth = new Date(
    year,
    month,
    indexDate === 0 ? -59 : indexDate
  ).getDate();
  let currentCountMonth = 0 - firstDayOfMonth;
  return new Array(5).fill([]).map(() => {
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

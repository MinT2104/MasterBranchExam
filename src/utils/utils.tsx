export const getDayofMonth = (day: Date) => {
  const year = day.getFullYear();
  const month = day.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(
    year,
    month,
    Math.floor(Math.random() * 3 + 1)
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

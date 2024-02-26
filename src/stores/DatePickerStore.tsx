import { create } from "zustand";

type datePickerStore = {
  currentMonth: Date;
  indexLastOfMonth: number;
  currentFilter: number;
  currentDayChosen: Date;
  setCurrentDayChosen: (data: Date) => void;
  currentWeekChosen: { day: string; color: string }[];
  setCurrentWeekChosen: (data: { day: string; color: string }[]) => void;
  setCurrentFilter: (data: number) => void;
  setIndexLastOfMonth: (data: number) => void;
  setNewMonth: (newMonth: Date) => void;
};
export const useDatePickerStore = create<datePickerStore>()((set, get) => ({
  currentMonth: new Date(),
  indexLastOfMonth: 0,
  currentFilter: 2,
  currentDayChosen: new Date(),
  setCurrentDayChosen: (data) => {
    set({
      currentDayChosen: data,
    });
  },
  currentWeekChosen: [],
  setCurrentWeekChosen: (data) => {
    set({ currentWeekChosen: data });
  },
  setCurrentFilter: (data) => {
    set({ currentFilter: data });
  },
  setIndexLastOfMonth: (data) => {
    set({ indexLastOfMonth: data });
  },
  setNewMonth: (newMonth) => {
    set({
      currentMonth: newMonth,
    });
  },
}));

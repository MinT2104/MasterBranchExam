import { create } from "zustand";
import { dayType } from "../types/types";

type reloadingWeekType = {
  data: dayType[];
  index: {
    dayIndex: number | undefined;
    weekindex: number | undefined;
  };
};

type clickedDayType = {
  day: any | null;
  index: {
    indexDay: number | undefined;
    weekindex: number | undefined;
  };
};

type datePickerStore = {
  currentMonth: Date;
  indexLastOfMonth: number;
  currentFilter: number;
  currentDayChosen: Date;
  reloadingDate: any;
  reloadingWeek: reloadingWeekType | any;
  currentPickedDate: any;
  clickedDay: clickedDayType | any;
  detailIndex: number;
  setDetailIndex: (data: number) => void;
  setClickedDay: (data: clickedDayType) => void;
  setCurrentPickedDate: (data: any) => void;
  setReloadingDate: (data: dayType | null) => void;
  setReloadingWeek: (data: reloadingWeekType) => void;
  setCurrentDayChosen: (data: Date) => void;
  currentWeekChosen: { day: string; color: string }[];
  setCurrentWeekChosen: (data: { day: string; color: string }[]) => void;
  setCurrentFilter: (data: number) => void;
  setIndexLastOfMonth: (data: number) => void;
  setNewMonth: (newMonth: Date) => void;
};
export const useDatePickerStore = create<datePickerStore>()((set) => ({
  currentMonth: new Date(),
  indexLastOfMonth: 0,
  currentFilter: 2,
  currentDayChosen: new Date(),
  reloadingDate: null,
  clickedDay: null,
  setClickedDay(data) {
    set({ clickedDay: data });
  },
  detailIndex: -1,
  setDetailIndex: (data: number) => {
    set({ detailIndex: data });
  },
  setReloadingDate: (data) => {
    set({ reloadingDate: data });
  },
  reloadingWeek: null,
  setReloadingWeek: (data) => {
    set({ reloadingWeek: data });
  },
  currentPickedDate: null,
  setCurrentPickedDate: (data: any) => {
    set({
      currentDayChosen: data,
    });
  },
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

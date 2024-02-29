import { create } from "zustand";

type datePickerStore = {
  currentMonth: Date;
  indexLastOfMonth: number;
  currentFilter: number;
  currentDayChosen: Date;
  reloadingDate: any | null;
  reloadingWeek: any;
  currentPickedDate: any;
  clickedDay: any;
  detailIndex: number;
  setDetailIndex: (data: number) => void;
  setClickedDay: (data: any) => void;
  setCurrentPickedDate: (data: any) => void;
  setReloadingDate: (data: any) => void;
  setReloadingWeek: (data: any) => void;
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
  clickedDay: "",
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

import { create } from "zustand";

type datePickerStore = {
  currentMonth: Date;
  indexLastOfMonth: number;
  setIndexLastOfMonth: (data: number) => void;
  setNewMonth: (newMonth: Date) => void;
};
export const useDatePickerStore = create<datePickerStore>()((set, get) => ({
  currentMonth: new Date(),
  indexLastOfMonth: 0,
  setIndexLastOfMonth: (data) => {
    set({ indexLastOfMonth: data });
  },
  setNewMonth: (newMonth) => {
    set({
      currentMonth: newMonth,
    });
  },
}));

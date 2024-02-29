import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type eventItemsType = {
  title: string;
  desc: string;
  day: string;
  type: string;
  created_at: Date;
};

type eventStoreType = {
  events: eventItemsType[];
  addEvent: (data: eventItemsType) => void;
  updateEvent: (index: number, eventData: eventItemsType) => void;
  deleteEvent: (index: number) => void;
  getEventsByDay: (data: any) => eventItemsType[] | null;
};

export const useEventStore = create<eventStoreType>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (eventData) =>
        set((state) => ({ events: [...state.events, eventData] })),
      updateEvent: (index, eventData) =>
        set((state) => {
          const updatedEvents = [...state.events];
          updatedEvents[index] = eventData;
          return { events: updatedEvents };
        }),
      deleteEvent: (index) =>
        set((state) => ({
          events: state.events.filter((_, i) => i !== index),
        })),
      getEventsByDay: (day) => {
        const state = get();
        if (!state.events) return null;
        return state.events.filter(
          (event: eventItemsType) => event.day === day
        );
      },
    }),
    {
      name: "eventStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

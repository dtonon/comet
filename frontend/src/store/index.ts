import { Note } from "&/github.com/nodetec/captains-log/db/models";
import { Tag } from "&/github.com/nodetec/captains-log/service";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  activeNote: Note | undefined;
  setActiveNote: (activeNote: Note | undefined) => void;

  activeTag: Tag | undefined;
  setActiveTag: (activeNote: Tag | undefined) => void;
}

export const useAppState = create<State>()(
  persist(
    (set) => ({
      activeNote: undefined,
      setActiveNote: (activeNote) => set({ activeNote }),

      activeTag: undefined,
      setActiveTag: (activeTag) => set({ activeTag }),
    }),
    {
      name: "captains-log-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

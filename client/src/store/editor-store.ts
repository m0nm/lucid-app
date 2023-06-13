import { create } from "zustand";

type IStore = {
  isFocusMode: boolean;
  toggleFocusMode(): void;

  isReadOnly: boolean;
  toggleReadOnly(): void;
};

export const useEditorStore = create<IStore>((set) => ({
  isFocusMode: false,
  toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),

  isReadOnly: false,
  toggleReadOnly: () => set((state) => ({ isReadOnly: !state.isReadOnly })),
}));

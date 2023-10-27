import { IMovie } from "@/interfaces/app.interface";
import { create } from "zustand";

interface IModalState {
  currentMovie: IMovie;
  modal: boolean;
  setModal: (bool: boolean) => void;
  setCurrentMovie: (movie: IMovie) => void;
}
export const useInfoStore = create<IModalState>()((set) => ({
  currentMovie: {} as IMovie,
  modal: false,

  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setCurrentMovie: (movie: IMovie) => set((state) => ({ ...state, currentMovie: movie })),
}));

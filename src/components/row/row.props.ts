import { IMovie } from "@/interfaces/app.interface";

export interface RowProps{
    title: string;
    movies: IMovie[];
    isBig?: boolean;
}
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { ICellArray } from "../components/Editor";

export interface IBoard {
	title: string;
	cells: ICellArray;
	id: string;
}

export interface IBoardArray extends Array<IBoard> {}

export interface IProjectContext {
	projectTitle: string;
	setProjectTitle: Dispatch<SetStateAction<string>>;
	boards: IBoard[];
	setBoards: Dispatch<SetStateAction<IBoardArray>>;
	selectedBoardIndex: number;
	setSelectedBoardIndex: Dispatch<SetStateAction<number>>;
	saveProject: () => void;
	isSaving: boolean;
}

let boardIndexCounter = 0;
export const CreateBoard = (): IBoard => {
	return {
		title: `Novo Quadro`,
		cells: [],
		id: `board${boardIndexCounter++}-${Math.floor(Math.random() * 1000)}`,
	};
};

export const ProjectContext = createContext({} as IProjectContext);

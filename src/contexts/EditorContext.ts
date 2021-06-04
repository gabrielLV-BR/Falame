import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { ICell } from "../components/Cell";
import { ICellArray } from "../components/Editor";

export interface IEditorContext {
	cells: ICellArray;
	setCells: Dispatch<SetStateAction<ICellArray>>;
	isControlHeld: boolean;
}

export const EditorContext = createContext({} as IEditorContext);

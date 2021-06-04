import { createContext, ReactChild, ReactChildren } from "react";

/* EXAMPLE CODE

PopUp.children = (
  <div>
  <h1>Cuidado!</h1>
  <p>Lorem ipsum...</p>
  <button onClick={() => getData() ; PopUp.Hide()}>Aperte</button>
  </div>
)

PopUp.Display();


*/

export interface IPopUpContext {
	children: ReactChild | ReactChildren;
	Display: () => void;
	Hide: () => void;
	SetChildren: (children: ReactChild | ReactChildren) => void;
	DialoguePopUp: (text: string, buttonText?: string) => void;
}

export const PopUpContext = createContext({} as IPopUpContext);

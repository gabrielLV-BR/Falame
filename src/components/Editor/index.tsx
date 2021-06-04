import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { PopUpContext } from "../../contexts/PopUpContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Button } from "../Button";
import { Cell, EmptyCell, ICell } from "../Cell";
import styles from "./styles.module.scss";

export interface ICellArray extends Array<ICell> {}

export function Editor() {
	const { boards, selectedBoardIndex, isSaving } = useContext(ProjectContext);
	const PopUp = useContext(PopUpContext);

	const [cells, setCells] = useState(boards[selectedBoardIndex].cells);
	const [isControlHeld, setIsControlHeld] = useState(false);

	const previousIndex = useRef(selectedBoardIndex);
	const thisElement = useRef<HTMLDivElement>(null);

	// Definindo os eventListeners

	useEffect(() => {
		const CheckControl = ({ ctrlKey }: KeyboardEvent) =>
			setIsControlHeld(ctrlKey);

		window.addEventListener("keydown", CheckControl);
		window.addEventListener("keyup", CheckControl);

		return () => {
			window.removeEventListener("keydown", CheckControl);
			window.removeEventListener("keyup", CheckControl);
		};
	}, []);

	useEffect(() => {
		const prevBoard = boards[previousIndex.current];
		if (prevBoard) {
			prevBoard.cells = cells;
		}
		previousIndex.current = selectedBoardIndex;
		setCells(boards[selectedBoardIndex].cells);
	}, [selectedBoardIndex]);

	useEffect(saveCells, [isSaving]);

	function saveCells() {
		const currentBoard = boards[selectedBoardIndex];
		currentBoard.cells = cells;
	}

	function EditBoardTitle() {
		let newTitle = "";

		PopUp.SetChildren(
			<>
				<h1>Insira o novo nome</h1>
				<input
					type="text"
					placeholder="Novo nome"
					onInput={(input) => {
						newTitle = (input.target as HTMLInputElement).value;
					}}
				></input>
				<Button
					callback={() => {
						// Escondemos antes pois se tivermos que usar o DialoguePopUp, o PopUp.Hide() iria
						// esconder o DialoguePopUp (afinal eles são a mesma coisa)
						PopUp.Hide();
						if (newTitle.length > 0 && newTitle.length < 101) {
							boards[selectedBoardIndex].title = newTitle;
						} else {
							PopUp.DialoguePopUp(
								"O Título do quadro só pode ter entre 1 e 100 caracteres."
							);
						}
					}}
					styleClass="green"
				>
					Confirmar
				</Button>
			</>
		);

		PopUp.Display();
	}

	return (
		<div className={styles.editorContainer} ref={thisElement}>
			<h1 onClick={EditBoardTitle}>{boards[selectedBoardIndex].title}</h1>
			<div className={styles.cellContainer}>
				<EditorContext.Provider
					value={{ cells, setCells, isControlHeld }}
				>
					{cells.map((cell: ICell) => (
						<Cell
							text={cell.text}
							image={cell.image}
							audio={cell.audio}
							id={cell.id}
							key={cell.id}
							link={cell.link}
						/>
					))}
					<EmptyCell callback={() => AppendCell(cells, setCells)} />
				</EditorContext.Provider>
			</div>
		</div>
	);
}

function AppendCell(cells: ICellArray, setCells: (a: ICellArray) => void) {
	let keyGeneratorIndex;
	const newCell: ICell = {
		text: "Aperte-me para editar",
		image: "/icons/edit.svg",
		audio: "",
		id: `cell${keyGeneratorIndex++}-${Math.floor(Math.random() * 1000)}`,
		link: -1,
	};

	setCells([...cells, newCell]);
}

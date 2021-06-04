import { FormEvent, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Button } from "../Button";
import styles from "./styles.module.scss";

interface CellEditorProps {
	setIsEditing: (isEditing: boolean) => void;
	id: string;
}

export function CellEditor(props: CellEditorProps) {
	const thisElement = useRef<HTMLDivElement>(null);
	const textInput = useRef<HTMLInputElement>(null);
	const ImageURLInput = useRef<HTMLInputElement>(null);
	const AudioURLInput = useRef<HTMLInputElement>(null);

	const { cells, setCells } = useContext(EditorContext);
	const { boards, selectedBoardIndex } = useContext(ProjectContext);

	const currentCellIndex = cells.findIndex((cell) => cell.id === props.id);

	let newLink = cells[currentCellIndex].link;

	function onMouseClick(event: MouseEvent) {
		const boundingBox = thisElement.current.getBoundingClientRect();

		const { clientX: x, clientY: y } = event;

		const isMouseClickInside =
			x > boundingBox.left &&
			x < boundingBox.right &&
			boundingBox.top < y &&
			y < boundingBox.bottom;

		props.setIsEditing(isMouseClickInside);
	}

	function formatImageURL(url: string) {
		if (url.indexOf("drive") == -1) return url;

		const idStart = url.indexOf("/d/") + 3;
		const idEnd = url.lastIndexOf("/view");
		const newUrl = `https://lh3.googleusercontent.com/d/${url.slice(
			idStart,
			idEnd
		)}=s220?authuser=0`;
		console.log(newUrl);
		return newUrl;
	}
	// https://drive.google.com/uc?authuser=0&id=1nQklEicsMeGBnuk0vv6zkHtXtyGy10S-&export=download
	function formatAudioURL(url: string) {
		if (url.indexOf("drive") == -1) return url;

		const idStart = url.indexOf("/d/") + 3;
		const idEnd = url.lastIndexOf("/view");
		const newUrl = `https://drive.google.com/uc?authuser=0&id=${url.slice(
			idStart,
			idEnd
		)}&export=download`;
		console.log(newUrl);
		return newUrl;
	}

	function confirmChanges() {
		const newCell = cells[currentCellIndex];

		let newText = textInput.current.value;
		let newImageURL = ImageURLInput.current.value;
		let newAudioURL = AudioURLInput.current.value;

		let deleteAudio = false;

		if (newText !== "") newCell.text = newText;
		if (newImageURL !== "") newCell.image = formatImageURL(newImageURL);
		if (newAudioURL !== "") newCell.audio = formatAudioURL(newAudioURL);

		// Desnecessário, já que já subtraímos -1, e caso seja o primeiro elemento (indíce zero e texto Nenhum) já tá o index certo
		// if (newLink !== -1) newCell.link = newLink;
		newCell.link = newLink;

		// Copiando o cells pra depois só mudar a célula no index e setar.
		const newCells = cells.copyWithin(cells.length, 0);
		newCells[currentCellIndex] = newCell;

		setCells([...newCells]);

		props.setIsEditing(false);
	}

	function deleteCell() {
		const currentCellIndex = cells.findIndex(
			(cell) => cell.id === props.id
		);

		setCells([
			...cells.slice(0, currentCellIndex),
			// Se não especificar o end, ele vai até o fim.
			...cells.slice(currentCellIndex + 1),
		]);
	}

	useEffect(() => {
		window.addEventListener("mousedown", onMouseClick);

		return () => {
			window.removeEventListener("mousedown", onMouseClick);
		};
	}, []);

	return (
		<div className={styles.container} ref={thisElement}>
			<label>Texto:</label>
			<span>
				<input
					ref={textInput}
					type="text"
					placeholder={cells[currentCellIndex].text}
				/>
			</span>
			<label>Imagem:</label>
			<span>
				<input
					ref={ImageURLInput}
					type="text"
					placeholder={cells[currentCellIndex].image}
				/>
			</span>

			<label>Audio:</label>
			<span>
				<input
					ref={AudioURLInput}
					type="text"
					placeholder={cells[currentCellIndex].audio}
				/>
			</span>
			<label
				className={styles.link}
				title="Quadro para qual a célula aponta"
			>
				Link:
			</label>
			<span>
				<select
					onChange={({ target }: FormEvent) => {
						// Subtraindo um pra poder pular uma verificação e poder setar com o próprio valor
						newLink =
							(target as HTMLSelectElement).selectedIndex - 1;
					}}
				>
					<option>Nenhum</option>
					{boards.map((board, index) => (
						<option
							key={board.id}
							selected={cells[currentCellIndex].link === index}
							disabled={
								board.id === boards[selectedBoardIndex].id
							}
						>
							{board.title}
						</option>
					))}
				</select>
			</span>

			<br />
			<Button callback={confirmChanges} styleClass="green">
				Confirmar
			</Button>
			<br />
			<Button callback={deleteCell} styleClass="red">
				Excluir
			</Button>
		</div>
	);
}

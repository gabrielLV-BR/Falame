import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { CellEditor } from "../CellEditor";
import styles from "./styles.module.scss";

export interface ICell {
	text: string;
	image: string;
	audio: string;
	id: string;
	link: number;
}

export function Cell(props: ICell) {
	const [isEditing, setIsEditing] = useState(false);
	const thisElement = useRef<HTMLDivElement>(null);
	const audioElement = useRef<HTMLAudioElement>(null);

	const { setSelectedBoardIndex } = useContext(ProjectContext);
	const { isControlHeld } = useContext(EditorContext);

	function HandleClick() {
		if (!isControlHeld) setIsEditing(true);
		else if (props.link !== -1) setSelectedBoardIndex(props.link);
	}

	return (
		<div
			className={`${styles.cell} ${
				isControlHeld && props.link !== -1 ? styles.clickable : ""
			}`}
			onClick={HandleClick}
			ref={thisElement}
		>
			{isEditing && (
				<CellEditor
					setIsEditing={(a) => setIsEditing(a)}
					id={props.id}
				/>
			)}
			<span>
				<img src={props.image} alt="Imagem da Célula" />
				{props.audio !== "" && (
					<button onClick={() => audioElement.current.play()}>
						<img src="./icons/play.svg" alt="Tocar áudio" />
					</button>
				)}
			</span>
			<h2>{props.text}</h2>
			<audio src={props.audio} ref={audioElement} />
		</div>
	);
}

export function EmptyCell({ callback }) {
	return (
		<div
			className={`${styles.cell} ${styles.cellEmpty}`}
			onClick={callback}
		>
			<span>
				<img src="/icons/plus.svg" alt="Adicionar uma Célula" />
				<h2>Adicionar nova célula</h2>
			</span>
		</div>
	);
}

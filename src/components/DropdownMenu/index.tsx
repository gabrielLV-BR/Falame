import { FormEvent, useContext } from "react";
import { PopUpContext } from "../../contexts/PopUpContext";
import { CreateBoard, ProjectContext } from "../../contexts/ProjectContext";
import { Button } from "../Button";
import { ICellArray } from "../../components/Editor/index";
import styles from "./styles.module.scss";

export function DropdownMenu() {
	const {
		saveProject,
		projectTitle,
		setProjectTitle,
		setBoards,
		boards,
		setSelectedBoardIndex,
	} = useContext(ProjectContext);

	const PopUp = useContext(PopUpContext);

	function newProject() {
		function Proceed() {
			setProjectTitle("Novo Projeto");
			setSelectedBoardIndex(0);
			const newBoard = CreateBoard();
			newBoard.cells = [] as ICellArray;
			setBoards([newBoard]);
		}

		PopUp.SetChildren(
			<>
				<p>Tem certeza?</p>
				<span>
					<Button
						callback={() => {
							PopUp.Hide();
							Proceed();
						}}
						styleClass="green"
					>
						Sim
					</Button>
					<Button callback={() => PopUp.Hide()} styleClass="red">
						Não
					</Button>
				</span>
			</>
		);

		PopUp.Display();
	}

	function renameProject() {
		let newName = projectTitle;
		PopUp.SetChildren(
			<>
				<p>Qual o novo nome do projeto?</p>
				<input
					type="text"
					placeholder={projectTitle}
					onInput={(input: FormEvent) => {
						newName = (input.target as HTMLInputElement).value;
					}}
				></input>
				<Button
					callback={() => {
						PopUp.Hide();
						if (newName !== "" && newName.length < 100)
							setProjectTitle(newName);
						else {
							PopUp.DialoguePopUp(
								"O novo título não pode ser vazio ou maior que 100 caracteres"
							);
						}
					}}
					styleClass="gray"
				>
					Confirmar
				</Button>
			</>
		);
		PopUp.Display();
	}

	return (
		<div className={styles.container}>
			<span onClick={newProject}>Novo Projeto</span>
			<span onClick={saveProject}>Salvar Projeto</span>
			<span onClick={renameProject}>Renomear Projeto</span>
			<span>Preferências</span>
		</div>
	);
}

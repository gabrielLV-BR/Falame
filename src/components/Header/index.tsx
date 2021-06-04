import { useContext, useRef, useState } from "react";
import { Button } from "../Button";
import { PopUpContext } from "../../contexts/PopUpContext";
import { CreateBoard, ProjectContext } from "../../contexts/ProjectContext";
import styles from "./styles.module.scss";
import { DropdownMenu } from "../DropdownMenu";

export function Header() {
	const {
		boards,
		setBoards,
		projectTitle,
		selectedBoardIndex,
		setSelectedBoardIndex,
	} = useContext(ProjectContext);

	const PopUp = useContext(PopUpContext);

	const [isMenuActive, setIsMenuActive] = useState(false);

	function NewBoard() {
		setBoards([...boards, CreateBoard()]);
	}

	function AreYouSure() {
		PopUp.SetChildren(
			<>
				<p>Tem certeza?</p>
				<span>
					<Button
						callback={() => {
							PopUp.Hide();
							DeleteBoard();
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

	function DeleteBoard() {
		// Não podemos deletar a primeira célula

		if (selectedBoardIndex !== 0) {
			const currentBoard = boards[selectedBoardIndex];
			let isCellLinkInvalid = false;

			// Verificamos todas as células e, caso alguma esteja com o
			// link apontando pra essa quadro, removemos o link

			for (let board of boards) {
				// Pulamos a iteração pra não perdermos tempo!
				if (board.id == currentBoard.id) continue;

				for (let i = 0; i < board.cells.length; i++) {
					const cell = board.cells[i];

					if (cell.link === selectedBoardIndex) {
						cell.link = -1;
						isCellLinkInvalid = true;
					}
				}
			}

			// Se detectamos alguma célula linkada a esse quadro, avisamos o usuário.

			if (isCellLinkInvalid)
				PopUp.DialoguePopUp(
					"Uma ou mais células tiveram seus links afetados"
				);

			// Removemos o quadro

			setBoards(
				boards.filter((board, index) => index !== selectedBoardIndex)
			);

			// Reajustamos o índice pra não apontar para um quadro potencialmente inexistente

			setSelectedBoardIndex(selectedBoardIndex - 1);
		} else {
			// Aviso chique ;)
			PopUp.DialoguePopUp("O primeiro quadro não pode ser deletado!");
		}
	}

	return (
		<div className={styles.headerContainer}>
			<h1 onClick={() => setIsMenuActive(!isMenuActive)}>
				{projectTitle}
			</h1>
			<select
				value={boards[selectedBoardIndex].title}
				onChange={({ target }) => {
					setSelectedBoardIndex(target.selectedIndex);
				}}
			>
				{boards.map((board) => (
					<option key={board.id}>{board.title}</option>
				))}
			</select>
			<button type="button" onClick={NewBoard}>
				Novo
			</button>
			<button type="button" onClick={AreYouSure}>
				Excluir
			</button>
			{isMenuActive && <DropdownMenu />}
		</div>
	);
}

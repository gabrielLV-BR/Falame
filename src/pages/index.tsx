import { ReactChild, ReactChildren, useState } from "react";
import { Button } from "../components/Button";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { PopUp } from "../components/PopUp";
import { PopUpContext } from "../contexts/PopUpContext";
import Cookie from "js-cookie";

import {
	CreateBoard,
	IBoardArray,
	ProjectContext,
} from "../contexts/ProjectContext";
import { GetServerSideProps, GetStaticProps } from "next";

interface IHomeProps {
	title: string;
	boards: IBoardArray;
}

interface IObserver {
	subscribers: Array<(f) => void>;
}

export default function Home(props: IHomeProps) {
	// Project Context

	const [projectTitle, setProjectTitle] = useState(props.title);
	const [boards, setBoards] = useState(props.boards);
	const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
	const [isSaving, setIsSaving] = useState(false);

	// PopUp Context

	const [isPopUpActive, setIsPopUpActive] = useState(false);
	const [popUpChildren, setPopUpChildren] =
		useState<ReactChild | ReactChildren>(null);

	function SetChildren(children: ReactChild | ReactChildren) {
		setPopUpChildren(children);
	}

	function Display() {
		setIsPopUpActive(true);
	}

	function Hide() {
		setIsPopUpActive(false);
	}

	function DialoguePopUp(text, buttonText = "Ok") {
		SetChildren(
			<>
				<p>{text}</p>
				<Button callback={Hide} styleClass="gray">
					{buttonText}
				</Button>
			</>
		);

		Display();
	}

	// Loading and saving
	function saveProject() {
		const project = { title: projectTitle, boards: boards };
		console.log(Cookie.set("savedData", JSON.stringify(project)));
		alert("Salvo!");
	}

	return (
		<div>
			<ProjectContext.Provider
				value={{
					projectTitle,
					setProjectTitle,
					boards,
					setBoards,
					selectedBoardIndex,
					setSelectedBoardIndex,
					saveProject,
					isSaving,
				}}
			>
				<PopUpContext.Provider
					value={{
						children: popUpChildren,
						SetChildren,
						Display,
						Hide,
						DialoguePopUp,
					}}
				>
					{isPopUpActive && <PopUp>{popUpChildren}</PopUp>}
					<Header />
					<Editor />
				</PopUpContext.Provider>
			</ProjectContext.Provider>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const savedData = req.cookies.savedData;
	console.log(savedData);
	let project;
	if (savedData) project = JSON.parse(savedData);
	console.log(project);

	return {
		props: {
			title: project ? project.title : "Novo Projeto",
			boards: project ? project.boards : [CreateBoard()],
		},
	};
};

/*
	//- O sistema de link tá quaaase funcionando;
	//- Inicialização e carregamento pelo GetStaticProps
	//- Salvamento e caching;
	//- Menu de projeto;

	Pelo visto a API do Drive é beeem complicada.
	Vou terminar o projeto primeiro, depois de estudar eu adiciono em outra versão.

	TODO - Por enquanto o salvamento tá só em cookies, mas não deve ser nada difícil usar o Drive API pra isso.
	TODO - Carregar imagens do disco (provavelmente terá que ser depois de implementar a API do Google Drive);
	TODO - Drive API (existe ufa);

	* Implementar:
	- Player de áudio;
	
	* Avançado
	- Gravação de áudio;
	- TTS;

	* E, finalmente
	- Player
	? - Player mobile?

*/

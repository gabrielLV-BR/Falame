export {};

/*
	Esse componente era usado para editar o título de um board, mas agora essa funcionalidade fica em conta
	do PopUp.
*/

// import { MouseEventHandler, useRef, useState } from "react";
// import styles from "./styles.module.scss";

// interface IBoardEditorProps {
// 	children: any;
// 	callback: (newContent: any) => void;
// }

// export function BoardEditor(props: IBoardEditorProps) {
// 	const [isEditing, setIsEditing] = useState(false);

// 	const editableContentContainer = useRef<HTMLDivElement>(null);

// 	function ConfirmChanges() {
// 		setIsEditing(false);
// 		// Feio, mas funciona.
// 		const newContent = editableContentContainer.current.firstChild;

// 		if (
// 			newContent.textContent.length > 100 ||
// 			newContent.textContent.length == 0
// 		) {
// 			alert(
// 				"Texto inválido. O título do quadro deve:\n- Ter pelo menos 1 caractere;\n- Ter menos que 100 caracteres."
// 			);
// 			newContent.textContent = "Título Inválido.";
// 			return;
// 		}
// 		props.callback(newContent.textContent);
// 	}

// 	return (
// 		<div className={isEditing ? styles.container : ""}>
// 			<div
// 				onClick={() => setIsEditing(true)}
// 				contentEditable={isEditing}
// 				ref={editableContentContainer}
// 				suppressContentEditableWarning
// 			>
// 				{props.children}
// 			</div>
// 			{isEditing && (
// 				<button
// 					className={styles.confirmButton}
// 					onClick={ConfirmChanges}
// 				>
// 					Confirmar
// 				</button>
// 			)}
// 		</div>
// 	);
// }

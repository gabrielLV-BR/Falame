import styles from "./styles.module.scss";

export function Button({ children, callback, styleClass = "white" }) {
	return (
		<button
			className={`${styles.button} ${styles[styleClass]}`}
			onClick={callback}
		>
			{children}
		</button>
	);
}

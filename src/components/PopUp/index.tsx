import styles from "./styles.module.scss";

export function PopUp(props) {
	return (
		<div className={styles.container}>
			<section className={styles.popup}>{props.children}</section>
		</div>
	);
}

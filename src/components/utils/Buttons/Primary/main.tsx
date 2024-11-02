import type { Component } from "solid-js";
import styles from "./styles.module.css";
import { GetIcon } from "../icons";

const App: Component<{
	active: boolean;
	text: string;
	icon?: string;
	style?: string;
	onClick?: any;
	class?: string;
}> = (props) => {
	return (
		<button
			class={`${styles.container} ${props.class}`}
			style={props.style ?? ""}
			disabled={!props.active}
			onClick={() => props.onClick()}
		>
			{props.icon && GetIcon(props.icon)}
			{props.text && <div class={styles.button_text}>{props.text}</div>}
		</button>
	);
};

export default App;

// default, hovered, inactive

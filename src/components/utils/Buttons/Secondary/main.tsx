import type { Component, JSX } from "solid-js";
import styles from "./styles.module.css";
import { GetIcon } from "../icons";

const App: Component<{
	active: boolean;
	text: string;
	icon?: string;
	iconComponent?: JSX.Element;
	style?: string;
	class?: string;
	onClick: any;
}> = (props) => {
	return (
		<button
			class={` group transition-colors ease-in ${styles.container} ${props.class}`}
			style={`  ${props.style ?? ""}`}
			disabled={!props.active}
			onClick={() => props.onClick()}
		>
			<div class="button_icon">{props.icon && GetIcon(props.icon)}</div>
			{props.iconComponent && (
				<div class="group-hover:text-white group-disabled:text-black/25">
					{props.iconComponent}
				</div>
			)}
			{props.text && <div class={styles.button_text}>{props.text}</div>}
		</button>
	);
};

export default App;

// default, hovered, inactive

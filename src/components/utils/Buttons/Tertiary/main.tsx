import styles from "./styles.module.css";
import { JSX } from "solid-js";
interface ButtonProps {
	label: string;
	iconPosition?: "left" | "right" | "";
	state?: "default" | "inactive";
	onClick?: () => void;
	icon?: JSX.Element;
}

const main = (props: ButtonProps) => {
	const renderIcon = (): JSX.Element => {
		return props.icon;
	};

	return (
		<button
			class={`${styles.button}`}
			onClick={props.onClick}
			disabled={props.state === "inactive"}
		>
			{props.iconPosition === "left" && renderIcon()}
			<p class={styles.button_text}>{props.label}</p>

			{props.iconPosition === "right" && renderIcon()}
		</button>
	);
};

export default main;

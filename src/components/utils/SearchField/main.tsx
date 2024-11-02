import type { Component } from "solid-js";
import styles from "./styles.module.css";

const App: Component<{
    value: string;
    placeholder: string;
    type: string;
    onInputChange: (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => void;
    style?: string;
}> = (props) => {
    return (
        <div class={styles.input_div} style={props.style ? props.style : ""}>
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.5 6.875C10.5 5.42188 9.70312 4.0625 8.4375 3.3125C7.14844 2.58594 5.57812 2.58594 4.3125 3.3125C3.02344 4.0625 2.25 5.42188 2.25 6.875C2.25 8.35156 3.02344 9.71094 4.3125 10.4609C5.57812 11.1875 7.14844 11.1875 8.4375 10.4609C9.70312 9.71094 10.5 8.35156 10.5 6.875ZM9.53906 10.5781C8.69531 11.3281 7.57031 11.75 6.375 11.75C3.67969 11.75 1.5 9.57031 1.5 6.875C1.5 4.20312 3.67969 2 6.375 2C9.04688 2 11.25 4.20312 11.25 6.875C11.25 8.09375 10.8047 9.19531 10.0781 10.0625L13.3828 13.3672C13.5234 13.5078 13.5234 13.7656 13.3828 13.9062C13.2422 14.0469 12.9844 14.0469 12.8438 13.9062L9.53906 10.5781Z"
                    fill="#111111"
                    fill-opacity="0.5"
                />
            </svg>
            <div class={styles.input_bar_div}>
                <span class={styles.input_span}>
                    <input
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onInput={(e) => props.onInputChange(e)}
                        class={styles.account_name_input}
                    />
                </span>
            </div>
        </div>
    );
};

export default App;

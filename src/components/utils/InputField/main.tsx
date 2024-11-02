import type { Component, Setter, Accessor } from "solid-js";
import styles from "./styles.module.css";

const App: Component<{
    label: string;
    type: string;
    name: string;
    value: string;
    oldState: Accessor<any>;
    updater: Setter<any>;
    formError: Accessor<boolean>;
    disable?: boolean;
    style?: string;
}> = (props) => {
    const onInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        e.preventDefault();
        props.updater({
            ...props.oldState(),
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    return (
        <div class={`${styles.container} ${props.style}`}>
            <input
                class={`${styles.input} ${styles.default_style} ${props.disable && styles.disabled}
                    ${props.formError() && props.value.length < 2 && styles.input_error}
				`}
                name={props.name}
                value={props.value}
                onInput={(e) => onInputChange(e)}
                disabled={props.disable}
                type={props.type}
                required
            />
            {props.formError() && props.value.length < 2 && (
                <div class={styles.error_message}>
                    <div style="text-align: right; color: #DD4944; font-size: 8px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                        This field is a required field
                    </div>
                </div>
            )}
            <label class={styles.label}>{props.label}</label>
        </div>
    );
};

export default App;

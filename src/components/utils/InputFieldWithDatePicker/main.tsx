import type { Component, Accessor } from "solid-js";
import styles from "./styles.module.css";

const App: Component<{
    value: string;
    placeholder: string;
    dateValue: string;
    type: string;
    onInputChange: (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => void;
    readOnly: boolean;
    name: string;
    allow_past_times?: boolean;
    formError: Accessor<boolean>;
    handle_error?: boolean;
}> = (props) => {
    return (
        <div class="w-full">
            <div class="flex bg-white w-full items-center justify-between px-2 py-2">
                <div class="relative flex flex-col h-fit ">
                    <p
                        class={`text-black/50 absolute transition-all whitespace-nowrap -top-2  ${
                            props.value ? "text-[8px]" : "text-sm "
                        }`}
                    >
                        {props.placeholder}
                    </p>
                    <input
                        class={`${styles.input}  ${props.value ? "block" : "hidden"}`}
                        type="text"
                        readOnly={props.readOnly}
                        value={props.value}
                    />
                </div>
                <span class={styles.span}>
                    <input
                        // min={!props.allow_past_times && new Date().toISOString().split("T")[0]}
                        class={styles.date_picker}
                        type="date"
                        name={props.name}
                        value={props.dateValue}
                        id=""
                        placeholder={props.placeholder}
                        onInput={(e) => props.onInputChange(e)}
                    />
                </span>
            </div>
            {props.handle_error && props.formError() && props.value.length < 2 && (
                <div class={styles.error_message}>
                    <div style="text-align: right; color: #DD4944; font-size: 8px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                        This field is a required field
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;

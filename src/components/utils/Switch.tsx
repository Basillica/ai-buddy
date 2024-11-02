import { createSignal, JSX } from "solid-js";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    icon?: JSX.Element;
}

const Switch = (props: SwitchProps) => {
    const [checked, setChecked] = createSignal(props.checked || false);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setChecked(target.checked);
        if (props.onChange) {
            props.onChange(target.checked);
        }
    };

    return (
        <label class="flex items-center cursor-pointer relative">
            <input type="checkbox" class="sr-only" checked={checked()} onChange={handleChange} />
            <div class={`block w-10 h-6 rounded-full ${checked() ? "bg-nightBlue" : "bg-stone-200"}`} />
            <div
                class={` absolute bg-white left-1 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center ${
                    checked() ? "transform translate-x-4 text-nightBlue" : ""
                }`}
            >
                {props.icon}
            </div>
        </label>
    );
};

export default Switch;

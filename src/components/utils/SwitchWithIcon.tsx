import { createSignal, JSX } from "solid-js";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    icon?: JSX.Element;
}

const SwitchWithIcon = (props: SwitchProps) => {
    const [checked, setChecked] = createSignal(props.checked || false);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setChecked(target.checked);
        if (props.onChange) {
            props.onChange(target.checked);
        }
    };

    return (
        <label class="flex flex-row items-center cursor-pointer relative h-full">
            <input type="checkbox" class="sr-only" checked={checked()} onChange={handleChange} />
            <div class={`block w-11 h-6 rounded-lg ${checked() ? "bg-nightBlue" : "bg-stone-200"}`}>
                {/* Small circle when off */}
                <div
                    class={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 ring-2 ring-stone-300 rounded-full transition-opacity duration-300 ${
                        checked() ? "opacity-0" : "opacity-100"
                    }`}
                />
                {/* Small line when on */}
                <div
                    class={`absolute left-3 top-1/2  -translate-y-1/2 w-0.5 h-2 bg-white/50 rounded-full transition-opacity duration-300 ${
                        checked() ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>
            <div
                class={`absolute bg-white left-1.5 h-5 w-5 rounded-lg transition-transform duration-300 ease-in-out flex items-center justify-center ${
                    checked() ? "transform translate-x-5 text-nightBlue" : ""
                }`}
            >
                {props.icon}
            </div>
        </label>
    );
};

export default SwitchWithIcon;

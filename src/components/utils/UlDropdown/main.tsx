import { Component, For, Show } from "solid-js";
interface UIDropdownOption {
    name: string;
    clickHandler?: () => void;
}
interface UIDropdownProps {
    show: boolean;
    dropdownOptions: UIDropdownOption[];
    class?: string;
}
const main: Component<UIDropdownProps> = (props) => {
    return (
        <Show when={props.show}>
            <div
                class={`p-3 flex flex-col gap-y-2 bg-white rounded-lg shadow-md absolute top-14 text-base ${props.class}`}
            >
                <For each={props.dropdownOptions}>
                    {(item) => (
                        <li
                            onClick={item.clickHandler}
                            onKeyDown={item.clickHandler}
                            class={"text-black px-3 py-2 hover:bg-gray/50 flex items-center"}
                        >
                            {item.name}
                        </li>
                    )}
                </For>
            </div>
        </Show>
    );
};

export default main;

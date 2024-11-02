import { createSignal, Component, Accessor, createEffect } from "solid-js";
import "./styles.css";

const DropDownWithSearchBar: Component<{
    title: string;
    values: string[];
    index: number;
    sensorNames: Accessor<string[]>;
    onValueSelect: (index: number, value: string) => void;
}> = (props) => {
    const [searchValue, setSearchValue] = createSignal(props.title);
    const [values, setValues] = createSignal(props.sensorNames());
    const [isOpen, setIsOpen] = createSignal(false);

    createEffect(
        (prev) => {
            if (prev !== props.sensorNames()) setValues(props.sensorNames());
        },
        [props.sensorNames()]
    );

    function toggleDropdown(): void {
        setIsOpen(!isOpen());
    }

    function filterOptions(value: string): void {
        const newV = props.values.filter((option) => {
            return (
                option.toLowerCase().includes(value.toLowerCase()) || option.toLowerCase().includes(value.toLowerCase())
            );
        });
        setValues(newV);
        setIsOpen(true);
    }

    function closeDropdown(): void {
        setIsOpen(false);
    }

    const hancleClick = (
        e: MouseEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        }
    ) => {
        let val = e.currentTarget.textContent!;
        e.preventDefault();
        setSearchValue(val);
        setIsOpen(false);
        props.onValueSelect(props.index, val);
    };

    return (
        <div class="dropdown" onBlur={closeDropdown}>
            <input
                type="text"
                class={isOpen() ? "dropdown-select-selected" : "dropdown-select"}
                placeholder={searchValue()}
                value={props.title === searchValue() ? "" : searchValue()}
                onClick={toggleDropdown}
                onInput={(e: Event) => filterOptions((e.target as HTMLInputElement).value)}
            />
            <div class="dropdown-options" style={{ display: isOpen() ? "block" : "none" }}>
                <div class="col-span-2 h-[2px] bg-gray/10" />
                {values()?.map((option, index) => (
                    <div id={`option-${index}`} class="dropdown-option" onClick={(e) => hancleClick(e)}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropDownWithSearchBar;

import { FaSolidChevronDown } from "solid-icons/fa";
import { FiSearch } from "solid-icons/fi";
import { createSignal, createMemo, For, Show, onCleanup } from "solid-js";
import { Component } from "solid-js";

interface SelectProps {
    options: string[];
    value: string;
    onChange?: (value: string) => void;
    searchable?: boolean;
    optionStyle?: string;
    containerStyle?: string;
    listStyle?: string;
    selectedValueStyle?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

const Select: Component<SelectProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [searchTerm, setSearchTerm] = createSignal("");

    let listRef: HTMLUListElement | undefined;
    let containerRef: HTMLDivElement | undefined;

    const handleToggle = () => {
        const newIsOpen = !isOpen();
        setIsOpen(newIsOpen);
        if (newIsOpen) {
            props.onOpen?.();
            setSearchTerm("");
            // Schedule the scroll after the list is rendered
            setTimeout(scrollToSelectedOption, 0);
        } else {
            props.onClose?.();
        }
    };

    const handleSelectOption = (option: string) => {
        props.onChange?.(option);
        setIsOpen(false);
        setSearchTerm("");
        props.onClose?.();
    };

    const filteredOptions = createMemo(() => {
        if (!props.searchable) return props.options;
        const term = searchTerm().toLowerCase();
        return props.options.filter((option) => option.toLowerCase().includes(term));
    });

    const scrollToSelectedOption = () => {
        if (listRef && props.value) {
            const selectedOption = listRef.querySelector(`[aria-selected="true"]`);
            if (selectedOption) {
                selectedOption.scrollIntoView({ block: "nearest" });
            }
        }
    };

    // Close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef && !containerRef.contains(event.target as Node) && isOpen()) {
            setIsOpen(false);
            props.onClose?.();
        }
    };

    document.addEventListener("click", handleClickOutside);

    onCleanup(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    return (
        <div class="relative w-full h-full" ref={containerRef}>
            <div
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen()}
                class={`w-full p-2 border border-gray rounded-md cursor-pointer flex justify-between items-center ${
                    props.containerStyle || ""
                }`}
                onClick={handleToggle}
            >
                <p class={props.selectedValueStyle}>{props.value || "Select an option"}</p>
                <FaSolidChevronDown class={`w-3 h-3 transform transition-transform ${isOpen() ? "rotate-180" : ""}`} />
            </div>
            {isOpen() && (
                <div class="bg-white z-10 absolute top-12 rounded-md w-full shadow-md min-w-fit">
                    <Show when={props.searchable}>
                        <div class="p-2 border-b">
                            <div class="relative">
                                <FiSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm()}
                                    onInput={(e) => setSearchTerm(e.currentTarget.value)}
                                    class="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nightBlue"
                                />
                            </div>
                        </div>
                    </Show>
                    <ul ref={listRef} role="listbox" class={`overflow-y-auto ${props.listStyle || ""}`}>
                        <For each={filteredOptions()}>
                            {(option) => (
                                <li
                                    role="option"
                                    aria-selected={option === props.value}
                                    class={`p-2 cursor-pointer hover:bg-stone-100 ${
                                        option === props.value ? "bg-stone-100" : ""
                                    } ${props.optionStyle || ""}`}
                                    onClick={() => handleSelectOption(option)}
                                >
                                    {option}
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Select;

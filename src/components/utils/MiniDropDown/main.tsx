import type { Component, Setter } from 'solid-js'
import { For } from 'solid-js'
import styles from './styles.module.css'


const App: Component<{
    items: string[], triggerDropdown: Setter<boolean>,
    setCurrentItem: Setter<boolean>
}> = (props) => {

    const handleClick = (e: MouseEvent & {
        currentTarget: HTMLLIElement;
        target: Element;
    }) => {
        e.preventDefault()
        const v = e.currentTarget.innerHTML
        var value = v.substring(
            v.indexOf(">") + 1, 
            v.lastIndexOf("<")
        )
        if (value === "Active"){
            props.setCurrentItem(true)
        }else{
            props.setCurrentItem(false)
        }
        props.triggerDropdown(false)
    }

    return (
        <ul class={styles.container}>
            <For each={props.items}>{(item, i) =>
                <li class={styles.item_div} onClick={(e) => handleClick(e)}>
                    <span class={styles.text_style}>{item}</span>
                </li>
            }</For>
        </ul>
    )
}

export default App;
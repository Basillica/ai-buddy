import { Component } from "solid-js";
import styles from "./styles.module.css";

const App: Component = (props) => {
    return (
        <>
            <div class={styles.main_area}>
                <span class={styles.span_text}>Expert Account Software</span>
                <div class={styles.container}>
                    <span class={styles.span_text}>License</span>
                    <a
                        class="w-fit text-sm text-white "
                        style={"text-decoration: none;"}
                        target="_blank"
                        href={"https://google.com"}
                    >
                        <span class={styles.span_text}>Privacy</span>
                    </a>
                    <a
                        class="w-fit text-sm text-white "
                        target="_blank"
                        href={"https://www.google.com"}
                        style={"text-decoration: none;"}
                    >
                        <span class={styles.span_text}>LegalNotice</span>
                    </a>
                    <a
                        href="mailto:anthonyezeabasili@gmail.com"
                        class="text-white text-sm hover:underline"
                        style={"text-decoration: none;"}
                    >
                        <span class={styles.span_text}>Contact</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default App;

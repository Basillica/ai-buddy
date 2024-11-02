import { Component } from "solid-js";
import "./styles.css";

const App: Component = () => {
    const drop = (
        e: DragEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        }
    ) => {
        e.preventDefault();
        const data = e.dataTransfer!.getData("text");
        const el = document.getElementById(data);
        e.target.appendChild(el!);
    };

    const drag = (
        e: DragEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        }
    ) => {
        if (e.dataTransfer) e.dataTransfer.setData("text", e.target.id);
    };

    const allowDrop = (
        e: DragEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        }
    ) => {
        e.preventDefault();
    };

    return (
        <div style="width: 100%; min-height: 100%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 28px; display: inline-flex">
            <div class="container">
                <div class="container">
                    {[...Array(16)].map((_, index) => (
                        <div class="item">
                            {[...Array(10)].map((_, innerIndex) => (
                                <div
                                    id={`div${index + 1}-${innerIndex + 1}`}
                                    ondrop={drop}
                                    ondragover={allowDrop}
                                    style={{
                                        width: "90px",
                                        height: "60px",
                                        padding: "1px",
                                        border: "1px dotted #aaaaaa",
                                        margin: "5px",
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <img id="drag1" src="img_logo.gif" draggable="true" onDragStart={drag} width="89" height="60"></img>
        </div>
    );
};

export default App;

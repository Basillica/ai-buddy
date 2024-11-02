import { Component, createSignal } from "solid-js";
import { FaBrandsSearchengin, FaSolidArrowDownAZ, FaSolidChevronRight } from "solid-icons/fa";
import { AiFillCheckCircle } from "solid-icons/ai";
import { BreadCrumb } from "../../../components/utils";
// import { pipeline } from "@xenova/transformers";
import { pipeline } from "@huggingface/transformers";
import { TableAPIHandler } from "../../../supabase";

import * as pdfjsLib from "pdfjs-dist";
// import { invoke } from "@tauri-apps/api/tauri";

const App: Component = () => {
    const [files, setFiles] = createSignal<FileList>();
    // const [greetMsg, setGreetMsg] = createSignal("");
    // const [name, setName] = createSignal("");

    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name: name() }));
    // }

    // onMount(async () => {
    //     await insertEmbedding();
    // });

    const insertEmbedding = async () => {
        const title = "First post!";
        const body = "Hello world!";
        // const generateEmbedding = await pipeline("feature-extraction", "Supabase/gte-small");
        // let pipe = await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
        // let out = await pipe("I love transformers!");
        // console.log(out, "the frigging out");
        // https://huggingface.co/docs/transformers.js/en/index
        const pipe = await pipeline("feature-extraction");
        const output = await pipe(body, {
            pooling: "mean",
            normalize: true,
        });
        const embedding = Array.from(output.data);
        const api = new TableAPIHandler("vectors");
        const res = await api.insertRows([
            {
                title,
                body,
                embedding,
            },
        ]);
        if (res) console.log(res);
    };

    return (
        <div style="width: 100%; min-height: 100%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 28px; display: inline-flex">
            <div style="align-self: stretch; height: 65px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <div style="align-self: stretch; height: 40px; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                    <div style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                            <BreadCrumb
                                crumbs={[
                                    {
                                        handler: () => console.log(),
                                        text: "User settings",
                                        default: true,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                    <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: center; align-items: flex-start; gap: 12px; display: inline-flex">
                        <div style="justify-content: flex-start; align-items: flex-end; gap: 8px; display: inline-flex">
                            <div style="text-align: center; color: black; font-size: 24px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                Study History
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex;">
                <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
                    <div style="width: 396px; padding: 8px; border-radius: 4px"></div>
                    <div style="width: 407px; padding-left: 16px; padding-right: 16px; padding-top: 8px; padding-bottom: 8px; background: white; border-radius: 4px; border: 1px rgba(204, 204, 204, 0.50) solid; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                        <div style="border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                <FaBrandsSearchengin color="grey" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                    <div style="align-self: stretch; padding-left: 8px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex">
                        <div style="width: 140px; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Study ID
                                </div>
                                <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                    <FaSolidArrowDownAZ />
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Status
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Plan
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Catergory
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Progres
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; height: 28px; padding-left: 4px; padding-right: 4px; padding-top: 6px; padding-bottom: 6px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                    Creation Date
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1 1 0; align-self: stretch"></div>
                    </div>
                    <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                        <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.50)"></div>
                        <div style="align-self: stretch; height: 40px; padding-left: 8px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                            <div style="flex: 1 1 0; height: 35px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                                <div style="width: 140px; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            10281
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; height: 35px; padding-left: 4px; padding-right: 4px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                                    <div style="width: 10px; height: 10px; justify-content: center; align-items: center; display: flex">
                                        <AiFillCheckCircle color="green" />
                                    </div>
                                    <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                        Unread
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                                    <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            A3021
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            IIOT
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
                                    <div style="height: 18px; padding-left: 8px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px; background: rgba(250, 170, 0, 0.10); border-radius: 4px; overflow: hidden; justify-content: center; align-items: center; gap: 4px; display: inline-flex">
                                        <div style="text-align: center; color: #E65E0A; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            87%
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            DD/MM/YY - HH:MM:SS
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 1 1 0; align-self: stretch; justify-content: flex-start; align-items: center; gap: 20px; display: flex">
                                    <div style="padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                                        <div style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            View Plan
                                        </div>
                                        <div style="width: 12px; justify-content: center; align-items: center; display: flex">
                                            <FaSolidChevronRight color="blue" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

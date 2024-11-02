import { Component, createResource, createSignal, For, Switch, Match, Setter, Accessor } from "solid-js";
import { BreadCrumb, SearchField, SecondaryButton, AnimationRenderer } from "../../../components/utils";
import { BucketAPIHandler, UserAPIHandler } from "../../../supabase";
import { BsThreeDotsVertical } from "solid-icons/bs";
import { StudyPlan } from "../../../models";
import { useLocation, useNavigate } from "@solidjs/router";
import animationData from "../../../assets/animation/loading.json";
import styles from "./styles.module.css";
import { FileObject } from "../../../supabase/bucket";
import pdf_svg from "../../../assets/pdf.svg";
import png_svg from "../../../assets/png.svg";
import { PdfViewer } from "./pdf_viewer";

interface LocationState {
    plan: StudyPlan;
}

const App: Component = () => {
    const navigate = useNavigate();
    const { state } = useLocation<LocationState>();
    const fetchDocuments = async () => {
        const api = new UserAPIHandler();
        const res = await api.getSession();
        if (!res?.user) {
            navigate(-1);
        }
        const url = `${res?.user.id}/${state?.plan?.category}`;
        const bucketApi = new BucketAPIHandler();
        const bucket = await bucketApi.getAllFilesInBucket("documents", url);
        if (bucket) {
            setDocuments(bucket);
            return bucket;
        }
        return [];
    };
    const [documents, setDocuments] = createSignal<FileObject[]>([]);
    const [showDocument, setShowDocument] = createSignal<boolean>(false);
    const [currDoc, setCurrDoc] = createSignal<FileObject>();
    const [isLoading, setIsLoading] = createSignal(false);
    const [latestDocuments] = createResource(fetchDocuments);

    const handleShowDocument = (doc: FileObject) => {
        if (doc.metadata.mimetype !== "application/pdf") {
            return;
        }
        setCurrDoc(doc);
        setShowDocument(true);
    };

    const onInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const searchQuery = e.currentTarget.value.toLowerCase();
        if (e.currentTarget.value === "") {
            setDocuments(latestDocuments()!);
        }
        setDocuments(latestDocuments()!.filter((el: FileObject) => el.name.toLowerCase().includes(searchQuery)));
    };

    const handleFiles = async (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            setIsLoading(true);
            const userApi = new UserAPIHandler();
            const res = await userApi.getSession();
            if (!res?.user) {
                navigate(-1);
            }
            const url = `${res?.user.id}/${state?.plan?.category}`;

            const api = new BucketAPIHandler();
            const files = e.target.files!;
            for (const file of files) {
                if (file.type === "application/pdf") {
                    const res = await api.uploadFile("documents", `${url}/${file.name}`, file);
                    console.log(res, "----------");
                }
            }
            fetchDocuments();
            setIsLoading(false);
        }
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
                                        handler: () => navigate(-1),
                                        text: "Home",
                                        default: false,
                                    },
                                    {
                                        handler: () => console.log(),
                                        text: "Study documents",
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
                                {state?.plan?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!showDocument() && (
                <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex;">
                    <div style="width: 396px; padding: 8px; border-radius: 4px"></div>
                    <SearchField
                        value={""}
                        placeholder={"search documents"}
                        type="text"
                        onInputChange={(e) => onInputChange(e)}
                    />
                </div>
            )}

            {isLoading() ? (
                <div style="padding-top: 10vh; margin-left: 30vw; width: 4vw; height: 4vh; left: 50vw">
                    <AnimationRenderer animationData={animationData} />
                </div>
            ) : (
                <Switch
                    fallback={
                        <div style={"display: flex; flex-wrap: wrap;"}>
                            <For each={documents()} fallback={<div>There are currently no documents created</div>}>
                                {(item, index) => (
                                    <div class={styles.card_container} id={`item_${index()}`}>
                                        <div class={styles.card}>
                                            <OptionComponent
                                                item={item}
                                                setCurrDoc={setCurrDoc}
                                                id={index}
                                                handleShowDocument={handleShowDocument}
                                                setIsLoading={setIsLoading}
                                                category={state?.plan?.category!}
                                                setDocuments={setDocuments}
                                                documents={documents}
                                            />
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    }
                >
                    <Match when={showDocument()}>
                        <PdfViewer
                            currentDocument={currDoc}
                            category={state?.plan?.category!}
                            setShowDocument={setShowDocument}
                        />
                    </Match>
                </Switch>
            )}

            {!showDocument() && (
                <div
                    style={
                        "display: flex; column-gap: 0.5rem; justify-content: center; align-self: stretch; padding-top: 10px"
                    }
                >
                    <SecondaryButton active onClick={() => navigate(-1)} text={"Back"} />
                    <div style="width: 396px; padding: 8px; border-radius: 4px"></div>
                    <label for="file-upload" class={`${styles.file_upload} ${styles.button_container}`}>
                        Upload file
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="application/pdf"
                        style={"display: none;"}
                        onInput={(e) => handleFiles(e)}
                    />
                </div>
            )}
        </div>
    );
};

export default App;

const OptionComponent: Component<{
    item: FileObject;
    setCurrDoc: Setter<FileObject | undefined>;
    id: Accessor<number>;
    handleShowDocument: (doc: FileObject) => void;
    setIsLoading: Setter<boolean>;
    setDocuments: Setter<FileObject[]>;
    documents: Accessor<FileObject[]>;
    category: string;
}> = (props) => {
    const [showOptions, setOptions] = createSignal(false);
    const handleOptions = (option: boolean, item: FileObject) => {
        props.setCurrDoc(item);
        setOptions(option);
    };

    const handleDelete = async () => {
        props.setIsLoading(true);
        const userApi = new UserAPIHandler();
        const res = await userApi.getSession();
        if (!res?.user) {
            return;
        }
        const url = `${res?.user.id}/${props.category}/${props.item.name}`;
        const api = new BucketAPIHandler();
        const result = await api.deleteFile("documents", [url]);
        if (result) {
            console.log(result);
            props.setDocuments([...props.documents().filter((el) => el.name !== props.item.name)]);
        }
        props.setIsLoading(false);
    };

    return (
        <div class={styles.container}>
            <h4 style={"height: 18px; display: flex; align-self: stretch; justify-content: space-between;"}>
                <b>{props.item.id.substring(0, 8)}</b>
                <BsThreeDotsVertical
                    color="grey"
                    class={styles.options}
                    onClick={() => handleOptions(!showOptions(), props.item)}
                />
                {showOptions() && (
                    <div class={styles.option_overlay}>
                        <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                            <button class={styles.menu_button} onClick={handleDelete}>
                                Delete
                            </button>
                            <button class={styles.menu_button}>Replace</button>
                            <button class={styles.menu_button}>More</button>
                        </div>
                    </div>
                )}
            </h4>
            <p style={"word-wrap: break-word; height: 60px;"}>{props.item.name}</p>
            <div class={styles.pdf_image} onClick={() => props.handleShowDocument(props.item)}>
                {props.item.metadata.mimetype === "application/pdf" ? (
                    <img src={pdf_svg} alt="Avatar" style="width:100%" />
                ) : (
                    <img src={png_svg} alt="Avatar" style="width:100%" />
                )}
            </div>
        </div>
    );
};

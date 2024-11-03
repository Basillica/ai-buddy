import { Component, createResource, createSignal, For, onMount } from "solid-js";
import { FaSolidArrowDownAZ } from "solid-icons/fa";
import { AnimationRenderer, BreadCrumb, PrimaryButton, SearchField } from "../../../components/utils";
import animationData from "../../../assets/animation/loading.json";
// import { pipeline } from "@huggingface/transformers";
import { TableAPIHandler, UserAPIHandler } from "../../../supabase";
import { PlanRow } from "../../../components/plans";
import { StudyPlan } from "../../../models";
import { NewPlan } from "./NewPlan";
import { useAppContext } from "../../../store";
import { User } from "@supabase/supabase-js";

const App: Component = () => {
    const {
        userCtx: { setAuthUser, authUser },
        planCtx: { readingPlan, setReadingPlan },
    } = useAppContext();

    const fetchPlans = async (user: User) => {
        const api = new TableAPIHandler("plans");
        const res = await api.getForCondition("creator", user.id);
        if (res) {
            setStudyPlans(res);
            setReadingPlan(res);
        }
        return res;
    };

    // const insertEmbedding = async () => {
    //     const title = "First post!";
    //     const body = "Hello world!";
    //     // const generateEmbedding = await pipeline("feature-extraction", "Supabase/gte-small");
    //     // let pipe = await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
    //     // let out = await pipe("I love transformers!");
    //     // console.log(out, "the frigging out");
    //     // https://huggingface.co/docs/transformers.js/en/index
    //     const pipe = await pipeline("feature-extraction");
    //     const output = await pipe(body, {
    //         pooling: "mean",
    //         normalize: true,
    //     });
    //     const embedding = Array.from(output.data);
    //     const api = new TableAPIHandler("vectors");
    //     const res = await api.insertRows([
    //         {
    //             title,
    //             body,
    //             embedding,
    //         },
    //     ]);
    //     if (res) console.log(res);
    // };

    const [userPlans] = createResource(authUser, fetchPlans);
    const [studyPlans, setStudyPlans] = createSignal<StudyPlan[]>(readingPlan()!);
    const [newPlan, setNewPlan] = createSignal<boolean>(false);

    const onInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const searchQuery = e.currentTarget.value.toLowerCase();
        if (e.currentTarget.value === "") {
            setStudyPlans(userPlans()!);
        }
        setStudyPlans(
            userPlans()!.filter(
                (el: StudyPlan) =>
                    el.name.toLowerCase().includes(searchQuery) || el.category.toLowerCase().includes(searchQuery)
            )
        );
    };

    onMount(async () => {
        if (authUser()) return;
        const api = new UserAPIHandler();
        const user = await api.getUser();
        if (user) setAuthUser(user);
    });

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
                                        text: "Study Plans",
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
                                Study Plans
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {newPlan() && (
                <div
                    style={`display: flex; 
                position: fixed; 
                top: 0; 
                left: 0; 
                z-index: 50; 
                justify-content: center; 
                align-items: center; 
                width: 100%; 
                height: 100%;
                background-color: rgba(236, 236, 236, 0.5);
                `}
                >
                    <NewPlan setNewPlan={setNewPlan} studyPlans={studyPlans} setStudyPlans={setStudyPlans} />
                </div>
            )}

            <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex;">
                <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
                    <PrimaryButton active onClick={() => setNewPlan(true)} text={"Create New Plan"} />
                    <div style="width: 396px; padding: 8px; border-radius: 4px"></div>
                    <SearchField
                        value={""}
                        placeholder={"search plans"}
                        type="text"
                        onInputChange={(e) => onInputChange(e)}
                    />
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

                    {userPlans.loading ? (
                        <div style="padding-top: 10vh; margin-left: 30vw; width: 4vw; height: 4vh; left: 50vw">
                            <AnimationRenderer animationData={animationData} />
                        </div>
                    ) : (
                        <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.50)"></div>
                            <For each={studyPlans()}>{(plan) => <PlanRow plan={plan} />}</For>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;

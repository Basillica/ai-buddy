import { Component, createSignal, Setter, Accessor } from "solid-js";
import { InputField, PrimaryButton, SecondaryButton } from "../../../components/utils";
import { TableAPIHandler } from "../../../supabase";
import { StudyPlan } from "../../../models";
import { useAppContext } from "../../../store";

export const NewPlan: Component<{
    setNewPlan: Setter<boolean>;
    setStudyPlans: Setter<StudyPlan[]>;
    studyPlans: Accessor<StudyPlan[]>;
}> = (props) => {
    const {
        userCtx: { authUser },
        planCtx: { setReadingPlan },
    } = useAppContext();

    const [formError, setFormError] = createSignal<boolean>(false);
    const [formValues, setFormValues] = createSignal<{
        name: string;
        category: string;
    }>({
        name: "",
        category: "",
    });

    const handleSave = async () => {
        if (formValues().category === "" || formValues().name === "") {
            setFormError(true);
        }
        console.log(formValues());
        const api = new TableAPIHandler("plans");
        const res = await api.insertRows([
            {
                name: formValues().name,
                category: formValues().category,
                progres: 0,
                creator: authUser()?.id,
            },
        ]);
        if (res) {
            props.setStudyPlans([...props.studyPlans(), ...res]);
            setReadingPlan([...props.studyPlans(), ...res]);
            props.setNewPlan(false);
        }
    };

    return (
        <div style="width: 600px; height: 397px; padding: 12px; background: white; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.10); border-radius: 16px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
            <div style="align-self: stretch; height: 41px; padding-top: 12px; padding-bottom: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 16px; display: flex">
                <div style="text-align: center; color: black; font-size: 24px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                    Create New Plan
                </div>
            </div>
            <div style="align-self: stretch; height: 208px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex;">
                <div style="align-self: stretch; padding: 12px; background: rgba(204, 204, 204, 0.10); border-radius: 8px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                    <div style="text-align: center; color: black; font-size: 16px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                        Plan Details
                    </div>
                    <div style="flex: 1 1 0; align-items: flex-start; display: inline-flex; width: 97%; padding: 5px; height: 500px;">
                        <div style="width: 45%;">
                            <InputField
                                label="Plan Name"
                                name="name"
                                type="text"
                                value={formValues().name}
                                oldState={formValues}
                                updater={setFormValues}
                                formError={formError}
                            />
                        </div>
                        <div style="width: 20px; padding: 8px; border-radius: 4px"></div>
                        <div style="width: 45%;">
                            <InputField
                                label="Plan Category"
                                name="category"
                                type="text"
                                value={formValues().category}
                                oldState={formValues}
                                updater={setFormValues}
                                formError={formError}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={
                    "display: flex; column-gap: 0.5rem; justify-content: center; align-self: stretch; padding-top: 10px"
                }
            >
                <SecondaryButton active onClick={() => props.setNewPlan(false)} text={"Cancel"} />
                <PrimaryButton active onClick={handleSave} text={"Save"} />
            </div>
        </div>
    );
};

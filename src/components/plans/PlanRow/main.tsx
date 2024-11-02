import { Component } from "solid-js";
import { FaSolidChevronRight } from "solid-icons/fa";
import { AiFillCheckCircle } from "solid-icons/ai";
import { StudyPlan } from "../../../models";
import styles from "./styles.module.css";
import { useNavigate } from "@solidjs/router";

const App: Component<{
    plan: StudyPlan;
}> = (props) => {
    const navigate = useNavigate();
    function isPlanInactive(stamp: string): boolean {
        // Parse the timestamp string into a Date object
        const timestamp = new Date(stamp);
        // Get the current time
        const now = new Date();
        // Calculate the time difference in milliseconds
        const timeDiffMillis = now.getTime() - timestamp.getTime();
        // Convert milliseconds to hours
        const timeDiffHours = timeDiffMillis / (1000 * 60 * 60);
        // Check if the difference is greater than or equal to 24 hours
        return timeDiffHours >= 24;
    }

    const handleClick = () => {
        navigate(props.plan.id, {
            state: { plan: props.plan },
        });
    };

    return (
        <div style="align-self: stretch; height: 40px; padding-left: 8px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
            <div style="flex: 1 1 0; height: 35px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                <div style="width: 140px; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            {props.plan.id.substring(0, 8)}
                        </div>
                    </div>
                </div>
                <div style="flex: 1 1 0; height: 35px; padding-left: 4px; padding-right: 4px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                    {isPlanInactive(props.plan.updated_at) ? (
                        <>
                            <div style="width: 10px; height: 10px; justify-content: center; align-items: center; display: flex">
                                <AiFillCheckCircle color="grey" />
                            </div>
                            <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Inactive
                            </div>
                        </>
                    ) : (
                        <>
                            <div style="width: 10px; height: 10px; justify-content: center; align-items: center; display: flex">
                                <AiFillCheckCircle color="green" />
                            </div>
                            <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Active
                            </div>
                        </>
                    )}
                </div>
                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                    <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                        <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            {props.plan.name}
                        </div>
                    </div>
                </div>
                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            {props.plan.category}
                        </div>
                    </div>
                </div>
                <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
                    <div style="height: 18px; padding-left: 8px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px; background: rgba(250, 170, 0, 0.10); border-radius: 4px; overflow: hidden; justify-content: center; align-items: center; gap: 4px; display: inline-flex">
                        <div style="text-align: center; color: #E65E0A; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            {props.plan.progres}%
                        </div>
                    </div>
                </div>
                <div style="flex: 1 1 0; padding-left: 4px; padding-right: 4px; padding-top: 12px; padding-bottom: 12px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                        <div style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            {props.plan.created_at}
                        </div>
                    </div>
                </div>
                <div style="flex: 1 1 0; align-self: stretch; justify-content: flex-start; align-items: center; gap: 20px; display: flex">
                    <button class={styles.nav_button} onClick={handleClick}>
                        <div style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            View Plan
                        </div>
                        <div style="width: 12px; justify-content: center; align-items: center; display: flex">
                            <FaSolidChevronRight color="blue" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;

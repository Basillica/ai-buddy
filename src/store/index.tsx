import { createContext, useContext, JSX, createSignal, createEffect, onCleanup } from "solid-js";
import { ReadingPlanContextType } from "./plans";
import { UserContextType } from "./user";
import { Notification, StudyPlan } from "../models";
import { UtilsContextType } from "./utils";
import { User } from "@supabase/supabase-js";

interface AppBaseContextType {
    planCtx: ReadingPlanContextType;
    userCtx: UserContextType;
    utilsCtx: UtilsContextType;
}

const BaseAppContext = createContext<AppBaseContextType | null>(null);

export const BaseAppProvider = (props: { children: JSX.Element }) => {
    const [authUser, setAuthUser] = createSignal<User>();
    const [notify, setNotify] = createSignal<Notification>({
        message_type: "",
        message: "",
        has_message: false,
    });
    const [readingPlan, setReadingPlan] = createSignal<StudyPlan[]>();

    createEffect(() => {
        if (notify().has_message) {
            const timer = setInterval(
                () =>
                    setNotify({
                        message_type: "",
                        message: "",
                        has_message: false,
                    }),
                5000
            );
            onCleanup(() => clearInterval(timer));
        }
    }, [notify()]);

    return (
        <BaseAppContext.Provider
            value={{
                planCtx: {
                    readingPlan,
                    setReadingPlan,
                },
                userCtx: {
                    authUser,
                    setAuthUser,
                },
                utilsCtx: {
                    notify,
                    setNotify,
                },
            }}
        >
            {props.children}
        </BaseAppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(BaseAppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a BaseAppProvider");
    }
    return context;
};

import { createContext, useContext, JSX, createSignal, createEffect, onCleanup } from "solid-js";
import { AccountContextType } from "./account";
import { UserContextType } from "./user";
import { Notification } from "../models";
import { UtilsContextType } from "./utils";

interface AppBaseContextType {
    accountCtx: AccountContextType;
    userCtx: UserContextType;
    utilsCtx: UtilsContextType;
}

const BaseAppContext = createContext<AppBaseContextType | null>(null);

export const BaseAppProvider = (props: { children: JSX.Element }) => {
    const [user, setUser] = createSignal("");
    const [notify, setNotify] = createSignal<Notification>({
        message_type: "",
        message: "",
        has_message: false,
    });
    const [account, setAccount] = createSignal("");

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
                accountCtx: {
                    account,
                    setAccount,
                },
                userCtx: {
                    user,
                    setUser,
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

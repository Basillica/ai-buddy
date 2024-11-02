import { useNavigate } from "@solidjs/router";
import { Component, createSignal, Accessor, Setter, Switch, Match, createEffect, onCleanup, onMount } from "solid-js";
import { Footer } from "../../utils";
import logo from "../../../assets/logo.svg";
import { InputField } from "../../../components/utils";
import styles from "./styles.module.css";
import { ErrorNotification, SuccessNotification } from "../../../components/Notifications";
import { UserAPIHandler } from "../../../supabase";

type Notification = {
    message_type: "SUCCESS" | "ERROR" | "";
    message: string;
    has_message: boolean;
};

const App: Component = () => {
    const userApi = new UserAPIHandler();
    const navigate = useNavigate();
    const [formError, setFormError] = createSignal<boolean>(false);
    const [notify, setNotify] = createSignal<Notification>({
        message_type: "",
        message: "",
        has_message: false,
    });
    const [formValues, setFormValues] = createSignal<{
        username: string;
        password: string;
        newPassword: string;
    }>({
        username: "",
        password: "",
        newPassword: "",
    });

    const regex = /[^A-Za-z0-9]/;
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = (email: string) => {
        return String(email).toLowerCase().match(emailRegex);
    };

    onMount(async () => {
        const user = await userApi.getUser();
        if (user) {
            navigate("/home");
            console.log(user);
        }
        console.log(user, "the frigging user");
    });

    const signIn = async () => {
        if (formValues().username.length === 0) {
            setNotify({
                message_type: "ERROR",
                message: "please provide a valid email address",
                has_message: true,
            });
            return;
        }

        if (!validateEmail(formValues().username)) {
            setNotify({
                message_type: "ERROR",
                message: "the provided email address is wrong",
                has_message: true,
            });
            return;
        }
        if (!regex.test(formValues().password)) {
            setNotify({
                message_type: "ERROR",
                message: "the passord format is wrong",
                has_message: true,
            });
            return;
        }

        const res = await userApi.signIn(formValues().username, formValues().password);
        if (res) {
            console.log(res.user, "----------");
            navigate("/home");
        }
    };

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
        <div style="width: 98vw; height: 95vh; display: flex; flex-direction: column;-ms-overflow-style: none; scrollbar-width: none; overflow-x: clip;">
            {notify().has_message && (
                <div style="position: absolute; display: flex; overflow-wrap: break-word; width: 99%; height: 30px; border-radius: 30px; margin-top: 20px">
                    <Switch>
                        <Match when={notify().message_type === "ERROR"}>
                            <ErrorNotification message={notify().message} />
                        </Match>
                        <Match when={notify().message_type === "SUCCESS"}>
                            <SuccessNotification message={notify().message} />
                        </Match>
                    </Switch>
                </div>
            )}
            {/* <Navbar /> */}
            <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                <div style="align-self: stretch; flex: 1 1 0; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                    <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                        <div style="padding: 28px; background: rgba(204, 204, 204, 0.20); border-radius: 16px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 40px; display: flex">
                            <div style="width: 60px; height: 66px; position: relative">
                                <img src={logo} />
                            </div>
                            <div style="align-self: stretch; height: 121px; padding-left: 16px; padding-right: 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 16px; display: flex">
                                <div style="align-self: stretch; text-align: center; color: #005AB4; font-size: 36px; font-family: Segoe UI; font-weight: 600; line-height: 46.80px; word-wrap: break-word">
                                    Welcome to
                                    <br />
                                    ExpertAccountant®
                                </div>
                                <div style="align-self: stretch; text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                    Simplifying accounting
                                    <br />
                                    for performant organisations
                                </div>
                            </div>
                            <div style="align-self: stretch; height: 192px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex; ">
                                <SignInComponent
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                    formError={formError}
                                />

                                <div style="align-self: stretch; justify-content: flex-end; align-items: center; gap: 16px; display: inline-flex; margin-top: 40px;">
                                    <button class={styles.forgot_password}>
                                        <div style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            Forgot password?
                                        </div>
                                    </button>
                                    <button class={styles.sign_in} onClick={() => signIn()}>
                                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                            <svg
                                                width="13"
                                                height="13"
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.75 6.5C11.75 3.61719 9.38281 1.25 6.5 1.25C6.28906 1.25 6.125 1.08594 6.125 0.875C6.125 0.6875 6.28906 0.5 6.5 0.5C9.80469 0.5 12.5 3.19531 12.5 6.5C12.5 9.82812 9.80469 12.5 6.5 12.5C6.28906 12.5 6.125 12.3359 6.125 12.125C6.125 11.9375 6.28906 11.75 6.5 11.75C9.38281 11.75 11.75 9.40625 11.75 6.5ZM5.23438 3.21875L8.60938 6.21875C8.70312 6.28906 8.75 6.40625 8.75 6.5C8.75 6.61719 8.70312 6.71094 8.60938 6.78125L5.23438 9.78125C5.09375 9.92188 4.83594 9.92188 4.71875 9.75781C4.57812 9.61719 4.57812 9.35938 4.74219 9.24219L7.36719 6.875H0.875C0.664062 6.875 0.5 6.71094 0.5 6.5C0.5 6.3125 0.664062 6.125 0.875 6.125H7.36719L4.74219 3.78125C4.57812 3.66406 4.57812 3.40625 4.71875 3.26562C4.85938 3.10156 5.09375 3.10156 5.23438 3.24219V3.21875Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <div style="text-align: center; color: white; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            Sign in
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button class={styles.request_account} style={"margin-top: 20px"}>
                            <div style="width: 12px; justify-content: center; align-items: center; display: flex">
                                <svg
                                    width="16"
                                    height="13"
                                    viewBox="0 0 16 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.75 1.25C4.92969 1.25 4.20312 1.69531 3.78125 2.375C3.38281 3.07812 3.38281 3.94531 3.78125 4.625C4.20312 5.32812 4.92969 5.75 5.75 5.75C6.54688 5.75 7.27344 5.32812 7.69531 4.625C8.09375 3.94531 8.09375 3.07812 7.69531 2.375C7.27344 1.69531 6.54688 1.25 5.75 1.25ZM5.75 6.5C4.67188 6.5 3.6875 5.9375 3.14844 5C2.60938 4.08594 2.60938 2.9375 3.14844 2C3.6875 1.08594 4.67188 0.5 5.75 0.5C6.80469 0.5 7.78906 1.08594 8.32812 2C8.86719 2.9375 8.86719 4.08594 8.32812 5C7.78906 5.9375 6.80469 6.5 5.75 6.5ZM4.67188 8.375C2.79688 8.375 1.27344 9.89844 1.25 11.75H10.25C10.2031 9.89844 8.67969 8.375 6.80469 8.375H4.67188ZM4.67188 7.625H6.80469C9.125 7.625 11 9.5 11 11.8203C11 12.1953 10.6719 12.5 10.2969 12.5H1.17969C0.804688 12.5 0.5 12.1953 0.5 11.8203C0.5 9.5 2.35156 7.625 4.67188 7.625ZM12.5 7.625V5.75H10.625C10.4141 5.75 10.25 5.58594 10.25 5.375C10.25 5.1875 10.4141 5 10.625 5H12.5V3.125C12.5 2.9375 12.6641 2.75 12.875 2.75C13.0625 2.75 13.25 2.9375 13.25 3.125V5H15.125C15.3125 5 15.5 5.1875 15.5 5.375C15.5 5.58594 15.3125 5.75 15.125 5.75H13.25V7.625C13.25 7.83594 13.0625 8 12.875 8C12.6641 8 12.5 7.83594 12.5 7.625Z"
                                        fill="black"
                                        fill-opacity="0.8"
                                    />
                                </svg>
                            </div>
                            <span style="text-align: center; color: rgba(0, 0, 0, 0.80); font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Request your account
                            </span>
                        </button>
                    </div>
                    <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex; margin-top: 20px">
                        <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                            <div style="align-self: stretch; flex: 1 1 0; padding: 20px; background: white; border-radius: 8px; border: 1px rgba(204, 204, 204, 0.50) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
                                <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex">
                                    <div style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; gap: 16px; display: inline-flex">
                                        <a style="align-self: stretch; color: black; font-size: 20px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                            Your perfered option for smarter accounting
                                        </a>
                                        <div style="align-self: stretch; height: 139px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: flex">
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                General ledger for financial transactions
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Efficiently manage invoices and payments
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Process payroll according to local compliance laws
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Financial reporting and budgeting etc
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <img
                                        style="width: 382px; height: 240px; border-radius: 4px"
                                        src="https://via.placeholder.com/382x240"
                                    />
                                </div>
                            </div>
                            {/* learn more */}
                            <div style="align-self: stretch; height: 156px; padding: 20px; background: white; border-radius: 8px; border: 1px rgba(204, 204, 204, 0.50) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                                <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex">
                                    <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: inline-flex">
                                        <div style="align-self: stretch; color: black; font-size: 20px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                                            Learn more about XpatAccounting
                                        </div>
                                        <div style="align-self: stretch; height: 73px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                                            <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                                                <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                    Frequently Asked Questions
                                                </div>
                                                <div style="padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex;">
                                                    <a
                                                        href="www.fixagoapp.com"
                                                        style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word; text-decoration: none;"
                                                        target="_blank"
                                                    >
                                                        Learn more
                                                    </a>
                                                    <div style="width: 12px; justify-content: center; align-items: center; display: flex">
                                                        <svg
                                                            width="6"
                                                            height="10"
                                                            viewBox="0 0 6 10"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M5.25781 4.74219C5.39844 4.88281 5.39844 5.14062 5.25781 5.28125L0.757812 9.78125C0.617188 9.92188 0.359375 9.92188 0.21875 9.78125C0.078125 9.64062 0.078125 9.38281 0.21875 9.24219L4.46094 5L0.21875 0.78125C0.078125 0.640625 0.078125 0.382812 0.21875 0.242188C0.359375 0.101562 0.617188 0.101562 0.757812 0.242188L5.25781 4.74219Z"
                                                                fill="#005AB4"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                    For further information, please contact
                                                </div>
                                                <div style="padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                                                    <a
                                                        href="mailto:ezeabasilianthony@gmail.com"
                                                        style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word; text-decoration: none;"
                                                    >
                                                        ezeabasilianthony@gmail.com
                                                    </a>
                                                    <div style="width: 12px; justify-content: center; align-items: center; display: flex">
                                                        <svg
                                                            width="6"
                                                            height="10"
                                                            viewBox="0 0 6 10"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M5.25781 4.74219C5.39844 4.88281 5.39844 5.14062 5.25781 5.28125L0.757812 9.78125C0.617188 9.92188 0.359375 9.92188 0.21875 9.78125C0.078125 9.64062 0.078125 9.38281 0.21875 9.24219L4.46094 5L0.21875 0.78125C0.078125 0.640625 0.078125 0.382812 0.21875 0.242188C0.359375 0.101562 0.617188 0.101562 0.757812 0.242188L5.25781 4.74219Z"
                                                                fill="#005AB4"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;

export const SignInComponent: Component<{
    formValues: Accessor<{
        username: string;
        password: string;
        newPassword: string;
    }>;
    setFormValues: Setter<{
        username: string;
        password: string;
        newPassword: string;
    }>;
    formError: Accessor<boolean>;
}> = (props) => {
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <>
            <div style="align-self: stretch; height: 106px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
                <div style={"height: 25px; width: 345px; margin-bottom: 10px"}>
                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={props.formValues().username}
                        oldState={props.formValues}
                        updater={props.setFormValues}
                        formError={props.formError}
                    />
                </div>
                <div style={"height: 25px; width: 345px; margin-bottom: 10px; padding-top: 10px;"}>
                    <InputField
                        label="Password"
                        name="password"
                        type={showPassword() ? "text" : "password"}
                        value={props.formValues().password}
                        oldState={props.formValues}
                        updater={props.setFormValues}
                        formError={props.formError}
                    />
                </div>

                <div style="align-self: stretch; height: 25px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
                    <div style="height: 26px; padding-left: 4px; padding-right: 4px; padding-top: 10px; border-radius: 4px; justify-content: flex-start; align-items: center; display: inline-flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <input
                                type="checkbox"
                                id="scales"
                                name="scales"
                                checked={showPassword()}
                                onChange={() => setShowPassword(!showPassword())}
                            />
                            <label for="scales">Show Password</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

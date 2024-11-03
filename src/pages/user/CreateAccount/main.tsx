import { useNavigate } from "@solidjs/router";
import { Component, createSignal, Accessor, Setter, Switch, Match, createEffect, onCleanup, onMount } from "solid-js";
import { Footer } from "../../utils";
import logo from "../../../assets/logo.svg";
import { InputField } from "../../../components/utils";
import styles from "./styles.module.css";
import { AnimationRenderer } from "../../../components/utils";
import animationData from "../../../assets/animation/loading.json";
import { ErrorNotification, SuccessNotification } from "../../../components/Notifications";
import { UserAPIHandler } from "../../../supabase";
import { UserModel } from "../../../models";

type Notification = {
    message_type: "SUCCESS" | "ERROR" | "";
    message: string;
    has_message: boolean;
};

type NewAccountForm = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    display_name: string;
};

const App: Component = () => {
    const userApi = new UserAPIHandler();
    const navigate = useNavigate();
    const [formError, setFormError] = createSignal<boolean>(false);
    const [loading, setLoading] = createSignal(false);
    const [notify, setNotify] = createSignal<Notification>({
        message_type: "",
        message: "",
        has_message: false,
    });
    const [formValues, setFormValues] = createSignal<NewAccountForm>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        display_name: "",
    });

    const regex = /[^A-Za-z0-9]/;
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = (email: string) => {
        return String(email).toLowerCase().match(emailRegex);
    };

    const emptySubmission = (obj: NewAccountForm) => {
        for (const value of Object.values(obj)) {
            if (value !== "") {
                return false; // If any value is not empty, return false
            }
        }
        return true; // If all values are empty, return true
    };

    onMount(async () => {
        const user = await userApi.getUser();
        if (user) {
            navigate("/home");
            console.log(user);
        }
        console.log(user, "the frigging user");
    });

    const createAccount = async () => {
        if (emptySubmission(formValues())) {
            setNotify({
                message_type: "ERROR",
                message: "please fill out the form to proceed",
                has_message: true,
            });
            setFormError(true);
            return;
        }

        if (formValues().email.length === 0) {
            setNotify({
                message_type: "ERROR",
                message: "please provide a valid email address",
                has_message: true,
            });
            setFormError(true);
            return;
        }

        if (!validateEmail(formValues().email)) {
            setNotify({
                message_type: "ERROR",
                message: "the provided email address is wrong",
                has_message: true,
            });
            setFormError(true);
            return;
        }
        if (!regex.test(formValues().password)) {
            setNotify({
                message_type: "ERROR",
                message: "the passord format is wrong",
                has_message: true,
            });
            setFormError(true);
            return;
        }

        setLoading(true);
        const newUser: UserModel = {
            first_name: formValues().firstname,
            last_name: formValues().lastname,
            email: formValues().email,
            password: formValues().password,
            display_name: formValues().display_name,
            is_active: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            payment_plan: "BASIC",
        };
        const res = await userApi.createUser(newUser);
        if (res) {
            console.log(res.user, "----------");
            navigate("/home");
        }
        setLoading(false);
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
                                    AI Buddy
                                </div>
                            </div>
                            <div style="align-self: stretch; height: 252px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex; ">
                                <NewAccountComponent
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                    formError={formError}
                                    loading={loading}
                                />

                                <div style="align-self: stretch; justify-content: flex-end; align-items: center; gap: 16px; display: inline-flex; margin-top: 40px;">
                                    <button class={styles.forgot_password}>
                                        <div style="text-align: center; color: #005AB4; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                            Forgot password?
                                        </div>
                                    </button>
                                    <button class={styles.sign_in} onClick={() => createAccount()}>
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
                                            Create New Account
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                                Everything document processing at scale
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Efficiently interaction with your documents
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Consume large volumes of data at your convinience
                                            </a>
                                            <div style="align-self: stretch; height: 1px; background: rgba(204, 204, 204, 0.25)"></div>
                                            <a style="align-self: stretch; color: rgba(0, 0, 0, 0.80); font-size: 16px; font-family: Segoe UI; font-weight: 400; line-height: 21.60px; word-wrap: break-word">
                                                Make studying interactive and fun as should
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
                                            Learn more about AI Buddy
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

export const NewAccountComponent: Component<{
    formValues: Accessor<NewAccountForm>;
    setFormValues: Setter<NewAccountForm>;
    formError: Accessor<boolean>;
    loading: Accessor<boolean>;
}> = (props) => {
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <>
            {props.loading() ? (
                <div style="align-self: stretch; height: 156px; width: 480px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex;">
                    <div style="padding-top: 10vh; margin-left: 10vw; width: 4vw; height: 4vh; left: 50vw">
                        <AnimationRenderer animationData={animationData} />
                    </div>
                </div>
            ) : (
                <div style="align-self: stretch; height: 156px; width: 480px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex;">
                    <div style="align-self: stretch; display: flex; margin-bottom: 10px; gap: 30px; width: 460px; height:20px">
                        <InputField
                            label="Firstname"
                            name="firstname"
                            type="text"
                            value={props.formValues().firstname}
                            oldState={props.formValues}
                            updater={props.setFormValues}
                            formError={props.formError}
                        />

                        <InputField
                            label="Lastname"
                            name="lastname"
                            type="text"
                            value={props.formValues().lastname}
                            oldState={props.formValues}
                            updater={props.setFormValues}
                            formError={props.formError}
                        />
                    </div>
                    <div style="align-self: stretch; display: flex; margin-bottom: 10px; gap: 30px; width: 460px; height:20px">
                        <InputField
                            label="Email"
                            name="email"
                            type="text"
                            value={props.formValues().email}
                            oldState={props.formValues}
                            updater={props.setFormValues}
                            formError={props.formError}
                        />
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
                    <div style="align-self: stretch; display: flex; margin-bottom: 10px; gap: 30px; width: 460px; height:20px">
                        <InputField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={props.formValues().phone}
                            oldState={props.formValues}
                            updater={props.setFormValues}
                            formError={props.formError}
                        />
                        <InputField
                            label="Display Name"
                            name="display_name"
                            type="text"
                            value={props.formValues().display_name}
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
            )}
        </>
    );
};

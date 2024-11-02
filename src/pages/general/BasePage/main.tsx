import { Component, createSignal, onMount } from "solid-js";
import { FiChevronRight } from "solid-icons/fi";
import { VsAccount } from "solid-icons/vs";
import { BaseAppProvider } from "../../../store";
import { Outlet } from "@solidjs/router";
import { FaSolidNairaSign, FaSolidPhoneVolume, FaSolidPeopleRoof } from "solid-icons/fa";
import { TbReport } from "solid-icons/tb";
import { VsRecordKeys } from "solid-icons/vs";
import { BiRegularSpreadsheet } from "solid-icons/bi";
import { RiFinanceHandHeartLine } from "solid-icons/ri";
import { RiUserFacesAccountCircleFill } from "solid-icons/ri";
import { BsBarChart } from "solid-icons/bs";
import { BsPlusCircle, BsBuildingsFill } from "solid-icons/bs";
import { SiHelpdesk, SiMinutemailer } from "solid-icons/si";
import { AiOutlineTransaction } from "solid-icons/ai";
import Database from "@tauri-apps/plugin-sql";
import { createStore } from "@tauri-apps/plugin-store";
import { Footer } from "../../utils";
import styles from "./styles.module.css";

const App: Component = () => {
    onMount(async () => {
        /// database
        const db = await Database.load("sqlite:xpertaccountant.db");
        try {
            const result = await db.execute(
                "INSERT INTO users (id, firstname, lastname, email, password, username) VALUES ('anotherboringid', 'anthony', 'etienne', 'test@user.com', 'password', 'basillica');"
            );
            console.log(result);
        } catch (error) {
            const result = await db.select("SELECT * FROM users;");
            console.log("the users result", result);
        }

        /// store
        const store = await createStore("xpertaccountant.bin", {
            // we can save automatically after each store modification
            // autoSave: true,
        });
        // Set a value.
        await store.set("some_key", { value: 5 });
        // Get a value.
        const val = await store.get<{ value: number }>("some_key");
        console.log(val); // { value: 5 }
        const val2 = await store.get<{ value: boolean }>("init");
        console.log(val2); // { value: 5 }

        // You can manually save the store after making changes.
        // Otherwise, it will save upon graceful exit as described above.
        await store.save();
    });

    return (
        <div style="width: 100%; min-height: 100%; display: flex; flex-direction: column;-ms-overflow-style: none; scrollbar-width: none; overflow-x: clip;">
            <BaseAppProvider>
                <div class="flex gap-x-5 min-h-screen py-4">
                    <div style="width: 100%; height: 944px; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                        <SideMenu />
                        <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex">
                            <div style="align-self: stretch; flex: 1 1 0; padding: 20px; border-radius: 8px; border: 1px rgba(204, 204, 204, 0.50) solid; flex-direction: column; justify-content: flex-start; align-items: flex-end; gap: 20px; display: flex">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </BaseAppProvider>
        </div>
    );
};

export default App;

const SideMenu: Component = () => {
    const [readingMaterials, setReadingMaterials] = createSignal(false);
    const [home, setHome] = createSignal(false);
    const [settings, setSettings] = createSignal(false);
    const [schedule, setSchedule] = createSignal(false);
    const [progres, setProgres] = createSignal(false);
    const [studyPlans, setStudyPlans] = createSignal(false);

    const handleHome = (status: boolean) => {
        setReadingMaterials(false);
        setHome(status);
        setSettings(false);
        setSchedule(false);
        setProgres(false);
        setStudyPlans(false);
    };

    const handleReadingMaterials = (status: boolean) => {
        setReadingMaterials(status);
        setHome(false);
        setSettings(false);
        setSchedule(false);
        setProgres(false);
        setStudyPlans(false);
    };

    const handleSettings = (status: boolean) => {
        setReadingMaterials(false);
        setHome(false);
        setSettings(status);
        setSchedule(false);
        setProgres(false);
        setStudyPlans(false);
    };

    const handleSchedule = (status: boolean) => {
        setReadingMaterials(false);
        setHome(false);
        setSettings(false);
        setSchedule(status);
        setProgres(false);
        setStudyPlans(false);
    };

    const handleProgres = (status: boolean) => {
        setReadingMaterials(false);
        setHome(false);
        setSettings(false);
        setSchedule(false);
        setProgres(status);
        setStudyPlans(false);
    };

    const handleStudyPlans = (status: boolean) => {
        setReadingMaterials(false);
        setHome(false);
        setSettings(false);
        setSchedule(false);
        setProgres(false);
        setStudyPlans(status);
    };

    return (
        <div style="width: 215px; align-self: stretch; padding-left: 8px; padding-right: 8px; padding-top: 12px; padding-bottom: 12px; background: white; border-radius: 8px; border: 1px rgba(204, 204, 204, 0.50) solid; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                <div style="align-self: stretch; height: 40px; padding-left: 12px; padding-right: 4px; justify-content: space-between; align-items: center; display: inline-flex; padding-bottom: 20px">
                    <div style="text-align: center; color: black; font-size: 20px; font-family: Segoe UI; font-weight: 600; word-wrap: break-word">
                        Study Buddy®
                    </div>
                    {/* <button class={styles.collapse_menu}>
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FiChevronsRight />
                        </div>
                    </button> */}
                </div>
                <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                    <button class={styles.menu_button} onClick={() => handleHome(!home())}>
                        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <AiOutlineTransaction color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Home
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {home() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 88px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px;"
                            }
                            onMouseLeave={() => handleHome(false)}
                        >
                            {" "}
                            <Home />{" "}
                        </div>
                    )}
                    <button class={styles.menu_button} onClick={() => handleStudyPlans(!studyPlans())}>
                        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <RiUserFacesAccountCircleFill color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                                Study Plans
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {studyPlans() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 122px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px"
                            }
                            onMouseLeave={() => handleStudyPlans(false)}
                        >
                            {" "}
                            <StudyPlans />{" "}
                        </div>
                    )}

                    <button class={styles.menu_button} onClick={() => handleReadingMaterials(!readingMaterials())}>
                        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <FaSolidPeopleRoof color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Reading Materials
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {readingMaterials() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 155px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px"
                            }
                            onMouseLeave={() => handleReadingMaterials(false)}
                        >
                            {" "}
                            <ReadingMaterials />{" "}
                        </div>
                    )}
                    <button class={styles.menu_button} onClick={() => handleProgres(!progres())}>
                        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <BiRegularSpreadsheet color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Progress Tracking
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {progres() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 190px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px"
                            }
                            onMouseLeave={() => handleProgres(false)}
                        >
                            {" "}
                            <Progres />{" "}
                        </div>
                    )}
                    <button class={styles.menu_button} onClick={() => handleSchedule(!schedule())}>
                        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <VsRecordKeys color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Calendar / Schedule
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {schedule() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 225px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px"
                            }
                            onMouseLeave={() => handleSchedule(false)}
                        >
                            {" "}
                            <Schedule />{" "}
                        </div>
                    )}
                    <button class={styles.menu_button} onClick={() => handleSettings(!settings())}>
                        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                                <TbReport color="white" />
                            </div>
                            <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                Settings
                            </div>
                        </div>
                        <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                            <FiChevronRight color="white" />
                        </div>
                    </button>
                    {settings() && (
                        <div
                            style={
                                "position: absolute; left: 230px; top: 260px; z-index: 999; background-color: white; align-self: stretch; height: 125px; padding: 5px"
                            }
                            onMouseLeave={() => handleSettings(false)}
                        >
                            {" "}
                            <Settings />{" "}
                        </div>
                    )}
                </div>
            </div>

            <div style="align-self: stretch; height: 259px; padding-left: 4px; padding-right: 4px; border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                <div style="align-self: stretch; height: 40px; padding-left: 16px; padding-right: 16px; padding-top: 12px; padding-bottom: 12px; background: #005AB4; border-radius: 4px; justify-content: center; align-items: center; gap: 4px; display: inline-flex">
                    <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                        <BsPlusCircle color="white" />
                    </div>
                    <div style="text-align: center; color: white; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                        New service ticket
                    </div>
                </div>
                <div style="align-self: stretch; height: 207px; padding: 16px; background: rgba(204, 204, 204, 0.25); border-radius: 4px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                    <div style="align-self: stretch; height: 67px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
                        <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                            <SiHelpdesk />
                        </div>
                        <div style="align-self: stretch; height: 0px; border: 1px rgba(204, 204, 204, 0.50) solid"></div>
                        <div style="color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; line-height: 16.20px; word-wrap: break-word">
                            PairProfit Software Solutions
                        </div>
                    </div>
                    <div style="align-self: stretch; height: 96px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: flex">
                        <div style="align-self: stretch; padding-top: 4px; padding-bottom: 4px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                            <div style="flex: 1 1 0; height: 32px; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                                <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                    <BsBuildingsFill />
                                </div>
                                <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; line-height: 16.20px; word-wrap: break-word">
                                    Julius-Leber-Ring 60
                                    <br />
                                    99087 Erfurt, Germany
                                </div>
                            </div>
                        </div>
                        <div style="align-self: stretch; padding-top: 4px; padding-bottom: 4px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                            <div style="flex: 1 1 0; height: 16px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                                <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                    <SiMinutemailer />
                                </div>
                                <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                    ezeabasilianthony@gmail.com
                                </div>
                            </div>
                        </div>
                        <div style="align-self: stretch; padding-top: 4px; padding-bottom: 4px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                            <div style="flex: 1 1 0; height: 16px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                                <div style="width: 15px; height: 15px; justify-content: center; align-items: center; display: flex">
                                    <FaSolidPhoneVolume />
                                </div>
                                <div style="flex: 1 1 0; color: rgba(0, 0, 0, 0.80); font-size: 12px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                    +49 3641 65-2511
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Dashbaord
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            Active Study Plans
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <BsBarChart color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Progress
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <VsAccount color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Summary
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <VsAccount color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Quick Actions
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

const Settings = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Personal Profile
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            Login Information
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <BsBarChart color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Notification Settings
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <VsAccount color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            General Settings
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

const Schedule = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Plan Events
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            Set Reminders
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <BsBarChart color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Set goals
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

const Progres = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Tracking Overview
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            Make plans
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <BsBarChart color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Set timed goals
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

const StudyPlans = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            My Plans
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            New Plans
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

const ReadingMaterials = () => {
    return (
        <div style="align-self: stretch; height: 284px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
            <div style="align-self: stretch; height: 232px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <RiFinanceHandHeartLine color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Materials
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <FaSolidNairaSign color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word;">
                            Manage Materials
                        </div>
                    </div>
                </button>
                <button class={styles.sub_menu_button}>
                    <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                        <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
                            <BsBarChart color="white" />
                        </div>
                        <div style="text-align: center; color: white; font-size: 16px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                            Material Details
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

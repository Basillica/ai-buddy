import { Setter, Accessor } from "solid-js";
import { Notification } from "../models";

export interface UtilsContextType {
    notify: Accessor<Notification>;
    setNotify: Setter<Notification>;
}

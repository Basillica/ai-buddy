import { Setter, Accessor } from "solid-js";

export interface UserContextType {
    user: Accessor<string>;
    setUser: Setter<string>;
}

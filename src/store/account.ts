import { Accessor, Setter } from "solid-js";

export interface AccountContextType {
    account: Accessor<string>;
    setAccount: Setter<string>;
}

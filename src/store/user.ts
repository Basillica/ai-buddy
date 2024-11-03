import { Setter, Accessor } from "solid-js";
import { User } from "@supabase/supabase-js";

export interface UserContextType {
    authUser: Accessor<User | undefined>;
    setAuthUser: Setter<User | undefined>;
}

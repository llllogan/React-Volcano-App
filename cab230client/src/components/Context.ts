import { User } from '../packages/User';
import { createContext } from "react";
import { useContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);

export function GetUserContext() {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used within a UserContext.Provider");
    }

    return user;
}
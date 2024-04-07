import { Dispatch, SetStateAction, createContext } from "react";
import User from "../packages/User";

export interface UserContextType {
    currentUser: User;
    setCurrentUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | null>(null);

// export default function GetUserContext() {
//     const user = useContext(UserContext);

//     if (user === undefined) {
//         throw new Error("useUserContext must be used within a UserContext.Provider");
//     }

//     return user;
// }
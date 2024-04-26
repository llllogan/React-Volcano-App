import UserImage from "./UserImage";
import UserLoginSignup from "./UserLoginSignup";
import HelloText from "./HelloText";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../../packages/Context";
import "../../../App";

export default function UserInfoContainer() {
  const { currentUser } = useContext(UserContext) as UserContextType;

  return (
    <div className="mb-2 z-3 bg-light" id="userInfo">
      <UserImage />
      {currentUser.isLoggedIn ? <HelloText /> : <UserLoginSignup />}
      <hr />
    </div>
  );
}

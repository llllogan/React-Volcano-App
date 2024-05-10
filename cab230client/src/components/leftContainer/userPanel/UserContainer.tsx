import UserImage from "./UserImage";
import UserLoginSignup from "./UserLoginSignup";
import HelloText from "./HelloText";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../../packages/Context";

export default function UserInfoContainer() {
  const { currentUser } = useContext(UserContext) as UserContextType;

  return (
    <div className="mb-2 z-3 bg-light" id="userInfo">
      {currentUser.isLoggedIn ? (
        <p className="text-center text-secondary">click the image below to log out</p>
      ) : null}
      <UserImage />
      {currentUser.isLoggedIn ? <HelloText /> : <UserLoginSignup />}
      <hr />
    </div>
  );
}

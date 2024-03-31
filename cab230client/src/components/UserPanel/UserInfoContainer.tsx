import UserImage from "./UserImage";
import UserInfoInput from "./UserInfoInput";
import "../../App";
import { useState } from "react";

export default function UserInfoContainer() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  function setLoggedIn() {
    setUserLoggedIn(true);
  }

  return (
    <div className="mb-2 z-3 bg-light" id="userInfo">
      <UserImage loggedIn={userLoggedIn} />
      <UserInfoInput onLogIn={setLoggedIn}/>
      <hr />
    </div>
  );
}

import UserImage from "./UserImage";
import UserInfoInput from "./UserInfoInput";
import "../App.css";

export default function UserInfoContainer() {
  return (
    <div className="mb-2 z-3 bg-light" id="userInfo">
      <UserImage loggedIn={false} />
      <UserInfoInput />
      <hr />
    </div>
  );
}

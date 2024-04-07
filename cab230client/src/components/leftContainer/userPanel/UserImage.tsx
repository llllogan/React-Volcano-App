import LoggedOutUser from "../../../assets/icons/LoggedOutUser";
import LoggedInUser from "../../../assets/icons/LoggedInUser";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../../packages/Context";

export default function UserImage() {
  const size = 100;
  const { currentUser } = useContext(UserContext) as UserContextType;

  return (
    <div className="d-flex justify-content-center py-5">
      {currentUser.isLoggedIn ? (
        <LoggedInUser size={size} />
      ) : (
        <LoggedOutUser size={size} />
      )}
    </div>
  );
}

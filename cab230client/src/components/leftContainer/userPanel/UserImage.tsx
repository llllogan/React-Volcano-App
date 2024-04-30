import LoggedOutUser from "../../../assets/icons/LoggedOutUser";
import LoggedInUser from "../../../assets/icons/LoggedInUser";
import { useContext } from "react";
import { UserContext, UserContextType, VolcanoClientContext, VolcanoClientContextType } from "../../../packages/Context";
import VolcanoApiClient from "../../../packages/VolcanoClient";


export default function UserImage() {
  const size = 100;
  const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextType;
  const { setVolcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;

  return (
    <div className="d-flex justify-content-center py-4">
      {currentUser.isLoggedIn ? (
        <button onClick={() => {
          setCurrentUser({ name: "", email: "", isLoggedIn: false });
          setVolcanoClient(new VolcanoApiClient({}));
        }}>
           <LoggedInUser size={size} />
        </button>
      ) : (
        <LoggedOutUser size={size} />
      )}
    </div>
  );
}

import LoggedOutUser from "../../../assets/icons/LoggedOutUser";
import LoggedInUser from "../../../assets/icons/LoggedInUser";
import { useContext } from "react";
import { UserContext, UserContextType, VolcanoClientContext, VolcanoClientContextType } from "../../../packages/Context";
import VolcanoApiClient from "../../../packages/VolcanoClient";


export default function UserImage() {
  const size = 100;
  const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextType;
  const { setVolcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;

  const buttonStyle = {
    border: 'none',
    background: 'none',
    padding: '0',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  };


  return (
    <div className="d-flex justify-content-center py-4">
      {currentUser.isLoggedIn ? (
        <button style={buttonStyle} onClick={() => {
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

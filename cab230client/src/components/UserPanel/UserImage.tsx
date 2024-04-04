import LoggedOutUser from "../Icons/LoggedOutUser";
import LoggedInUser from "../Icons/LoggedInUser";
import { GetUserContext } from "../Context";


export default function UserImage() {
  const size = 100;
  const user = GetUserContext();

  return (

    <div className="d-flex justify-content-center py-5">
      {user.isLoggedIn ? <LoggedInUser size={size} /> : <LoggedOutUser size={size} /> }
    </div>

  );
}

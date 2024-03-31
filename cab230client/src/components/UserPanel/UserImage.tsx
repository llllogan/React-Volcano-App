import LoggedOutUser from "../Icons/LoggedOutUser";
import LoggedInUser from "../Icons/LoggedInUser";

interface Props {
  loggedIn: boolean;
}

export default function UserImage(props: Props) {
  const size = 100;

  return (

    <div className="d-flex justify-content-center py-5">
      {props.loggedIn ? <LoggedInUser size={size} /> : <LoggedOutUser size={size} /> }
    </div>

  );
}

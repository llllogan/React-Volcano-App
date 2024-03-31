import LoggedOutUser from "../icons/LoggedOutUser";
import LoggedInUser from "../icons/LoggedInUser";

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

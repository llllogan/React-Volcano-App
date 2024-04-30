import { useContext } from "react";
import { UserContext, UserContextType } from "../../../packages/Context";

export default function HelloText() {
  const { currentUser } = useContext(UserContext) as UserContextType;

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="text-center">Hello, {currentUser.name}</h1>
      </div>
    </div>
  );
}

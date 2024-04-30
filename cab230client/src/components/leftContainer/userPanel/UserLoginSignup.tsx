import { useState, useContext } from "react";
import { UserContext, UserContextType, VolcanoClientContext, VolcanoClientContextType } from "../../../packages/Context";
import VolcanoApiClient from "../../../packages/VolcanoClient";

export default function UserLoginSignup() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const { currentUser, setCurrentUser } = useContext( UserContext ) as UserContextType;
  const { volcanoClient, setVolcanoClient } = useContext( VolcanoClientContext ) as VolcanoClientContextType;


  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => { 
    
    e.preventDefault();
    if (input.username !== "" && input.password !== "" && !currentUser.isLoggedIn ) {

      const dividingIndex = input.username.indexOf('@');
      const username = input.username.slice(0, dividingIndex);

      setCurrentUser({ name: username, email: input.username, isLoggedIn: true });

      const token = await volcanoClient.getToken(input.username, input.password);

      setVolcanoClient(new VolcanoApiClient({token: token, username: input.username, password: input.password}));
      
    } else {
      alert("please provide a valid input");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="px-auto">
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="user-email"
                aria-describedby="user-email"
                placeholder=" "
                name="username"
                onChange={handleInput}
              />
              <label htmlFor="user-email">Email address</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="user-password"
                aria-describedby="user-password"
                placeholder=" "
                name="password"
                onChange={handleInput}
              />
              <label htmlFor="user-password">Password</label>
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 mt-2">
        <button className="btn btn-primary" type="submit">
          Login / Signup
        </button>
      </div>
    </form>
  );
}

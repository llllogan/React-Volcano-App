import volcanoClient from "../../packages/VolcanoClient";
import { useState } from "react";


export default function UserInfoInput() {

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      volcanoClient.getToken(input.username, input.password);
    }
    alert("please provide a valid input");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
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

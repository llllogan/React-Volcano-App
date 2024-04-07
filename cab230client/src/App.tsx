import "./App.css";
import { UserContext } from "./components/Context";
import CountriesPanel from "./components/Countries/CountriesPanel";
import UserInfoContainer from "./components/UserPanel/UserInfoContainer";
import User from "./packages/User";
import { useState } from "react";

export default function App() {

  const loggedOutUser: User = {
    name: "",
    email: "",
    isLoggedIn: false
  }

  const [currentUser, setCurrentUser] = useState(loggedOutUser);


  return (
    <div className="container-fluid App" id="app-container">
      <UserContext.Provider 
        value={{
          currentUser, 
          setCurrentUser
        }}
      >
        
      <div className="row">
        <div className="col" id="leftPanel">
          <UserInfoContainer />
          <CountriesPanel />
        </div>
        <div className="col-9">One of three columns</div>
      </div>


      </UserContext.Provider>
    </div>
  );
}

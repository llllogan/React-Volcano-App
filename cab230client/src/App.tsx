import "./App.css";
import CountriesPanel from "./components/Countries/CountriesPanel";
import UserInfoContainer from "./components/UserPanel/UserInfoContainer";
import { UserContext } from "./components/Context";
import User from "./packages/User";

function App() {

  const loggedOutUser: User = {
    name: "",
    email: "",
    isLoggedIn: false
  }


  return (
    <div className="container-fluid App" id="app-container">
      <UserContext.Provider value={loggedOutUser}>
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

export default App;

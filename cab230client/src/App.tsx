import "./App.css";
import CountriesPanel from "./components/leftContainer/countries/CountriesPanel";
import UserInfoContainer from "./components/leftContainer/userPanel/UserContainer";
import RightPanelContainer from "./components/rightContainer/RightPanelContainer";
import { User, Country } from "./packages/Interfaces";
import {
  UserContext,
  CountryContext,
  VolcanoSelectedContext,
} from "./packages/Context";
import { useState } from "react";

export default function App() {
  const loggedOutUser: User = {
    name: "",
    email: "",
    isLoggedIn: false,
  };

  const [currentUser, setCurrentUser] = useState(loggedOutUser);
  const [selectedCountry, setSelectedCountry] = useState({} as Country);
  const [volcanoSelected, setVolcanoSelected] = useState(false);

  return (
    <div className="container-fluid App" id="app-container">
      <UserContext.Provider 
        value={{ currentUser, setCurrentUser }}
      >
        <CountryContext.Provider
          value={{ selectedCountry, setSelectedCountry }}
        >
          <VolcanoSelectedContext.Provider
            value={{ volcanoSelected, setVolcanoSelected }}
          >
            <div className="row">
              <div className="col" id="leftPanel">
                <UserInfoContainer />
                <CountriesPanel />
              </div>
              <div className="col-9">
                <RightPanelContainer />
              </div>
            </div>
          </VolcanoSelectedContext.Provider>
        </CountryContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

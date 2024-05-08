import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../App.css";
import { User, Country } from "../packages/Interfaces";
import {
  UserContext,
  CountryContext,
  VolcanoSelectedContext,
  VolcanoContext,
  VolcanoClientContext,
} from "../packages/Context";
import { useState } from "react";
import VolcanoApiClient from "../packages/VolcanoClient";
import LeftPanelContainer from "../components/leftContainer/LeftPanelContainer";
import Volcano from "../packages/Volcano";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const loggedOutUser: User = {
    name: "",
    email: "",
    isLoggedIn: false,
  };

  const [currentUser, setCurrentUser] = useState(loggedOutUser);
  const [selectedCountry, setSelectedCountry] = useState({} as Country);
  const [selectedVolcano, setSelectedVolcano] = useState({} as Volcano);
  const [volcanoSelected, setVolcanoSelected] = useState(false);
  const [volcanoClient, setVolcanoClient] = useState(new VolcanoApiClient({}));

  return (
    <div className="container-fluid App" id="app-container">
      <VolcanoClientContext.Provider
        value={{ volcanoClient, setVolcanoClient }}
      >
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <CountryContext.Provider
            value={{ selectedCountry, setSelectedCountry }}
          >
            <VolcanoSelectedContext.Provider
              value={{ volcanoSelected, setVolcanoSelected }}
            >
              <VolcanoContext.Provider
                value={{ selectedVolcano, setSelectedVolcano }}
              >
                <div className="row">
                  <div className="col" id="leftPanel">
                    <LeftPanelContainer />
                  </div>
                  <div className="col-9">
                    <Outlet />
                  </div>
                </div>
                <TanStackRouterDevtools />
              </VolcanoContext.Provider>
            </VolcanoSelectedContext.Provider>
          </CountryContext.Provider>
        </UserContext.Provider>
      </VolcanoClientContext.Provider>
    </div>
  );
}

import "./App.css";
import CountriesPanel from "./components/Countries/CountriesPanel";
import UserInfoContainer from "./components/UserPanel/UserInfoContainer";

function App() {
  return (
    <div className="container-fluid App" id="app-container">
      <div className="row">
        <div className="col" id="leftPanel">
          <UserInfoContainer />
          <CountriesPanel />
        </div>
        <div className="col-9">One of three columns</div>
      </div>
    </div>
  );
}

export default App;

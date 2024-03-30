import "./App.css";
import CountriesPanel from "./components/CountriesPanel";
import UserInfoContainer from "./components/UserInfoContainer";

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

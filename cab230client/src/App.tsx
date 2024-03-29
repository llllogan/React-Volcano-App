import CountryList from "./components/CountryList";

function App() {
  return (
    <div className="container-fluid">
      <div className="row ">
            <div className="col">
				<CountryList />
			</div>
            <div className="col-9">One of three columns</div>
        </div>
    </div>
  );
}

export default App;

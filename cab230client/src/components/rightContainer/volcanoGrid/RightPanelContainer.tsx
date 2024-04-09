import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../../packages/Context";
// import { AgGridReact } from "ag-grid-react";

import CountriesVolcanoesContainer from "./CountriesVolcanoesContainer";

// import { CellClickedEvent, ColDef } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

export default function RightPanelContainer() {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;

  // const [rowData] = useState([
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 },
  // ]);
  // const [columnDefs] = useState<ColDef[]>([
  //   { field: "id" },
  //   { field: "name" },
  //   { field: "country" },
  //   { field: "region" },
  //   { field: "subregion" },
  // ]);

  // const defaultColDef = useMemo(
  //   () => ({
  //     sortable: true,
  //     filter: true,
  //   }),
  //   []
  // );

  // const cellClickListener = useCallback((e: CellClickedEvent) => {
  //   console.log(e);
  // }, []);

  if (selectedCountry.name !== undefined) {
    return (
      // <div className="ag-theme-alpine" style={{ height: 500 }}>
      //   <h1>{selectedCountry.name}</h1>
      //   <AgGridReact
      //     rowData={rowData}
      //     columnDefs={columnDefs}
      //     defaultColDef={defaultColDef}
      //     animateRows={true}
      //     onCellClicked={cellClickListener}
      //   />
      // </div>
      <CountriesVolcanoesContainer />
    );
  } else {
    return (
      <div>
        <h1>No Country Selected</h1>
      </div>
    );
  }
  // Here you also need to account for single volcano view
}

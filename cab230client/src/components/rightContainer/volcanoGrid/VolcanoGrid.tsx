import { CellClickedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function VolcanoGrid(props: { radius: number }) {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);
  const [columnDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "name" },
    { field: "country" },
    { field: "region" },
    { field: "subregion" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickListener = useCallback((e: CellClickedEvent) => {
    console.log(e);
  }, []);

  console.log(props.radius);

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        onCellClicked={cellClickListener}
      />
    </div>
  );
}

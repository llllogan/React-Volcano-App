import { CellClickedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import volcanoClient from "../../../packages/VolcanoClient";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { CountryContext, CountryContextType } from "../../../packages/Context";

export default function VolcanoGrid(props: { radius: number }) {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;

  const [rowData, setRowData] = useState<
    {
      id?: number;
      name: string;
      country: string;
      region: string;
      subregion: string;
    }[]
  >();

  const [columnDefs] = useState<ColDef[]>([
    { field: "id", width: 100, hide: true},
    { field: "name", flex: 1 },
    { field: "country", width: 150 },
    { field: "region", suppressSizeToFit: false },
    { field: "subregion", flex: 1 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      type: "fitGridWidth",
    }),
    []
  );

  const cellClickListener = useCallback((e: CellClickedEvent) => {
    console.log(e);
  }, []);

  useEffect(() => {
    const fetchVolcanoes = async () => {
      const volcanoes = await volcanoClient.getVolcanoes(
        selectedCountry.name,
        props.radius
      );

      setRowData(
        volcanoes
          .filter((volcano) => volcano.Id !== undefined)
          .map((volcano) => ({
            id: volcano.Id,
            name: volcano.Name,
            country: volcano.Country,
            region: volcano.Region,
            subregion: volcano.Subregion,
          }))
      );
    };

    fetchVolcanoes();
  }, [selectedCountry.name, props.radius]);

  return (
    <div className="ag-theme-alpine" style={{ height: "80vh" }}>
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

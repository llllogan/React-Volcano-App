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
      id: number;
      name: string;
      country: string;
      region: string;
      subregion: string;
    }[]
  >();

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

  useEffect(() => {
    const fetchVolcanoes = async () => {
      const volcanoes = await volcanoClient.getVolcanoes(selectedCountry.name, props.radius);
      console.log(volcanoes);

      setRowData(
        volcanoes.map((volcano) => ({
          id: volcano.Id,
          name: volcano.Name,
          country: volcano.Country,
          region: volcano.Region,
          subregion: volcano.Subregion,
        }))
      )
    };

    fetchVolcanoes();
  }, [selectedCountry.name, props.radius]);

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

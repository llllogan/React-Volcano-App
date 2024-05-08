import { CellClickedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  CountryContext,
  CountryContextType,
  VolcanoSelectedContext,
  VolcanoSelectedContextType,
  VolcanoContext,
  VolcanoContextType,
  VolcanoClientContextType,
  VolcanoClientContext,
} from "../../../packages/Context";
import { IVolcano } from "../../../packages/Interfaces";
import { useNavigate } from "@tanstack/react-router";
import Volcano from "../../../packages/Volcano";

export default function VolcanoGrid(props: { radius: number }) {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;
  const { setVolcanoSelected } = useContext(
    VolcanoSelectedContext
  ) as VolcanoSelectedContextType;
  const { setSelectedVolcano } = useContext(
    VolcanoContext
  ) as VolcanoContextType;
  const { volcanoClient } = useContext(
    VolcanoClientContext
  ) as VolcanoClientContextType;
  const navigate = useNavigate();

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
    { field: "id", hide: true },
    { field: "name", flex: 1 },
    { field: "country", hide: true },
    { field: "region", flex: 1 },
    { field: "subregion", flex: 1 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickListener = useCallback(
    (e: CellClickedEvent) => {
      const volcanoDataFromGrid: IVolcano = e.data;
      const volcano = new Volcano(volcanoDataFromGrid);
      setSelectedVolcano(volcano);
      setVolcanoSelected(true);
      navigate({ to: '/volcano'})
    },
    [setSelectedVolcano, setVolcanoSelected]
  );

  useEffect(() => {
    const fetchVolcanoes = async () => {
      const volcanoes = await volcanoClient.getVolcanoes(
        selectedCountry.name,
        props.radius
      );

      setRowData(
        volcanoes.map((volcano) => ({
          id: volcano.Id,
          name: volcano.Name,
          country: volcano.Country,
          region: volcano.Region,
          subregion: volcano.Subregion,
        }))
      );
    };

    fetchVolcanoes();
  }, [selectedCountry.name, props.radius, volcanoClient]);

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

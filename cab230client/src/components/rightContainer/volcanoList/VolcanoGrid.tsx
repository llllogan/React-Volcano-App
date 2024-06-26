import { CellClickedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  VolcanoClientContextType,
  VolcanoClientContext,
} from "../../../packages/Context";
import { IVolcano } from "../../../packages/Interfaces";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function VolcanoGrid(props: { radius: number }) {
  const { country } = useParams({from: "/$country"})
  const { volcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;
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

  const cellClickListener = useCallback( (e: CellClickedEvent) => {
    const volcanoDataFromGrid: IVolcano = e.data;
    navigate({ to: '/$country/$volcano', params: { country: volcanoDataFromGrid.country, volcano: volcanoDataFromGrid.name} });
  },[]);

  useEffect(() => {
    const fetchVolcanoes = async () => {
      const volcanoes = await volcanoClient.getVolcanoes(
        country,
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
  }, [country, props.radius, volcanoClient]);

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

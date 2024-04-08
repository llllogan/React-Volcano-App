import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../packages/Context";
import { AgGridReact } from "ag-grid-react";


export default function VolcanoList() {

    const { selectedCountry } = useContext(CountryContext) as CountryContextType;

    const rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxster', price: 72000}
    ];
    const columnDefs = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ];

    if (selectedCountry) {
        return (
            <div>
                <h1>{selectedCountry.name}</h1>
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}/>
            </div>
        );
    } else {
        return (
            <div>
                <h1>No Country Selected</h1>
            </div>
        );
    }

    
}
import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../packages/Context";


export default function VolcanoList() {

    const { selectedCountry } = useContext(CountryContext) as CountryContextType;

    if (selectedCountry) {
        return (
            <div>
                <h1>{selectedCountry.name}</h1>
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
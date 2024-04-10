import { useState } from "react";
import VolcanoGrid from "./VolcanoGrid";
import volcanoClient from "../../../packages/VolcanoClient";

export default function VolcanoGridInputs() {

  const [slider, setSlider] = useState("4");

  const sliderRadiusMap : {[key: string]: number} = {
    "0": 5,
    "1": 10,
    "2": 30,
    "3": 100,
    "4": 101
  }

  return (
    <>
    <div>
    <label htmlFor="customRange1" className="form-label" >
        Use the slider to filter volcanoes which have a population within {
            sliderRadiusMap[slider] === 101 ? " any distance" : ` a ${sliderRadiusMap[slider]} km` 
        }
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="4"
        id="customRange1"
        value={slider}
        onChange={(e) => {
            const sliderValue = e.target.value;
            setSlider(sliderValue);
            volcanoClient.setRadiusFilter(sliderRadiusMap[sliderValue]);
        }}
      />
    </div>
    <VolcanoGrid radius={sliderRadiusMap[slider] as number} />
    </>
  );
}

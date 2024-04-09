import { useState } from "react";

export default function VolcanoGridInputs() {

  const [radius, setRadius] = useState(101);

  const sliderRadiusMap : {[key: string]: number} = {
    "0": 5,
    "1": 10,
    "2": 30,
    "3": 100,
    "4": 101
  }

  return (
    <>
      <label htmlFor="customRange1" className="form-label" />
      <input
        type="range"
        className="form-range"
        min="0"
        max="4"
        id="customRange1"
        value={0}
        onChange={(e) => {
            const sliderValue = e.target.value;
            setRadius(sliderRadiusMap[sliderValue]);
            console.log(radius);
        }}
        style={{width: "30%"}}
      />
    </>
  );
}

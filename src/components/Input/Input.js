import React, { useMemo, useState } from "react";

import "./styles.css";
const Input = (props) => {
  const {
    label,
    type = "text",
    minRange = "0",
    maxRange = "1",
    defaultValue,
    onChange,
    outlined = false,
  } = props;

  const [currentRange, setCurrentRange] = useState(
    defaultValue && type === "range" ? defaultValue : "0"
  );

  let rangeValues = {
    0: "Muito Importante",
    1: "Importante",
    2: "Normal",
    3: "Pouco Importante",
  };

  console.log(defaultValue);

  return (
    <div className={`Input ${outlined ? "outlined" : ""}`}>
      <label className="InputLabel">{label}</label>
      <div className={`InputArea ${type}`}>
        {type === "range" && <span>{rangeValues[currentRange]}</span>}
        <input
          min={minRange}
          max={maxRange}
          defaultValue={
            defaultValue ? defaultValue : type === "range" ? currentRange : ""
          }
          type={type}
          onChange={(ev) => {
            onChange(ev);
            setCurrentRange(ev.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Input;

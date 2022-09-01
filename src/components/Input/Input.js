import React, { useMemo, useState } from "react";
import Icon from "../Icon";

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
    !!defaultValue && type === "range" ? String(defaultValue) : "2"
  );
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleVisibility = () => setVisiblePassword(!visiblePassword);
  let rangeValues = {
    1: "Pouco Importante",
    2: "Normal",
    3: "Importante",
    4: "Muito Importante",
  };

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
          type={visiblePassword ? "text" : type}
          onChange={(ev) => {
            onChange(ev);
            setCurrentRange(ev.target.value);
          }}
        />
        {type === "password" ? (
          visiblePassword ? (
            <div className="Visibility" onClick={handleVisibility}>
              <Icon name="visibility_off" />
            </div>
          ) : (
            <div className="Visibility" onClick={handleVisibility}>
              <Icon name="visibility" />
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Input;

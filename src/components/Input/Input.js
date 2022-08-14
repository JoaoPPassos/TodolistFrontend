import React from "react";

import "./styles.css";
const Input = (props) => {
  const { label, type = "text", onChange, outlined = false } = props;
  return (
    <div className={`Input ${outlined ? "outlined" : ""}`}>
      <label className="InputLabel">{label}</label>
      <div className="InputArea">
        <input type={type} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;

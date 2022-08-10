import React from "react";

const Input = (props) => {
  const { label, type = "text", onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <div>
        <input type={type} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;

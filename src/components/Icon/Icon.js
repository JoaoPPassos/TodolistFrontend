import React from "react";

const Icon = (props) => {
  const { outline, name, myClassName = "" } = props;
  return (
    <i
      className={`${
        outline ? "material-icons-outlined" : "material-icons"
      } ${myClassName}`}
    >
      {name}
    </i>
  );
};

export default Icon;

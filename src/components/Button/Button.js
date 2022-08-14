import React from "react";
import Icon from "../Icon";

import "./styles.css";

const Button = (props) => {
  const { type, onClick } = props;

  const buttonRender = () => {
    if (!type) return normalButton(props);

    if (type === "include") return includeButton(props);
  };
  return <>{buttonRender()}</>;
};

const normalButton = (props) => {
  const { onClick, label } = props;

  return (
    <div onClick={onClick} className="Button">
      {label}
    </div>
  );
};
const includeButton = (props) => {
  const { onClick } = props;

  return (
    <div className="ButtonInclude" onClick={onClick}>
      <Icon name="add" />
    </div>
  );
};

export default Button;

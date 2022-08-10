import React from "react";
import Button from "../Button";

import "./styles.css";

const CategoryArea = (props) => {
  const { name, includeTodo } = props;
  return (
    <div className="CategoryArea" key={name}>
      <div className="CategoryArea_Header">
        <h2>{name}</h2>
        <Button type="include" onClick={includeTodo} />
      </div>

      <div className="CategoryArea_Content">{props.children}</div>
    </div>
  );
};

export default CategoryArea;

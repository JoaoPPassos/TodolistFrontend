import React from "react";

import "./styles.css";

const CategorySticky = (props) => {
  const { title, color, onClick } = props;

  return (
    <div
      {...props}
      className="CategorySticky"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default CategorySticky;

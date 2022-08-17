import React from "react";
import { getLightAndDarkColor } from "../../Util/Colors";

import "./styles.css";

const Sticky = (props) => {
  const { baseColor, title, priority, description, id, deadline, onClick } =
    props;
  const lightColor = getLightAndDarkColor(baseColor, 70);
  const priority_color = getLightAndDarkColor(baseColor, 40 * priority.id - 60);
  return (
    <div
      className="Sticky"
      style={{ backgroundColor: baseColor }}
      key={id}
      onClick={onClick}
    >
      <div className="Sticky_Title" style={{ backgroundColor: lightColor }}>
        <span>{title}</span>
      </div>
      <div className="Sticky_Row">
        <div
          className="Sticky_Priority"
          style={{ backgroundColor: priority_color }}
        >
          {priority.nm_priority}
        </div>
        <span>{deadline}</span>
      </div>

      <div className="Sticky_Description">{description}</div>
    </div>
  );
};

export default Sticky;

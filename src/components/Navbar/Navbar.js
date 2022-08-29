import React, { useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import Logo from "../../Assets/images/logo.png";

import "./styles.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navbarItems = [
    {
      iconName: "home",
      name: "Home",
      redirectLink: "/",
    },
    {
      iconName: "view_list",
      name: "Categorias",
      redirectLink: "/category",
    },
  ];

  const handleOpen = () => setOpen(!open);

  const isOptionSelected = (path) => pathname === path;

  const Item = (item) => {
    return (
      <li
        className={`Navbar_Item ${
          isOptionSelected(item.redirectLink) ? "selected" : ""
        }`}
        key={item.name}
        onClick={() => navigate(item.redirectLink)}
      >
        <Icon
          name={item.iconName}
          myClassName="Navbar_Item__Icon"
          outline={true}
        />
        <span>{open && item.name}</span>
      </li>
    );
  };

  return (
    <div
      className={`Navbar ${open ? "open" : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleOpen}
    >
      <div className="Logo">
        <img src={Logo} />
        <h2>Todolist</h2>
      </div>
      <ul className="Navbar_Options">
        {navbarItems.map((item) => Item(item))}
      </ul>
    </div>
  );
};

export default Navbar;

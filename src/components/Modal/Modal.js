import React from "react";
import Icon from "../Icon";

import "./styles.css";

var hideFunction = null;

const Modal = (props) => {
  const { children, show, onHide } = props;

  hideFunction = onHide;

  let subComponentList = Object.keys(Modal);
  let subComponents = subComponentList.map((key) => {
    return React.Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });

  const headerComponent =
    subComponents?.filter(
      (component) => component?.[0]?.type?.name === "Header"
    ).length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.name === "Header"
      )[0][0]
    ) : (
      <Header />
    );

  const bodyComponent =
    subComponents?.filter((component) => component?.[0]?.type?.name === "Body")
      .length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.name === "Body"
      )[0][0]
    ) : (
      <Body />
    );

  const footerComponent =
    subComponents?.filter(
      (component) => component?.[0]?.type?.name === "Footer"
    ).length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.name === "Footer"
      )[0][0]
    ) : (
      <Footer />
    );
  return (
    <div className={`Modal ${show ? "show" : ""}`}>
      <div className="Modal_Content">
        {headerComponent}
        {bodyComponent}
        {footerComponent}
      </div>
    </div>
  );
};

const Header = (props) => {
  const { title, closeButton = false } = props;
  return (
    <div className="Modal_Header">
      {title}
      {closeButton && (
        <div
          className="Modal_Header__Closebutton"
          onClick={() => {
            if (hideFunction) hideFunction();
          }}
        >
          <Icon name="close" />
        </div>
      )}
    </div>
  );
};

const Body = (props) => {
  return <div className="Modal_Body">{props.children}</div>;
};

const Footer = (props) => {
  return <div className="Modal_Footer">{props.children}</div>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
export default Modal;

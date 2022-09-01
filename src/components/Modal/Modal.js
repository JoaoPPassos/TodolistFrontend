import React, { useRef } from "react";
import Icon from "../Icon";

import "./styles.css";

var hideFunction = null;

const Modal = (props) => {
  const { children, show, onHide } = props;
  const ref = useRef(children[0]);
  hideFunction = onHide;
  console.log(ref);
  let subComponentList = Object.keys(Modal);

  let subComponents = subComponentList.map((key) => {
    return React.Children.map(props.children, (child) => {
      return child.type.type === key ? child : null;
    });
  });

  const headerComponent =
    subComponents?.filter(
      (component) => component?.[0]?.type?.type === "Header"
    ).length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.type === "Header"
      )[0][0]
    ) : (
      <Header />
    );

  const bodyComponent =
    subComponents?.filter((component) => component?.[0]?.type?.type === "Body")
      .length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.type === "Body"
      )[0][0]
    ) : (
      <Body />
    );

  const footerComponent =
    subComponents?.filter(
      (component) => component?.[0]?.type?.type === "Footer"
    ).length > 0 ? (
      subComponents?.filter(
        (component) => component?.[0]?.type?.type === "Footer"
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
  const { title, closeButton = false, type = "HEADER" } = props;
  console.log("title", title);
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
  const { type = "BODY" } = props;
  console.log("body", props);
  return <div className="Modal_Body">{props.children}</div>;
};

const Footer = (props) => {
  const { type = "FOOTER" } = props;
  console.log("footer", props);
  return <div className="Modal_Footer">{props.children}</div>;
};

Header.type = "Header";
Body.type = "Body";
Footer.type = "Footer";

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
export default Modal;

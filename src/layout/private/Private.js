import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Category, Home } from "../../pages";

const Private = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          paddingLeft: 86,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#202124",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </>
  );
};

export default Private;

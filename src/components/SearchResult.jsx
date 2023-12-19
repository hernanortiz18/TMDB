import React from "react";
import Navbar from "./Navbar";
import Grill from "../commons/Grill";
import { useSelector } from "react-redux";

const searchResult = () => {
  const thisSearch = useSelector((state) => state.searchResult);
  const data = thisSearch.data;

  return (
    <>
      <div className="home-container">
        <Navbar />
        <Grill data={data} />
      </div>
    </>
  );
};

export default searchResult;

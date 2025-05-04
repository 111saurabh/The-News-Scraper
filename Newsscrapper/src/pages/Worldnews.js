import React, { useState } from "react";
import data from "../dataavail/world";
import Tours from "../components/Tours";
import Heading from "../components/Heading";
import "./hero.css";

const Worldnews = () => {
  const [tours] = useState(data);
  return (
    <div className="App">
      <Heading></Heading>
      <Tours tours={tours}></Tours>
    </div>
  );
};

export default Worldnews;

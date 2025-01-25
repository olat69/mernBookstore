import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommend from "./Recommend";
import News from "./News";
const Home = () => {
  return (
    <div className="md:ml-10">
      <Banner />
      <TopSellers />
      <Recommend />
      <News />
    </div>
  );
};

export default Home;

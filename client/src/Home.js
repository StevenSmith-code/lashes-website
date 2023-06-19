import React from "react";
import Header from "./Header";
import ServiceOffers from "./ServiceOffers";
import PricingTable from "./PricingTable";

function Home() {
  return (
    <div>
      <Header />
      <ServiceOffers />
      <PricingTable />
    </div>
  );
}

export default Home;

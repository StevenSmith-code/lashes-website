import React from "react";
import Header from "./Header";
import ServiceOffers from "./ServiceOffers";
import PricingTable from "./PricingTable";

function Home({ onLogout }) {
  return (
    <div>
      <Header onlogout={onLogout} />
      <ServiceOffers />
      <PricingTable />
    </div>
  );
}

export default Home;

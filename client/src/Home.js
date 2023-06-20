import React from "react";
import Header from "./Header";
import ServiceOffers from "./ServiceOffers";
import PricingTable from "./PricingTable";

function Home({ user, onLogout }) {
  return (
    <div>
      <Header user={user} onlogout={onLogout} />
      <ServiceOffers />
      <PricingTable />
    </div>
  );
}

export default Home;

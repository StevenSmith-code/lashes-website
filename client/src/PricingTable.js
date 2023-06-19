import React from "react";
import PricingCard from "./PricingCard";
import { Grid } from "@mui/material";

function PricingTable() {
  return (
    <div className="flex flex-col m-auto text-center font-raleway mt-20 text-white bg-[#481346]">
      <div className="space-y-10 max-w-7xl mb-20 m-auto py-16">
        <h1 className="text-4xl font-normal">PRICING TABLE</h1>
        <img
          className="m-auto"
          style={{ width: "50%" }}
          src="https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-line-img-2.png"
          alt="divider"
        />
        <p className="max-w-2xl m-auto">
          Our EyeLash Studio is proud with its cheap pricing table. Do not
          forget about special discounts on our services that we regularly offer
          to our clients.
        </p>
      </div>

      <Grid container justifyContent="center" spacing={2}>
        <PricingCard
          img={
            "https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-pricing-icon-1.png"
          }
          title={"Volume Lashes"}
          description={"Your eyes will look gorgeous"}
          price={"$200"}
        />
        <PricingCard
          img={
            "https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-pricing-icon-2.png"
          }
          title={"Classic Lashes"}
          description={"You will have natural looking lashes"}
          price={"$175"}
        />
        <PricingCard
          img={
            "https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-pricing-icon-3.png"
          }
          title={"Brow Extensions"}
          description={"You will have beautiful brows"}
          price={"$190"}
        />
      </Grid>
    </div>
  );
}

export default PricingTable;

import React from "react";
import ServiceCard from "./ServiceCard";

function ServiceOffers() {
  return (
    <div className="flex flex-col max-w-7xl m-auto text-center font-raleway mt-20 space-y-12">
      <h1 className="text-[#282434] text-4xl">WHAT WE OFFER</h1>
      <img
        className="m-auto"
        style={{ width: "25%" }}
        src="https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-line-img-1.png"
        alt="divider"
      />
      <div className="flex justify-between">
        <ServiceCard
          service={"Volume Lashes"}
          description={
            "2D - 4D. Number of lashes will depend on client's natural lashes and desired fullness."
          }
        />
        <ServiceCard
          service={"Classic Lashe"}
          description={"65+ lashes per eye; one-on-one method."}
        />
        <ServiceCard
          service={"Brow Extensions"}
          description={
            "We provide wide variety of colors to create a beautiful, natural looking brows."
          }
        />
      </div>
    </div>
  );
}

export default ServiceOffers;

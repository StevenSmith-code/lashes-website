import { Button } from "@mui/material";
import React from "react";

function PricingCard({ img, title, description, price }) {
  return (
    <div className="border-4 border-gray-200 px-10 py-10 h-[500px] mr-10">
      <div className="flex flex-col space-y-8">
        <img src={img} alt={title} />
        <h4 className="font-bold text-xl">{title}</h4>
        <p>{description}</p>
        <h4 className="text-white text-5xl font-light">{price}</h4>
        <Button variant="contained" color="secondary">
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}

export default PricingCard;

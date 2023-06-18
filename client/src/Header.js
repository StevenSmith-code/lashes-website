import React from "react";
import logo from "./mom.png";

function Header() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-content-bg-1.jpg)",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="2xl:h-[1000px] text-white font-raleway "
    >
      <div className="flex justify-between max-w-6xl m-auto items-center">
        <img src={logo} alt="logo" className="h-60" />
        <div className="flex space-x-10 font-semibold">
          <p>ABOUT ME</p>
          <p>SERVICES</p>
          <p>GALLERY</p>
          <p>PRICING</p>
          <p>TESTIMONIALS</p>
          <p>CONTACT ME</p>
        </div>
      </div>

      <div className="max-w-6xl m-auto mt-32">
        <h1 className="font-extrabold text-6xl max-w-2xl leading-normal">
          Magnificent, Natural Looking Lashes
        </h1>
        <h1 className="font-light text-5xl italic mt-3">
          for Your Beautiful Eyes
        </h1>
        <button className="bg-[#481346] px-6 py-4 mt-10">
          BOOK AN APPOINTMENT
        </button>
      </div>
    </div>
  );
}

export default Header;

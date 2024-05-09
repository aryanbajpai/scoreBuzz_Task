import React from "react";
import img from "../Images/cric.jpg";

export const Home = () => {
  return (
    <div className="overflow-x-hidden relative">
      <h1 className="text-black z-50 text-[44px] text-center font-bold pt-20 overflow-hidden">
        <span className="bg-[#1a8ea2] px-4 text-white pb-2 rounded-bl-[30px]">WELCOME to</span> {" "}
        <i className="bg-blue-900 px-4 pb-2 rounded-tr-[30px]">
          <span className="text-white">score</span>
          <span className="text-yellow-400">Buzz</span>
        </i>
      </h1>
    </div>
  );
};

import React from "react";
import { PlyrTable } from "./Reusable COMP/PlyrTable";
import { useNavigate } from "react-router-dom";


export const Squadtable = () => {

  const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
  const optedTo = JSON.parse(localStorage.getItem("optedTo"));
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/firstinning')
  }

  return (
    <div>
      <h1 className="text-center text-[34px] mt-5 text-[#57266c ] font-[600]">
        SQUAD
      </h1>
      {selectedTeam === "T1" && (
        <>
          {optedTo === "BATTING" ? (<PlyrTable />) : (<PlyrTable />)}
        </>
      )}

      {selectedTeam === "T2" && (
        <>
          {optedTo === "BATTING" ? (<PlyrTable />) : (<PlyrTable />)}
        </>
      )}
      <div className="text-center">
        <button onClick={handleDone} className="text-2xl font-[600] text-white bg-green-600 px-5 py-2 my-5 border rounded-lg border-green-800">DONE</button>
      </div>
    </div>
  );
};

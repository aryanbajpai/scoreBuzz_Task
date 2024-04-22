import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Scorer = () => {
  const [selectedTeam, setSelectedTeam] = useState(localStorage.getItem('selectedTeam') || null);
  const [teamDisabled, setTeamDisabled] = useState(false);
  const [optedTo, setOptedTo] = useState( localStorage.getItem('optedTo') || null);
  const [opDisabled, setOpDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam))
  }, [selectedTeam]);

  useEffect(() => {
    localStorage.setItem('optedTo', JSON.stringify(optedTo))
  }, [optedTo]);

  const handleTeamSelect = (team) => {
    if (selectedTeam === null) {
      setSelectedTeam(team);
      setTeamDisabled(true);
    }
  };

  const handleClick = (opted) => {
    if (optedTo === null) {
      setOptedTo(opted);
      setOpDisabled(true);
      localStorage.setItem('optedTo', JSON.stringify(opted))
    }
  };

  const startMatch = () => {
    if (selectedTeam && optedTo) {
      alert(`${selectedTeam} won the Toss and elected ${optedTo}.`);
      navigate('/match')
    }
  };

  return (
    <div className="w-[750px] m-auto">
      <h1 className="text-[34px] font-[600] m-2">TOSS:</h1>
      <div className="flex m-auto">
        <div
          className={`text-center w-[50px] bg-${
            selectedTeam === "T1" ? "white" : "black"
          } rounded-full py-3 m-2`}
          onClick={() => handleTeamSelect("T1")}
          style={{ cursor: selectedTeam !== null ? "not-allowed" : "pointer" }}
        >
          T1
        </div>
        <div
          className={`text-center w-[50px] bg-${
            selectedTeam === "T2" ? "white" : "black"
          } rounded-full py-3 m-2`}
          onClick={() => handleTeamSelect("T2")}
          style={{ cursor: teamDisabled ? "not-allowed" : "pointer" }}
        >
          T2
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="flex">
            <div
              className={`text-center w-[110px] bg-${
                optedTo === "BATTING" ? "white" : "black"
              } rounded-full py-3 m-2`}
              onClick={() => handleClick("BATTING")}
              style={{ cursor: optedTo !== null ? "not-allowed" : "pointer" }}
            >
              BATTING
            </div>
            <div
              className={`text-center w-[120px] bg-${
                optedTo === "BOWLING" ? "white" : "black"
              } rounded-full py-3 m-2`}
              onClick={() => handleClick("BOWLING")}
              style={{ cursor: opDisabled ? "not-allowed" : "pointer" }}
            >
              BOWLING
            </div>
          </div>
        </>
      )}

      {selectedTeam && optedTo && (
        <>
          <div className="text-[22px] font-[500] text-blue-200 bg-blue-800 px-3 py-1 rounded-tr-[20px] rounded-bl-[20px] border-b-[3px] border-white">
            {selectedTeam} won the TOSS and elected {optedTo}.
          </div>
          <div className="text-center">
            <button
              onClick={startMatch}
              className="text-white text-xl font-[500] bg-red-500 py-1 px-3 w-[155px] my-5"
            >
              START MATCH
            </button>
          </div>
        </>
      )}
    </div>
  );
};

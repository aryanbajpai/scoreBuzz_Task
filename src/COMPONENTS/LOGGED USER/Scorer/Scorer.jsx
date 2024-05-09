import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Teamtable } from "../../Team PLAYERS/Teamtable";

export const Scorer = () => {

  //Getting Item from LOCAL STORAGES
  const [selectedTeam, setSelectedTeam] = useState(localStorage.getItem("selectedTeam") || null);
  const [oposition, setOposition] = useState(localStorage.getItem('oposition') || null);
  const [teamDisabled, setTeamDisabled] = useState(false);
  const [optedTo, setOptedTo] = useState(localStorage.getItem("optedTo") || null);
  const [notOpted, setNotOpted] = useState(localStorage.getItem('notOpted') || null);
  const [opDisabled, setOpDisabled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if selectedTeam is present in localStorage at the time of logging in
    const selectedTeamAtLogin = localStorage.getItem("selectedTeam");
    const optedtoAtLogin = localStorage.getItem("optedTo");
  
    // If selectedTeam is not present in localStorage at the time of logging in, redirect to StartMatch
    if (selectedTeamAtLogin === null && optedtoAtLogin === null) {
      const storedSelectedTeam = localStorage.getItem("selectedTeam");
      // If selectedTeam is not empty in localStorage, directly redirect to StartMatch
      if (storedSelectedTeam !== null && optedtoAtLogin !== null) {
        navigate("/match");
      }
    }
  }, []);


  const handleTeamSelect = (team) => {
    if (selectedTeam === null) {
      setSelectedTeam(team);
      setTeamDisabled(true);
      localStorage.setItem("selectedTeam", JSON.stringify(team));

      const oposition = team === 'T1' ? 'T2' : 'T1';
      setOposition(oposition);
      localStorage.setItem('oposition', JSON.stringify(oposition));
    }
  };

  const handleClick = (opted) => {
    if (optedTo === null) {
      setOptedTo(opted);
      setOpDisabled(true);
      localStorage.setItem("optedTo", JSON.stringify(opted));

      const notOpted = opted === 'BATTING' ? "BOWLING" : "BATTING";
      setNotOpted(notOpted);
      localStorage.setItem('notOpted', JSON.stringify(notOpted));
    }
  };

  const startMatch = () => {
    if (selectedTeam && optedTo) {
      navigate("/squad");
      const matchData = [{
        TOSS: `${selectedTeam}`,
        Opted_To: `${optedTo}`,
        Oposition: `${oposition}`,
        
      }]
      localStorage.setItem('matchData', JSON.stringify(matchData));
    }
  };

  return (
    <div className="relative">
      <div className="w-[400px] bg-blue-900 right-[-80px] bottom-[-100px] h-[400px] opacity-[40%] rounded-full fixed"></div>
      <div className="bg-blue-900 w-[400px] h-[400px] rotate-45 opacity-[50%] left-[-210px] bottom-[120px] fixed"></div>
      <div className="w-[750px] m-auto ">
        <h1 className="text-[34px] font-[700] text-blue-800 m-2">TOSS:</h1>
        <div className="flex m-auto">
          <div
            className={`text-center w-[50px] text-blue-600 bg-${
              selectedTeam === "T1" ? "white" : "black"
            } rounded-full py-3  m-2 text-2xl font-[500]`}
            onClick={() => handleTeamSelect("T1")}
            style={{
              cursor: selectedTeam !== null ? "not-allowed" : "pointer",
            }}
          >
            T1
          </div>
          <div
            className={`text-center w-[50px] text-blue-600 bg-${
              selectedTeam === "T2" ? "white" : "black"
            } rounded-full py-3 m-2 text-2xl font-[500]`}
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
                className={`text-center w-[110px] text-fuchsia-800 bg-${
                  optedTo === "BATTING" ? "white" : "black"
                } rounded-full py-3 m-2 text-xl font-[500]`}
                onClick={() => handleClick("BATTING")}
                style={{ cursor: optedTo !== null ? "not-allowed" : "pointer" }}
              >
                BATTING
              </div>
              <div
                className={`text-center w-[120px] text-fuchsia-800 bg-${
                  optedTo === "BOWLING" ? "white" : "black"
                } rounded-full py-3 m-2 text-xl font-[500]`}
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
            <div className="text-[22px] font-[500] text-blue-200 bg-blue-800 mt-2 px-3 py-1 rounded-tr-[20px] rounded-bl-[20px] border-b-[3px] border-white">
              {selectedTeam} won the TOSS and elected {optedTo}.
            </div>
            <div className="text-center">
              <button
                onClick={startMatch}
                className="text-white text-xl font-[500] bg-red-500 py-1 px-3 w-[155px] my-5 hover:scale-[1.06]"
              >
                START MATCH
              </button>
            </div>
          </>
        )}

        <Teamtable/>
      </div>
    </div>
  );
};

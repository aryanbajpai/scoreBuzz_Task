import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRuns } from "../../App/FEATURES/countrunsSlice";
import {
  useGetTeamOneQuery,
  useGetTeamTwoQuery,
  useUndoHistoryMutation,
  useAddHistoryTwoMutation,
  useUseHistoryTwoQuery,
} from "../../App/FEATURES/Api";
import { useNavigate } from "react-router-dom";

export const SecondInning = () => {
  const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam")) || [];
  const optedTo = JSON.parse(localStorage.getItem("optedTo")) || [];
  const oposition = JSON.parse(localStorage.getItem("oposition")) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dusriPari, setRuns] = useState(JSON.parse(localStorage.getItem("DusriPari")) || 0);
  const [ov2, setOvrs] = useState(JSON.parse(localStorage.getItem("Ov2")) || 0);
  const [wk, setWkts] = useState(JSON.parse(localStorage.getItem("Wkts")) || 0);
  const [gennd, setBalls] = useState(JSON.parse(localStorage.getItem("Gennde")) || 0);
  const [otherTeam, setOtherTeam] = useState(null);
  const [visible, setVisible] = useState(false);

  const { data: teamOne } = useGetTeamOneQuery();
  const [tmOne, setTeamOne] = useState(teamOne)
  const { data: teamTwo } = useGetTeamTwoQuery();
  const [tmTwo, setTeamTwo] = useState(teamTwo);

  const baterT1 = JSON.parse(localStorage.getItem('Strike2')) || [tmOne[0][`p${wk + 1}`], tmOne[0][`p${wk + 2}`]];
  console.log(baterT1)
  const baterT2 = JSON.parse(localStorage.getItem('Strike2')) || [tmTwo[0][`p${wk + 1}`], tmTwo[0][`p${wk + 2}`]];

  const striker = JSON.parse(localStorage.getItem('Strike2')) || null;
  const first = JSON.parse(localStorage.getItem('First_Innings')) || null;
  const second = JSON.parse(localStorage.getItem('Second_Innings')) || null;

  useEffect(() => {
    if (selectedTeam === "T1") {
      setOtherTeam("T2");
    } else {
      setOtherTeam("T1");
    }
    localStorage.setItem("otherTeam", JSON.stringify(otherTeam));

    if (ov2 === 5) {
      if (selectedTeam === 'T1') {
        if (optedTo === 'BATTING') {
          const inningsSummary = {
            Team: oposition,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        } else {
          const inningsSummary = {
            Team: selectedTeam,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        }
      } else if (selectedTeam === 'T2') {
        if (optedTo === 'BATTING') {
          const inningsSummary = {
            Team: oposition,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        } else {
          const inningsSummary = {
            Team: selectedTeam,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        }
      }
    } else if (dusriPari !== 0 && dusriPari > first.Total) {
      if (selectedTeam === 'T1') {
        if (optedTo === 'BATTING') {
          const inningsSummary = {
            Team: oposition,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        } else {
          const inningsSummary = {
            Team: selectedTeam,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        }
      } else if (selectedTeam === 'T2') {
        if (optedTo === 'BATTING') {
          const inningsSummary = {
            Team: oposition,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        } else {
          const inningsSummary = {
            Team: selectedTeam,
            Total: dusriPari,
            Wickets: wk,
            Overs: ov2,
            Balls: gennd,
          }
          localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary))
        }
      }
    }
  }, [selectedTeam, otherTeam, ov2, dusriPari]);

  const [addHistory] = useAddHistoryTwoMutation();
  const { data: commentaryData2 } = useUseHistoryTwoQuery();
  const [dltCommentary] = useUndoHistoryMutation();

  if (ov2 === 5) {
    alert('Match Finished')
    navigate('/result');
  }

  const handleAddRuns = (run) => {
    if (wk < 10) {
      if (ov2 < 5) {
        const total = dusriPari + run;
        setRuns(total);

        // Update balls
        if (gennd < 5) {
          setBalls((prevBalls) => prevBalls + 1);
        } else {
          setBalls(0);
          setOvrs((prevOvers) => prevOvers + 1);
        }
      } 
    } else if (wk < 11) {
      if (selectedTeam === 'T1') {
        const inningsSummary = {
          Team: selectedTeam === 'T1' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      } else if (selectedTeam === 'T2') {
        const inningsSummary = {
          Team: selectedTeam === 'T2' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      }
      alert('Match Finished');
      navigate('/result')
    }

    if (dusriPari !== null && first.Total < dusriPari) {
      alert('Match Finished')
      navigate('/result');
    }

    // Dispatch the action to update the runs count in the Redux store
    dispatch(addRuns(dusriPari));
    addHistory({
      action: "Runs Scored",
      Runs: dusriPari + run,
      run,
      Ovrs: ov2,
      Balls: gennd + 1,
      Wkts: wk,
    });
  };

  const handleStrikeOnEvenRun = () => {
    if (gennd === 5) {
      //Swap Batsmen when Ovrs increment
      for (let i = 0; i < 1; i++) {
        const temp = striker[0];
        striker[0] = striker[1];
        striker[1] = temp;
        localStorage.setItem('Strike2', JSON.stringify(striker));
      }
    }
  }

  const handleExtraRuns = (run) => {
    dispatch(addRuns(run));
    if (wk < 10) {
      const total = dusriPari + run;
      setRuns(total);
    }else if (wk < 11) {
      if (selectedTeam === 'T1') {
        const inningsSummary = {
          Team: selectedTeam === 'T1' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      } else if (selectedTeam === 'T2') {
        const inningsSummary = {
          Team: selectedTeam === 'T2' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      }
      alert('Match Finished');
      navigate('/result')
    }
    addHistory({
      action: "Extra runs given",
      Runs: total,
      run,
      Ovrs: ov2,
      Balls: gennd + 1,
      Wkts: wk,
    });
  };

  const handleWkts = () => {
    if (wk < 10) {
      // Update wickets
      setWkts((prevWickets) => prevWickets + 1);
      // Update balls
      if (gennd < 5) {
        setBalls((prevBalls) => prevBalls + 1);
      } else {
        setBalls(0);
        //Update Overs
        setOvrs((prevOvers) => prevOvers + 1);
      }

      //New Batter on STRIKE  - Changed
      if (selectedTeam === 'T1') {
        if (optedTo === 'BATTING') {
          baterT2.splice(0, 1);
          baterT2.unshift(tmTwo[0][`p${wk + 3}`]);
          localStorage.setItem('Strike2', JSON.stringify(baterT2));
        } else {
          baterT1.splice(0, 1);
          baterT1.unshift(tmOne[0][`p${wk + 3}`]);
          localStorage.setItem('Strike2', JSON.stringify(baterT1));
        }
      } else if (selectedTeam === 'T2') {
        if (optedTo === 'BATTING') {
          baterT1.splice(0, 1);
          baterT1.unshift(tmOne[0][`p${wk + 3}`]);
          localStorage.setItem('Strike2', JSON.stringify(baterT1));
        } else {
          baterT2.splice(0, 1);
          baterT2.unshift(tmTwo[0][`p${wk + 3}`]);
          localStorage.setItem('Strike2', JSON.stringify(baterT2));
        }
      }

      //add Action and update Commentary server
      addHistory({
        action: "Fall of Wicket",
        Runs: dusriPari,
        run: 0,
        Ovrs: ov2,
        Balls: gennd + 1,
        Wkts: wk + 1,
      });
    } else if (wk === 9) {
      if (selectedTeam === 'T1') {
        const inningsSummary = {
          Team: selectedTeam === 'T1' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      } else if (selectedTeam === 'T2') {
        const inningsSummary = {
          Team: selectedTeam === 'T2' ? oposition : selectedTeam,
          Total: dusriPari,
          Wickets: wk,
          Overs: ov2,
          Balls: gennd,
        };
        localStorage.setItem('Second_Innings', JSON.stringify(inningsSummary));
      }
      alert('Match Finished');
      navigate('/result')
    }
  };

  const handleUndo = async () => {
    if (wk < 10) {
      if (commentaryData2 && commentaryData2.length > 0) {
        const latestComment = commentaryData2[commentaryData2.length - 1];
        try {
          // Delete the latest added data from the commentary server
          await dltCommentary(latestComment.id).unwrap();

          // Remove the previous taken step from the local state
          setRuns((prevRuns) => prevRuns - latestComment.run);
          setWkts(
            (prevWkts) =>
              prevWkts - (latestComment.action === "Fall of Wicket" ? 1 : 0)
          );

          // Update balls and overs based on the action
          if (gennd > 0) {
            setBalls(latestComment.balls - 1);
          } else if (gennd === 0) {
            setBalls(5);
            setOvrs((prevOvrs) => prevOvrs - 1);
          }
        } catch (error) {
          console.error("Error occurred while undoing:", error);
        }
        setVisible(!visible);
      }
    } else {
      alert('Match Finished')
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);

    // Run a loop for a single iteration to swap elements once
    for (let i = 0; i < 1; i++) {
      if (gennd < 5) {
        //ROTATE STRIKE - Changed
        if (selectedTeam === 'T1') {
          if (optedTo === 'BATTING') {
            // Swap the elements using a temporary variable
            const temp = baterT2[0];
            baterT2[0] = baterT2[1];
            baterT2[1] = temp;
            // Store the swapped array in localStorage
            localStorage.setItem('Strike2', JSON.stringify(baterT2));
          } else {
            const temp = baterT1[0];
            baterT1[0] = baterT1[1];
            baterT1[1] = temp;
            localStorage.setItem('Strike2', JSON.stringify(baterT1));
          }
        } else if (selectedTeam === 'T2') {
          if (optedTo === 'BATTING') {
            const temp = baterT1[0];
            baterT1[0] = baterT1[1];
            baterT1[1] = temp;
            localStorage.setItem('Strike2', JSON.stringify(baterT1));
          } else {
            const temp = baterT2[0];
            baterT2[0] = baterT2[1];
            baterT2[1] = temp;
            localStorage.setItem('Strike2', JSON.stringify(baterT2));
          }
        }
      }
    }
  };

  // Adjust the player index based on the number of overs
  let adjustedIndex = 11 - ov2;

  useEffect(() => {
    localStorage.setItem("Wkts", wk);
    localStorage.setItem("DusriPari", dusriPari);
    localStorage.setItem("Ov2", ov2);
    localStorage.setItem("Gennde", gennd);
  }, [wk, dusriPari, ov2, gennd]);

  const res = () => {
    navigate('/result')
  }


  return (
    <>
      <div className="flex justify-around items-center pt-20 px-10">
        {/*SCORE BOARD */}
        <div>
          <h1 className="text-[32px] font-[700] text-blue-800">SCORE BOARD: <span className="font-[400] text-2xl text-red-600">Second-Innings</span></h1>
          {optedTo === "BATTING" ? (
            //IF Opted BATTING
            <div className="bg-[#384136] w-[500px] m-auto my-3 py-2 px-4 rounded-lg border-2 border-white">
              <div>
                <h2 className="text-[30px] font-[600] text-white">Batting: </h2>
                <div className="text-2xl font-[500] text-[#42accf]">
                  {oposition}: {dusriPari} / {wk}{" "}
                </div>
                <div className="text-lg font-[500] text-[#c8e253] my-2 py-2  border border-green-500 px-2">
                  {selectedTeam === "T1" ? ( //IF SELECTED TEAM OPTED BAT is T1
                    <>
                      {baterT2 &&
                        <>
                          <div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT2[0]}</p>{" "}
                              <div
                                className="w-[10px] h-[10px] rounded-full bg-green-400"
                              ></div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT2[1]}</p>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  ) : (
                    //IF SELECTED TEAM OPTED BAT is T2
                    <>
                      {baterT1 &&
                        <>
                          <div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT1[0]}</p>{" "}
                              <div
                                className="w-[10px] h-[10px] rounded-full bg-green-400"
                              ></div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT1[1]}</p>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-3"></div>
              <div>
                <h2 className="text-[30px] font-[600] text-white">Bowling: </h2>
                <div className="text-2xl font-[500] text-[#42accf]">
                  {selectedTeam}: ({ov2}.{gennd})
                </div>
                <div className="text-lg font-[500] text-[#c8e253] my-1 py-2  border border-green-500 px-2">
                  {selectedTeam === "T1" ? (
                    <>
                      {teamOne &&
                        teamOne.map((plyr, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <p>{plyr[`p${adjustedIndex}`]}</p>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {teamTwo &&
                        teamTwo.map((plyr, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <p>{plyr[`p${adjustedIndex}`]}</p>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            //IF OPTED TO BALL
            <div className="bg-[#384136] w-[500px] m-auto my-3 py-2 px-4 rounded-lg border-2 border-white">
              <div>
                <h2 className="text-[30px] font-[600] text-white">Batting: </h2>
                <div className="text-2xl font-[500] text-[#42accf]">
                  {selectedTeam}: {dusriPari} / {wk}{" "}
                </div>
                <div className="text-lg font-[500] text-[#c8e253] my-2 py-2  border border-green-500 px-2">
                  {selectedTeam === "T1" ? ( //If SelectedTEAM is T1 Opted BALL then T2 for BAT in Secon Inning
                    <>
                      {baterT1 &&
                        <>
                          <div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT1[0]}</p>{" "}
                              <div
                                className="w-[10px] h-[10px] rounded-full bg-green-400"
                              ></div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT1[1]}</p>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  ) : (
                    //If SelectedTEAM is T2 Opted BALL then T2 for BAT in Secon Inning
                    <>
                      {baterT2 &&
                        <>
                          <div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT2[0]}</p>{" "}
                              <div
                                className="w-[10px] h-[10px] rounded-full bg-green-400"
                              ></div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <p>{baterT2[1]}</p>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-3"></div>
              <div>
                <h2 className="text-[30px] font-[600] text-white">Bowling: </h2>
                <div className="text-2xl font-[500] text-[#42accf]">
                  {oposition}: ({ov2}.{gennd})
                </div>
                <div className="text-lg font-[500] text-[#c8e253] my-1 py-2  border border-green-500 px-2">
                  {otherTeam === "T1" ? (
                    <>
                      {teamOne &&
                        teamOne.map((plyr, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <p>{plyr[`p${adjustedIndex}`]}</p>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {teamTwo &&
                        teamTwo.map((plyr, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <p>{plyr[`p${adjustedIndex}`]}</p>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/*UPDATE SCORE BOARD */}
        <div>
          <h1 className="text-[32px] font-[600] text-blue-800 text-center">
            <i>UPDATE SCORE BOARD: </i>
          </h1>
          <div className="w-[500px] bg-[#384136] rounded-lg py-2 text-white border border-black m-auto grid grid-cols-4 text-center">
            <div
              onClick={() => { handleAddRuns(0), handleStrikeOnEvenRun() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              0
            </div>
            <div
              onClick={() => { handleAddRuns(1), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              1
            </div>
            <div
              onClick={() => { handleAddRuns(2), handleStrikeOnEvenRun() }}
              className="cursor-pointer m-auto mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              2
            </div>
            <div
              onClick={() => { handleAddRuns(3), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              3
            </div>
            <div
              onClick={() => { handleAddRuns(4), handleStrikeOnEvenRun() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-green-600 py-1 w-16 "
            >
              4
            </div>
            <div
              onClick={() => { handleAddRuns(5), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              5
            </div>
            <div
              onClick={() => { handleAddRuns(6), handleStrikeOnEvenRun() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-green-600 py-1 w-16 "
            >
              6
            </div>
            <div
              onClick={() => handleExtraRuns(1)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-yellow-500 py-1 w-16 "
            >
              WD
            </div>
            <div
              onClick={() => { handleExtraRuns(2), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-yellow-500 py-1 w-16 "
            >
              2WD
            </div>
            <div
              onClick={() => handleExtraRuns(3)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-yellow-500 py-1 w-16 "
            >
              3WD
            </div>
            <div
              onClick={() => { handleExtraRuns(4), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-yellow-500 py-1 w-16 "
            >
              4WD
            </div>
            <div
              onClick={() => handleExtraRuns(5)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-yellow-500 py-1 w-16 "
            >
              5WD
            </div>
            <div
              onClick={() => handleExtraRuns(1)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              NB
            </div>
            <div
              onClick={() => { handleExtraRuns(2), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              1NB
            </div>
            <div
              onClick={() => handleExtraRuns(3)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              2NB
            </div>
            <div
              onClick={() => { handleExtraRuns(4), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              3NB
            </div>
            <div
              onClick={() => handleExtraRuns(5)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              4NB
            </div>
            <div
              onClick={() => handleExtraRuns(6)}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-violet-600 py-1 w-16 "
            >
              6NB
            </div>
            <div
              onClick={() => { handleAddRuns(1), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              1B
            </div>
            <div
              onClick={() => { handleAddRuns(2), handleStrikeOnEvenRun() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              2B
            </div>
            <div
              onClick={() => { handleAddRuns(3), toggleVisibility() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              3B
            </div>
            <div></div>
            <div></div>
            <div
              onClick={() => { handleAddRuns(4), handleStrikeOnEvenRun() }}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-blue-600 py-1 w-16 "
            >
              4B
            </div>
            <div></div>
            <div
              onClick={handleWkts}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-red-600 py-1 w-16 mb-2 text-white"
            >
              OUT
            </div>
            <div
              onClick={handleUndo}
              className="m-auto cursor-pointer mt-2 rounded-full text-xl font-[500] bg-green-800 py-1 w-[76px] mb-2 text-white"
            >
              UNDO
            </div>
          </div>
        </div>
      </div>

      {second !== null && (
        <div className="text-white text-[30px] bg-blue-800 my-10 m-auto w-[850px] py-3 text-center">2nd Innings has been completed. Click here for <span className="text-blue-300 cursor-pointer" onClick={res}><i><u>Match Result</u></i></span></div>
      )}
    </>
  );
};

import React from 'react'
import { useGetTeamOneQuery, useGetTeamTwoQuery } from "../../../App/FEATURES/Api";

export const PlyrTable = () => {

    const {
        data: teamOne,
        isLoading: team1Loading,
        isError: team1Error,
      } = useGetTeamOneQuery();
      const {
        data: teamTwo,
        isLoading: team2Loading,
        isError: team2Error,
      } = useGetTeamTwoQuery();
    
    //   const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
      const optedTo = JSON.parse(localStorage.getItem("optedTo"));
    
      if (team1Loading || team2Loading) {
        return (
          <h1 className="text-[40px] text-center font-bold text-blue-800">...LOADING...</h1>
        );
      }
    
      if (team1Error || team2Error) {
        return (
          <p className="text-red-600 text-center text-xl font-[600]">Some Error occured while fethcing the Data.</p>
        );
      };

  return (
    <div className="flex w-[800px] text-center m-auto mt-2 bg-blue-900 text-blue-200">
        <div className="w-[50%]">
            {teamOne.map((plyr, indx) => (
                <div key={indx} className="w-full">
                  <h1 className="border border-black bg-green-500 text-[20px] font-[600] text-black">TOSS WON <span className="text-[17px] ">({optedTo})</span></h1>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p1}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p2}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p3}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p4}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p5}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p6}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p7}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p8}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p9}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p10}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p11}
                  </div>
                </div>
            ))}
        </div>

        <div className="w-[50%]">
            {teamTwo.map((plyr, i) => (
                <div key={i} className="w-full">
                  <h1 className="border border-black bg-red-500 text-[20px] font-[600] text-black">Oposition</h1>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p1}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p2}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p3}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p4}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p5}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p6}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p7}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p8}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p9}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p10}
                  </div>
                  <div className="w-[100%] py-1 font-[500] text-lg border border-black hover:bg-blue-800">
                    {plyr.p11}
                  </div>
                </div>
            ))}
        </div>
    </div>
  )
}

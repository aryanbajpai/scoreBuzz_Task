// import React from 'react'

// export const ViewList = () => {
//   return (
//     <div>ViewList</div>
//   )
// }


import React, { useEffect, useState } from 'react';
import { useUseHistoryQuery } from '../../../App/FEATURES/Api';

export const ViewList = () => {
    // Initial states
    const [selectedTeam, setSelectedTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || []);
    const [optedTo, setOptedTo] = useState(JSON.parse(localStorage.getItem('optedTo')) || []);
    const [otherTeam, setOtherTeam] = useState(null);
    const [runs, setRuns] = useState(localStorage.getItem('RUNS') || 0);
    const [ovrs, setOvrs] = useState(localStorage.getItem('Overs') || 0);
    const [balls, setBalls] = useState(localStorage.getItem('Balls') || 0);
    const [wickets, setWickets] = useState(localStorage.getItem('WKTS') || 0);

    const {data: commentaryData, error, isLoading} = useUseHistoryQuery();

    {isLoading && <h1>LOADING...</h1>}
    {error && <h1>An ERROR occured</h1>}

    useEffect(() => {
      //selected Teams
        if (selectedTeam === "T1") {
            setOtherTeam("T2");
        } else {
            setOtherTeam("T1");
        }
    }, [selectedTeam]);

    return (
      <div>
          <h1 className='text-[35px] font-[600] text-center '><i>Commentary</i></h1>
          <table className='w-[700px] m-auto text-center border bg-blue-800'>
              <thead>
                  <tr className='border text-white text-lg'>
                      <th className='border w-[40%] py-1'>Commentary</th>
                      <th className='border w-[20%]'>Runs</th>
                      <th className='border w-[20%]'>Overs</th>
                      <th className='border w-[20%]'>Wickets</th>
                  </tr>
              </thead>
              <tbody>
                  {commentaryData && commentaryData.map( (i, index) => (
                    <tr key={index} className='text-lg text-blue-300'>
                       <td className='border py-1 text-yellow-300'>{i.action}</td>
                       <td className='border'>{i.runs}</td>
                       <td className='border'>{i.ovrs}.{i.balls}</td>
                       <td className='border'>{i.wkts}</td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

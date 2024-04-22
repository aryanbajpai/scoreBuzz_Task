import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ViewList } from './ViewList';

export const Viewer = () => {

  const selectedTeam = JSON.parse(localStorage.getItem('selectedTeam')) || [];
  const optedTo = JSON.parse(localStorage.getItem('optedTo')) || [];
  const runs = JSON.parse(localStorage.getItem('RUNS')) || 0;
  const ovrs = JSON.parse(localStorage.getItem('Overs')) || 0;
  const wkts = JSON.parse(localStorage.getItem('WKTS')) || 0;
  const balls = JSON.parse(localStorage.getItem('Balls')) || 0;
  const [otherTeam, setOtherTeam] = useState(null)

  useEffect( () => {
    if( selectedTeam === "T1"){
        setOtherTeam("T2");
    } else {
        setOtherTeam("T1");
    }
    localStorage.setItem('otherTeam', JSON.stringify(otherTeam))
}, [selectedTeam, otherTeam]);

  return (
    <div>
        {optedTo === 'BATTING' ? (
           <>
           <div className='bg-white m-3 py-2 px-4'>
              <p className='text-xl font-[500]'>{selectedTeam}: {runs} / {wkts} ({ovrs}.{balls})</p>
              <p className='text-xl font-[500]'>{otherTeam}: Yet to bat</p>
              <p className='text-red-600 text-lg'>{selectedTeam} won the Toss and elected to {optedTo}</p>
           </div>
           <ViewList/>
           </>
        ) : (
          <>
          <div className='bg-white m-3 py-2 px-4'>
              <p className='text-xl font-[500] my-1'>{selectedTeam}: {runs} / {wkts} ({ovrs}.{balls})</p>
              <p className='text-xl font-[500] my-1'>{otherTeam}: Yet to bat</p>
              <p className='text-red-600 text-lg mt-2 text-center'>{selectedTeam} won the Toss and elected to {optedTo}</p>
           </div>
           <ViewList/>
          </>
        )}
    </div>
  )
}


// <Link to={'/viewerList'} >
//             <div className='bg-white m-3'>
//               <p>T1 vs T2</p>
//               <div>T1: Runs / Wkts (Overs)</div>
//             </div>
//         </Link>
import React, { useEffect, useState } from 'react'
import { ViewList } from './ViewList';

export const Viewer = () => {

  const selectedTeam = JSON.parse(localStorage.getItem('selectedTeam')) || [];
  const optedTo = JSON.parse(localStorage.getItem('optedTo')) || [];
  const runs = JSON.parse(localStorage.getItem('RUNS')) || 0;
  const ovrs = JSON.parse(localStorage.getItem('Overs')) || 0;
  const wkts = JSON.parse(localStorage.getItem('WKTS')) || 0;
  const balls = JSON.parse(localStorage.getItem('Balls')) || 0;
  const [otherTeam, setOtherTeam] = useState(null)

  useEffect(() => {
    if (selectedTeam === "T1") {
      setOtherTeam("T2");
    } else {
      setOtherTeam("T1");
    }
    localStorage.setItem('otherTeam', JSON.stringify(otherTeam))
  }, [selectedTeam, otherTeam]);

  const runs2 = JSON.parse(localStorage.getItem('DusriPari')) || 0;
  const wk = JSON.parse(localStorage.getItem('Wkts')) || 0;
  const ov2 = JSON.parse(localStorage.getItem('Ov2')) || 0;
  const gennd = JSON.parse(localStorage.getItem('Gennde')) || null;

  return (
    <div className='h-auto max-h-auto bg-[#9db0ff]'>
      {optedTo === 'BATTING' ? (
        <>
          <div className='bg-white my-3 py-2 px-4 max-w-[1080px] m-auto'>
            <p className='text-red-600 text-lg mb-2'>{selectedTeam} won the Toss and elected to {optedTo}</p>
            <div className='w-[300px] border-2 border-blue-600 p-3 m-1'>
              <p className='text-xl font-[500]'>{selectedTeam}: <span className='text-orange-500'>{runs} / {wkts}</span> <span className='text-green-500'>({ovrs}.{balls})</span></p>
              <div className='mx-2 text-[20px] text-fuchsia-700'>
              </div>
              { runs2 === 0  ? (
                <p className='text-xl font-[500] mt-1'>{otherTeam}: <span className='text-yellow-500'>Yet to bat</span></p>
              ) : (
                <p className='text-xl font-[500] mt-1'>{otherTeam}: <span className='text-yellow-500'>{runs2} / {wk} <span className='text-green-500'>({ov2}.{balls})</span></span></p>
              )}
            </div>
          </div>
          <ViewList />
        </>
      ) : (
        <>
          <div className='bg-white my-3 py-2 px-4 max-w-[1080px] m-auto'>
            <p className='text-red-600 text-lg mb-2'>{selectedTeam} won the Toss and elected to {optedTo}</p>
            <div className='bg-white m-3 py-2 px-4'>
              <p className='text-xl font-[500] '>{otherTeam}: {runs} / {wkts} ({ovrs}.{balls})</p>
              <div className='mx-2 text-[20px] text-fuchsia-700'>
              </div>
              { runs2 < 0 ? (
                <p className='text-xl font-[500] mt-1'>{selectedTeam}: <span className='text-yellow-500'>Yet to bat</span></p>
              ) : (
                <p className='text-xl font-[500] mt-1'>{selectedTeam}: <span className='text-yellow-500'>{runs2} / {wk} <span className='text-green-500'>({ov2}.{gennd})</span></span></p>
              )}
            </div>
          </div>
          <ViewList />
        </>
      )}
    </div>
  )
};


{/* <>
          <div className='bg-white my-3 py-2 px-4 max-w-[1080px] m-auto'>
            <p className='text-red-600 text-lg mb-2'>{selectedTeam} won the Toss and elected to {optedTo}</p>
            <div className='w-[300px] border-2 border-blue-600 p-3 m-1'>
              <p className='text-xl font-[500]'>{selectedTeam}: <span className='text-orange-500'>{runs} / {wkts}</span> <span className='text-green-500'>({ovrs}.{balls})</span></p>
              <div className='mx-2 text-[20px] text-fuchsia-700'>
              </div>
              <p className='text-xl font-[500] mt-1'>{otherTeam}: <span className='text-yellow-300'>Yet to bat</span></p>
            </div>
          </div>
          <ViewList />
        </> */}
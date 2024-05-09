import React from 'react'
import { useGetTeamOneQuery, useGetTeamTwoQuery } from '../../App/FEATURES/Api'


export const Teamtable = () => {

    //Fetch data from Server
    const { data: teamOne, isLoading: team1Loading, isError: team1Error} = useGetTeamOneQuery();
    const { data: teamTwo, isLoading: team2Loading, isError: team2Error} = useGetTeamTwoQuery();

    if( team1Loading || team2Loading) {
        return <h1 className='text-[40px] text-center font-bold text-blue-800'>...LOADING...</h1>
    }

    if( team1Error || team2Error){
        return <p className='text-red-600 text-center text-xl font-[600]'>Some Error occured while fethcing the Data.</p>
    }

    return (
        <div>
          <h2 className='text-3xl font-[600] mt-3'>Team 1</h2>
          <table className='border border-black w-[800px] text-center text-lg bg-green-800 text-white'>
            <tbody>
              {teamOne.map((player, index) => (
                <tr key={index}>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p1}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p2}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p3}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p4}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p5}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p6}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p7}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p8}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p9}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p10}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p11}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <h2 className='text-3xl font-[600] mt-5'>Team 2</h2>
          <table className='border border-black w-[800px] text-center text-lg bg-red-800 text-white'>
            <tbody>
              {teamTwo.map((player, index) => (
                <tr key={index}>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p1}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p2}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p3}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p4}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p5}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p6}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p7}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p8}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p9}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p10}</td>
                  <td className='border border-black py-2 w-[9.09%]'>{player.p11}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

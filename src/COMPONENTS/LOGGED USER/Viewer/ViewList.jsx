import React, { useEffect, useState } from 'react';
import { useUseHistoryOneQuery, useUseHistoryTwoQuery } from '../../../App/FEATURES/Api';

export const ViewList = () => {
    // Initial states
    const [selectedTeam, setSelectedTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || []);
    const [otherTeam, setOtherTeam] = useState(null);
    const firstRun = JSON.parse(localStorage.getItem('RUNS')) || 0;
    const secondRun = JSON.parse(localStorage.getItem('DusriPari')) || 0;


    const { data: commentaryData1, error, isLoading } = useUseHistoryOneQuery();
    const { data: commentaryData2, error: Er2, isLoading: Ld } = useUseHistoryTwoQuery();

    { isLoading && <h1>LOADING...</h1> }
    { error && <h1>An ERROR occured</h1> }

    { Ld && <h1>LOADING...</h1> }
    { Er2 && <h1>An ERROR occured</h1> }

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
            {firstRun !== 0 && (
                <>
                    <h1 className='text-center text-[28px] font-[600] text-violet-700'>First Inning</h1>
                    <table className='w-[700px] m-auto text-center border bg-blue-800'>

                        <thead>
                            <tr className='border text-white text-lg'>
                                <th className='border py-1'>Commentary</th>
                                <th className='border'>Overs</th>
                                <th className='border'>Runs</th>
                                <th className='border'>Total runs</th>
                                <th className='border'>Wickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            { commentaryData1 && commentaryData1.map((i, index) => (
                                <tr key={index} className='text-lg text-blue-300'>
                                    <td className='border py-1 text-yellow-300'>{i.action}</td>
                                    <td className='border'>{i.ovrs}.{i.balls}</td>
                                    <td className='border'>{i.run}</td>
                                    <td className='border'>{i.runs}</td>
                                    <td className='border'>{i.wkts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {secondRun !== 0 && (
                <>
                    <h1 className='text-center text-[28px] font-[600] text-violet-700 mt-3'>Second Inning</h1>
                    <table className='w-[700px] m-auto text-center border bg-blue-800 mb-3'>
                        <thead>
                            <tr className='border text-white text-lg'>
                                <th className='border py-1'>Commentary</th>
                                <th className='border'>Overs</th>
                                <th className='border'>Runs</th>
                                <th className='border'>Total runs</th>
                                <th className='border'>Wickets</th>
                            </tr>
                        </thead>
                        <tbody>
                        {commentaryData2 && commentaryData2.map((i, index) => (
                                <tr key={index} className='text-lg text-blue-300'>
                                    <td className='border py-1 text-yellow-300'>{i.action}</td>
                                    <td className='border'>{i.Ovrs}.{i.Balls}</td>
                                    <td className='border'>{i.run}</td>
                                    <td className='border'>{i.Runs}</td>
                                    <td className='border'>{i.Wkts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

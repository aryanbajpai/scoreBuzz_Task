import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addRuns } from '../../../App/FEATURES/countrunsSlice';
import { useAddHistoryMutation, useUndoHistoryMutation, useUseHistoryQuery } from '../../../App/FEATURES/Api';

export const StartMatch = () => {

    const selectedTeam = JSON.parse(localStorage.getItem('selectedTeam')) || [];
    const optedTo = JSON.parse(localStorage.getItem('optedTo')) || [];
    const [otherTeam, setOtherTeam] = useState(null)
    const [runs, setRuns] = useState(localStorage.getItem('RUNS') || 0);
    const [wkts, setWkts] = useState(localStorage.getItem('WKTS') || 0);
    const [ovrs, setOvrs] = useState(localStorage.getItem('Overs') || 0);
    const [balls, setBalls] = useState(localStorage.getItem('Balls') || 0);
    const dispatch = useDispatch();
    
    useEffect( () => {
        if( selectedTeam === "T1"){
            setOtherTeam("T2");
        } else {
            setOtherTeam("T1");
        }
        localStorage.setItem('otherTeam', JSON.stringify(otherTeam))
    }, [selectedTeam, otherTeam]);

    const [addHistory] = useAddHistoryMutation();
    const {data: commentaryData} = useUseHistoryQuery();
    if(commentaryData && commentaryData.length > 0){
        console.log(commentaryData)
        const latestComment = commentaryData[commentaryData.length - 1];
        console.log(latestComment.run)
    }
    const [dltCommentary] = useUndoHistoryMutation();

    const handleAddRuns = (run) => {
        if (ovrs < 5) {
            const total = runs + run;
            setRuns(total);
            // Update balls
            if (balls < 5) {
                setBalls(prevBalls => prevBalls + 1);
            } else {
                setBalls(0);
                setOvrs(prevOvers => prevOvers + 1);
            }
        }
        // Dispatch the action to update the runs count in the Redux store
        dispatch(addRuns(runs));
        addHistory({ action:'Runs Scored', runs: runs + run, run, ovrs, balls: balls+1, wkts: wkts});
    }

    const handleExtraRuns = (run) => {
        dispatch(addRuns(run));
        const total = runs + run;
        setRuns(total);
        addHistory({ action:'Extra runs given', runs: total, run, ovrs, balls: balls+1, wkts: wkts})
    }

    const handleWkts = () => {
        // Update wickets
        if (wkts < 10) {
            setWkts(prevWickets => prevWickets + 1);
        }
        // Update balls
        if (balls < 5) {
            setBalls(prevBalls => prevBalls + 1);
        } else {
            setBalls(0);
            setOvrs(prevOvers => prevOvers + 1);
        }
        //add Action and update Commentary server
        addHistory( {action:'Fall of Wicket', runs: runs, run, ovrs, balls: balls+1, wkts: wkts});
    }

    const handleUndo = async () => {
        if(commentaryData && commentaryData.length > 0){
            console.log(commentaryData)
            const latestComment = commentaryData[commentaryData.length - 1];
            console.log(latestComment)
            try {
                // Delete the latest added data from the commentary server
                await dltCommentary(latestComment.id).unwrap();
                
                // Remove the previous taken step from the local state
                setRuns(prevRuns => prevRuns - latestComment.run);
                setWkts(prevWkts => prevWkts - (latestComment.action === 'Fall of Wicket' ? 1 : 0));
                
                // Update balls and overs based on the action
                if( balls > 0) {
                    setBalls(latestComment.balls-1)
                } else if( balls === 0){
                    setBalls(5);
                    setOvrs(prevOvrs => prevOvrs - 1);
                }
            } catch (error) {
                console.error('Error occurred while undoing:', error);
            }
        }
    }

    useEffect( () => {
        localStorage.setItem('WKTS', JSON.stringify(wkts));
        localStorage.setItem('RUNS', JSON.parse(runs));
        localStorage.setItem('Overs', JSON.stringify(ovrs));
        localStorage.setItem('Balls', JSON.stringify(balls));
    }, [wkts, runs, ovrs, balls])


    return (
        <div>
        <h1 className='text-[32px] font-[600] text-center'>SCORE BOARD: </h1>
            {optedTo === 'BATTING' ? (
                <div className='bg-[#384136] w-[500px] m-auto my-3 py-2 px-4'>
                    <div>
                        <h2 className='text-[30px] font-[600] text-white'>Batting: </h2>
                        <div className='text-lg font-[500] text-[#42accf]'>{selectedTeam}: {runs} / {wkts} </div>
                    </div>
                    <div className='w-full h-[1px] bg-white mt-2'></div>
                    <div>
                        <h2 className='text-[30px] font-[600] text-white'>Bowling: </h2>
                        <div className='text-lg font-[500] text-[#42accf]'>{otherTeam}: ({ovrs}.{balls})</div>
                    </div>
                </div>
            ) : (
                <div className='bg-[#384136] w-[500px] m-auto my-3 py-2 px-4'>
                    <div>
                        <h2 className='text-[30px] font-[600] text-white'>Batting: </h2>
                        <div className='text-lg font-[500] text-[#42accf]'>{otherTeam}: {runs} / {wkts} </div>
                    </div>
                    <div className='w-full h-[1px] bg-white mt-2'></div>
                    <div>
                        <h2 className='text-[30px] font-[600] text-white'>Bowling: </h2>
                        <div className='text-lg font-[500] text-[#42accf]'>{selectedTeam}: ({ovrs}.{balls})</div>
                    </div>
                </div>
            )}

            <h1 className='text-[32px] font-[600]'><i>UPDATE SCORE BOARD: </i></h1>
            <div className='w-[500px] border border-black m-auto grid grid-cols-4 text-center'>
            <div onClick={() => handleAddRuns(0)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>0</div>
                <div onClick={() => handleAddRuns(1)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>1</div>
                <div onClick={() => handleAddRuns(2)} className='cursor-pointer m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>2</div>
                <div onClick={() => handleAddRuns(3)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>3</div>
                <div onClick={() => handleAddRuns(4)} className='m-auto mt-2 rounded-full text-lg bg-green-600 py-1 w-16 '>4</div>
                <div onClick={() => handleAddRuns(5)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>5</div>
                <div onClick={() => handleAddRuns(6)} className='m-auto mt-2 rounded-full text-lg bg-green-600 py-1 w-16 '>6</div>
                <div onClick={() => handleExtraRuns(1)} className='m-auto mt-2 rounded-full text-lg bg-yellow-500 py-1 w-16 '>WD</div>
                <div onClick={() => handleExtraRuns(2)} className='m-auto mt-2 rounded-full text-lg bg-yellow-500 py-1 w-16 '>2WD</div>
                <div onClick={() => handleExtraRuns(3)} className='m-auto mt-2 rounded-full text-lg bg-yellow-500 py-1 w-16 '>3WD</div>
                <div onClick={() => handleExtraRuns(4)} className='m-auto mt-2 rounded-full text-lg bg-yellow-500 py-1 w-16 '>4WD</div>
                <div onClick={() => handleExtraRuns(5)} className='m-auto mt-2 rounded-full text-lg bg-yellow-500 py-1 w-16 '>5WD</div>
                <div onClick={() => handleExtraRuns(1)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>NB</div>
                <div onClick={() => handleExtraRuns(2)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>1NB</div>
                <div onClick={() => handleExtraRuns(3)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>2NB</div>
                <div onClick={() => handleExtraRuns(4)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>3NB</div>
                <div onClick={() => handleExtraRuns(5)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>4NB</div>
                <div onClick={() => handleExtraRuns(6)} className='m-auto mt-2 rounded-full text-lg bg-violet-600 py-1 w-16 '>6NB</div>
                <div onClick={() => handleAddRuns(1)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>1B</div>
                <div onClick={() => handleAddRuns(2)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>2B</div>
                <div onClick={() => handleAddRuns(3)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>3B</div>
                <div></div><div></div>
                <div onClick={() => handleAddRuns(4)} className='m-auto mt-2 rounded-full text-lg bg-blue-600 py-1 w-16 '>4B</div>
                <div></div> 
                <div onClick={handleWkts} className='m-auto mt-2 rounded-full text-lg bg-red-600 py-1 w-16 font-[500] mb-2 text-white'>OUT</div>
                <div onClick={handleUndo} className='m-auto mt-2 rounded-full text-lg bg-green-800 py-1 w-[76px] font-[500] mb-2 text-white'>UNDO</div>
            </div>
        </div>
    );
    
}

import React from 'react'

export const Result = () => {

    const firstInning = JSON.parse(localStorage.getItem('First_Innings')) || null;
    const secondInning = JSON.parse(localStorage.getItem('Second_Innings')) || null;
    const selectedTeam = JSON.parse(localStorage.getItem('selectedTeam')) || null;
    const optedTo = JSON.parse(localStorage.getItem('optedTo')) || [];

    // const[result, setResult] = JSON.parse(localStorage.getItem('Result')) || null;

    const win1 = firstInning.Total > secondInning.Total;
    const win1Diff = firstInning.Total - secondInning.Total;
    const win2Diff = 10 - secondInning.Wickets;
    const win2 = secondInning.Total > firstInning.Total;
    const win3 = secondInning.Total === firstInning.Total;

    if( win1 ){
        localStorage.setItem('Result', JSON.stringify(firstInning.Team));
    } else if(win2){
        localStorage.setItem('Result', JSON.stringify(secondInning.Team));
    }else if(win3) {
        localStorage.setItem('Result', "Match Tied.");
    }

    return (
        <div>
            {win1 ? (
                <>
                    <div className='text-center text-[40px] font-[600] my-5 text-[#632e92]'>{firstInning.Team} won by {win1Diff} runs.</div>
                    <h1 className='text-red-500 text-[30px] font-semibold text-center'>{selectedTeam} won the TOSS and elected {optedTo}</h1>
                    <div className=' my-10 m-auto w-[750px]'>
                        <div className='flex justify-around'>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>First Inning: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{firstInning.Team}: {firstInning.Total} / {firstInning.Wickets} - ({firstInning.Overs}.{firstInning.Balls})</p>
                                </div>
                            </div>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>Second Innings: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{secondInning.Team}: {secondInning.Total} / {secondInning.Wickets} - ({secondInning.Overs}.{secondInning.Balls})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='text-center text-[40px] font-[600] my-5 text-[#632e92]'>{secondInning.Team} won by {win2Diff} wickets.</div>
                    <h1 className='text-red-500 text-[30px] font-semibold text-center'>{selectedTeam} won the TOSS and elected {optedTo}</h1>
                    <div className=' my-10 m-auto w-[750px]'>
                        <div className='flex justify-around'>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>First Inning: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{firstInning.Team}: {firstInning.Total} / {firstInning.Wickets} - ({firstInning.Overs}.{firstInning.Balls})</p>
                                </div>
                            </div>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>Second Innings: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{secondInning.Team}: {secondInning.Total} / {secondInning.Wickets} - ({secondInning.Overs}.{secondInning.Balls})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            { win3 && (
                <>
                    <div className='text-center text-[40px] font-[600] my-5 text-[#632e92]'>Match Tied.</div>
                    <h1 className='text-red-500 text-[30px] font-semibold text-center'>{selectedTeam} won the TOSS and elected {optedTo}</h1>
                    <div className=' my-10 m-auto w-[750px]'>
                        <div className='flex justify-around'>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>First Inning: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{firstInning.Team}: {firstInning.Total} / {firstInning.Wickets} - ({firstInning.Overs}.{firstInning.Balls})</p>
                                </div>
                            </div>
                            <div className='border-2 border-black bg-blue-700 text-white py-3 px-5'>
                                <p className='text-[25px] font-[600]'>Second Innings: </p>
                                <div>
                                    <p className='text-[25px] font-[600]'>{secondInning.Team}: {secondInning.Total} / {secondInning.Wickets} - ({secondInning.Overs}.{secondInning.Balls})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

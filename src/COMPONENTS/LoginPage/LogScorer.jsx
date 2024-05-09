import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogScorer = () => {
    const [formData, setFormData] = useState({}); // Initialize formData as an empty object
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const scorer = [
        {
            username: "User1",
            password: "Pswd1",
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const matchData = JSON.parse(localStorage.getItem('matchData')) || [];
        console.log(matchData)
        if( matchData.length !== 0) {
            navigate('/firstinning')
        } else if ( matchData.length === 0 ){
            // Validate credentials
            const findScorer = scorer.find(user => user.username === formData.username && user.password === formData.password);
            if (findScorer) {
                // Successful login
                navigate('/scorer');
            } else {
                // Invalid credentials
                setError("Invalid Username or Password");
            }
        }
    };

    return (
        <div className='m-5 '>
            <form onSubmit={handleSubmit} className='border border-blue-700 w-[450px] py-3 m-auto'>
            <h2 className='text-[35px] font-[600] text-center'>Scorers Login Form</h2>
                {/* Conditional Rendering: checks length of Array */}
                 {/*MAP :  Itrates over each Elem and executes provided function that recieves user and index as parameter */}
                {scorer.length > 0 && (
                    scorer.map((user, index) => (  
                        <div key={index} className='p-3'>
                        {/* get array of KEY and MAP over key-value Pair */}
                            {Object.keys(user).map((key, i) => (
                                <div key={i} className='py-1'>
                                                                                     {/* uses 1st letter of KEY and makes it Uppercase and concat to rest of the string */}
                                    <label className='text-white font-[500] text-lg'>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                                    <input 
                                        onChange={handleChange} 
                                        className='w-full py-1 px-3 my-1 rounded-full text-blue-700 font-[500] outline-none focus:border-b-2 border-blue-600'
                                        type={(key === 'password') ? 'password' : 'text'} 
                                        name={key} 
                                        placeholder={`Enter your ${key.charAt(0).toUpperCase() + key.slice(1)}...`} 
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                )}
                <div className='text-center'><button type='submit' className='py-1 px-4 border border-blue-700 bg-white'>Login</button></div>
                {error && <p className='text-right text-red-600'>{error}</p>}
            </form>
        </div>
    );
};

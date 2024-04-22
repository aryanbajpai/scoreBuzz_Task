import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LogViewer = () => {

    const [formData, setFormData] = useState({}); // Initialize formData as an empty object
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const viewer = [
        {
            username: "Viewer1",
            password: "Pswd2"
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

        // Validate credentials\
        const findViewer = viewer.find( view =>  view.username === formData.username && view.password === formData.password)

        if (findViewer) {
            // Successful login
            navigate('/viewer');
        } else {
            // Invalid credentials
            setError("Invalid Username or Password");
        }
    };

  return (
    <div className='m-5'>
            <form onSubmit={handleSubmit} className='border border-blue-700 w-[450px] py-3 m-auto'>
            <h2 className='text-[35px] font-[600] text-center'>Viewers Login Form</h2>
                {viewer.length > 0 && (
                    viewer.map((user, index) => (
                        <div key={index} className='p-3'>
                            {Object.keys(user).map((key, i) => (
                                <div key={i} className='py-1'>
                                    <label className='text-white font-[500] text-lg'>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                                    <input 
                                        onChange={handleChange} 
                                        className='w-full py-1 px-3 my-1 rounded-full text-blue-700 font-[500]'
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
  )
}

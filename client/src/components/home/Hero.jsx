import React from 'react'
import hero from "./hero.png";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hero = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user)

    // handleFormButtonClick
    const handleFormButtonClick = () => {
        if (user) {
            navigate('/filltheform');
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <section class="hero text-gray-900 bg-gray-200 body-font">
                <div class="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-medium text-gray-900">DK Recruitment</h1>
                        <p class="mb-8 sm:text-lg lg:text-xl leading-relaxed">"Welcome to DK Recruitment – Where Careers and Talent Converge."</p>

                       { user && user.role === "user" ? (<div class="flex justify-center">
                            <button onClick={handleFormButtonClick} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Fill The Form</button>
                        </div>):(null)}
                    </div>
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img class="object-cover object-center rounded" alt="hero" src={hero} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero

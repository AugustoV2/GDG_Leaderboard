
'use client'
import React from "react";
import ParticlesBackground from "./ui/particles";
import Mainpage from "./mainpage";

const LandingPage = () => {
    return (
        <div className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <ParticlesBackground />
           
               <Mainpage/>
            
        </div>
    );
};

export default LandingPage;

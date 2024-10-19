'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card";
import ParticlesBackground from "./ui/particles";

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<{ name: string; badges: number }[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from localStorage
    const storedData = localStorage.getItem('leaderboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Sort by badges and ensure badges are displayed as 0 if absent
      const sortedData = parsedData
        .map((entry: { name: string; badges: number }) => ({
          name: entry.name,
          badges: entry.badges || 0, // Default to 0 if badges are undefined or absent
        }))
        .sort((a: { badges: number; }, b: { badges: number; }) => b.badges - a.badges);

      setLeaderboardData(sortedData);
    }
  }, []);

  // Animation settings for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent dark:bg-gray-800 overflow-hidden">
      <ParticlesBackground />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto p-12">
          <motion.div
            className="grid grid-cols-1 gap-4 lg:grid-cols-1"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {leaderboardData.length > 0 ? (
              leaderboardData.map((leader, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <MagicCard
                    className="flex flex-1 flex-row  items-center space-x-[200px] justify-center p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto"
                    gradientColor="#D9D9D955"
                  >
                    <h3 className="text-base font-medium">{leader.name}</h3>
                    <p className="text-base font-semibold">Badges: {leader.badges}</p>
                  </MagicCard>

                </motion.div>
              ))
            ) : (
              <p>No leaderboard data available.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

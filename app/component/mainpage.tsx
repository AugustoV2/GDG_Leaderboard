'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card";
import ParticlesBackground from "./ui/particles";

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<{ name: string; badges: number }[]>([]);

  useEffect(() => {
    // Retrieve Blob ID from localStorage
    const savedBlobId = '1297128425545129984'; // Blob ID for the JSONBlob API
    if (savedBlobId) {
      // Fetch leaderboard data from JSONBlob using the Blob ID
      fetch(`https://jsonblob.com/api/jsonBlob/${savedBlobId}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure badges are displayed as 0 if absent and sort by badges
          const sortedData = data
            .map((entry: { name: string; badges: number }) => ({
              name: entry.name,
              badges: entry.badges || 0, // Default to 0 if badges are undefined
            }))
            .sort((a: { badges: number }, b: { badges: number }) => b.badges - a.badges);

          setLeaderboardData(sortedData);
        })
        .catch((error) => {
          console.error('Error fetching data from JSONBlob:', error);
        });
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
    <div className="relative min-h-screen w-full dark:bg-gray-800 overflow-hidden">
      {/* Particle background with lower z-index */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ParticlesBackground />
      </div>

      {/* Foreground content with higher z-index and pointer-events disabled */}
      <div className="relative z-10 pointer-events-none">
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
                    className="flex items-center space-x-[200px] justify-between p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto"
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

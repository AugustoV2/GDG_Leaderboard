'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card";
import ParticlesBackground from "./ui/particles";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<{ name: string; badges: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState<{ name: string; badges: number }[]>([]); // Filtered leaderboard data

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
          setFilteredData(sortedData); // Set initial filtered data
        })
        .catch((error) => {
          console.error('Error fetching data from JSONBlob:', error);
        });
    }
  }, []);

  // Function to return a classy background color based on the index (rank)
  const getRankColor = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-gold to-light-gold"; // Soft Gold gradient for 1st place
    if (index === 1) return "bg-gradient-to-r from-silver to-light-silver"; // Sleek Silver gradient for 2nd place
    if (index === 2) return "bg-gradient-to-r from-bronze to-light-bronze"; // Warm Bronze gradient for 3rd place
    return "bg-transparent"; // Default for other positions
  };

  // Handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter leaderboard data based on the search query
    const filtered = leaderboardData.filter((leader) =>
      leader.name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent dark:bg-gray-800 overflow-hidden">
      <ParticlesBackground />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Search bar */}
        <div className="container mx-auto p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for your name..."
            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-12">
          <motion.div
            className="grid grid-cols-1 gap-4 lg:grid-cols-1"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {filteredData.length > 0 ? (
              filteredData.map((leader, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <MagicCard
                    className={`flex items-center space-x-[200px] justify-between p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto ${getRankColor(index)}`}
                    gradientColor="#D9D9D955"
                  >
                    <h3 className="text-base font-medium">{leader.name}</h3>
                    <p className="text-base font-semibold">Badges: {leader.badges}</p>
                  </MagicCard>

                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

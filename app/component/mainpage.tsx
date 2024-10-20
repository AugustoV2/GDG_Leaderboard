"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card";
import ParticlesBackground from "./ui/particles";
import debounce from "lodash.debounce";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

interface LeaderboardEntry {
  name: string;
  badges: number;
  siNumber: number; // Permanent serial number for each user
}

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]); // Filtered leaderboard data

  useEffect(() => {
    const savedBlobId = "1297128425545129984"; // Blob ID for the JSONBlob API
    if (savedBlobId) {
      fetch(`https://jsonblob.com/api/jsonBlob/${savedBlobId}`)
        .then((response) => response.json())
        .then((data) => {
          const mappedData = data.map(
            (entry: { name: string; badges: number }, index: number) => ({
              name: entry.name,
              badges: entry.badges || 0,
              siNumber: index + 1, // Assign permanent SI number based on initial index
            })
          );

          // Sort data by badges but SI number remains unchanged
          const sortedData = mappedData.sort(
            (a: { badges: number }, b: { badges: number }) =>
              b.badges - a.badges
          );

          setLeaderboardData(sortedData);
          setFilteredData(sortedData);
        })
        .catch((error) => {
          console.error("Error fetching data from JSONBlob:", error);
        });
    }
  }, []);

  const getRankColor = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-gold to-light-gold";
    if (index === 1) return "bg-gradient-to-r from-silver to-light-silver";
    if (index === 2) return "bg-gradient-to-r from-bronze to-light-bronze";
    return "bg-transparent";
  };

  // Use `useCallback` to memoize the debounced function and avoid unnecessary re-renders
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filtered = leaderboardData.filter((leader) =>
        leader.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }, 300), // 300ms debounce delay
    [leaderboardData] // dependencies to re-calculate the filtered list
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    debouncedSearch(query); // Use the debounced search function
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent dark:bg-gray-800 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        {" "}
        {/* Adjust z-index of the navbar */}
        <Navbar />
      </div>

      {/* Content Below Navbar */}
      <div className="relative z-10 pt-24 md:pt-20 pointer-events-none">
        {" "}
        {/* Add top padding to move content down */}
        {/* Search bar */}
        <div className="container mx-auto p-4 pointer-events-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for your name..."
                className="w-full p-4 pl-12 text-lg rounded-lg sm:rounded-lg border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out bg-white bg-opacity-80" // Updated to reduce corner radius
              />
              {/* Replaced with search icon */}
              <svg
                className="h-6 w-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11a5 5 0 10-10 0 5 5 0 0010 0zm-2 6l5 5"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Leaderboard Content */}
        <div className="container mx-auto p-6 sm:p-12">
          {" "}
          {/* Reduced padding for mobile */}
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
                    className={`flex items-center justify-between p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto bg-opacity-80 bg-white backdrop-blur-md ${getRankColor(
                      index
                    )} pointer-events-auto`}
                    gradientColor="#D9D9D955"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Numbering placed on the left, centered vertically */}
                      <div className="flex-shrink-0 text-center w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-700">
                      {leader.siNumber}
                      </div>

                      {/* Name and badges aligned separately */}
                      <div className="flex flex-col">
                      <h3 className="text-base font-medium text-gray-800">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-600">
                        Badges: {leader.badges}
                      </p>
                      </div>
                    </div>
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

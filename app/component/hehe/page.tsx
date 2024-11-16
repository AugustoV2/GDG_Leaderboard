'use client';
import React, { useState } from "react";
import CSVReader from "react-csv-reader";

interface LeaderboardEntry {
  user_name: string;
  __of_skill_badges_completed: string;
  __of_arcade_games_completed: string; // Add this field
}

const blobId = '1297128425545129984';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, "_"),
};

const AdminCSVUpload = () => {
  const [data, setData] = useState<{ name: string; badges: number; arcadeGames: number }[]>([]);

  const handleForce = async (uploadedData: Array<LeaderboardEntry>) => {
    const leaderboardData = uploadedData.map((entry) => {
      const badges = parseInt(entry['__of_skill_badges_completed'], 10) || 0;
      const arcadeGames = parseInt(entry['__of_arcade_games_completed'], 10) || 0;
      
      return {
        name: entry['user_name'],
        badges,
        arcadeGames,
      };
    });

    leaderboardData.sort((a, b) => b.badges - a.badges);
    setData(leaderboardData);

    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));

    try {
      if (blobId) {
        await fetch(`https://jsonblob.com/api/jsonBlob/${blobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leaderboardData),
        });
        console.log('Data updated successfully');
      }
    } catch (error) {
      console.error('Error saving data to JSONBlob:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        CSV Leaderboard Upload
      </h2>

      {/* CSV File Upload */}
      <div className="flex justify-center mb-6">
        <CSVReader
          cssClass="w-full"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
          label={
            <span className="px-6 py-3 text-lg font-semibold text-blue-500 cursor-pointer transition-all duration-200">
              Select CSV File to Upload
            </span>
          }
        />
      </div>

      {/* Uploaded Data Display */}
      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Uploaded Data:</h3>
          <div className="bg-gray-100 rounded-lg p-4 shadow-inner">
            <ul className="space-y-2">
              {data.map((entry, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-2 rounded-lg shadow-sm hover:bg-gray-50 
                    ${entry.badges === 15 && entry.arcadeGames === 1 ? 'bg-green-500 text-white' : 'bg-white'}`}
                >
                  <span className="font-medium text-gray-800">
                    {entry.name}
                    {entry.badges === 15 && entry.arcadeGames === 1 && (
                      <span className="ml-2 text-xs text-green-100">Completed</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-600">{entry.badges} badges</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCSVUpload;

'use client';
import React, { useState } from "react";
import CSVReader from "react-csv-reader";

interface LeaderboardEntry {
  user_name: string;
  __of_skill_badges_completed: string;
}

const blobId = '1297128425545129984'; // Blob ID for the JSONBlob API

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, "_"),
};

const AdminCSVUpload = () => {
  const [data, setData] = useState<{ name: string; badges: number }[]>([]);
  
  const handleForce = async (uploadedData: Array<LeaderboardEntry>) => {
    console.log(uploadedData);
    const leaderboardData = uploadedData.map((entry) => ({
      name: entry['user_name'], // Adjusting to match the CSV header
      badges: parseInt(entry['__of_skill_badges_completed'], 10) || 0, // Default to 0 if undefined
    }));

    // Sort data based on number of badges
    leaderboardData.sort((a, b) => b.badges - a.badges);
    setData(leaderboardData);

    // Store this data in localStorage
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
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with Skill Badges Data"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      <p>Upload the CSV to update leaderboard data.</p>
      {data.length > 0 && (
        <div>
          <h2>Uploaded Data:</h2>
          <ul>
            {data.map((entry, index) => (
              <li key={index}>
                {entry.name} - {entry.badges} badges
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminCSVUpload;

import React from 'react';
import { progressData } from '../../dummy/data';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCard = ({ groupName }) => {
  // Find the group data by group name
  const groupData = progressData.find((data) => data.groupName === groupName);

  if (!groupData) {
    return null; // Return null if group data not found
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Progress</h2>
      <div className="flex items-center mb-2">
        <div className="w-1/3">{groupData.groupName}</div>
        <div className="w-2/3">
          <CircularProgressbar value={groupData.progress} />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;

import React from 'react';
import { statusData } from '../../dummy/data';

const StatusCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 overflow-auto h-full">
      <h2 className="text-lg font-semibold mb-4">Project Status</h2>
      {statusData.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h3 className="text-md font-semibold mb-2">{group.group}</h3>
          {group.projects.map((project, projectIndex) => (
            <div key={projectIndex} className="mb-4">
              <div className="text-sm font-medium mb-1">{project.name}</div>
              <div className="flex flex-wrap">
                {project.status.map((status, statusIndex) => (
                  <div key={statusIndex} className="flex items-center mr-2 mb-2">
                    <div className={`rounded-full h-4 w-4 ${statusIndex === 0 ? 'bg-red-500' : 'bg-blue-500'} mr-2`}></div>
                    <div className="text-sm">{status}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StatusCard;

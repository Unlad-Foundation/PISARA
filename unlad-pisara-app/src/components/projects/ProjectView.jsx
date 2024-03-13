import React, { useState } from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { mockedSchedulerData } from "../../dummy/data.js";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../../dummy/data.js";

const ProjectView = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [progress, setProgress] = useState(0);
  const [weight, setWeight] = useState(0);

  const project = dummyProjects.find(
    (project) => project.id === parseInt(projectId)
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  // Color indicator for weight
  const getWeightBackgroundColor = () => {
    if (weight <= 25) {
      return "bg-green-300"; // Good weight (green)
    } else if (weight <= 50) {
      return "bg-yellow-300"; // Moderate weight (yellow)
    } else if (weight <= 75) {
      return "bg-orange-300"; // High weight (orange)
    } else {
      return "bg-red-300"; // Worst weight (red)
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200 relative">
      {/* Top navigation/Header */}
      <div className="bg-white p-2 w-full shadow-lg z-10">
        <div className="grid grid-cols-4">
          <div className="mx-2">
            <h1 className="text-xl text-gray-800 font-bold">
              {" "}
              {project.name}{" "}
            </h1>
            <p className="text-l text-gray-500 font-semibold">
              {" "}
              {project.code}{" "}
            </p>
            <p className="text-l text-gray-800 font-semibold">
              {" "}
              Bryan Ron Hernandez
            </p>
          </div>

          <div>col2</div>

          {/* Progress Bar */}
          <div className="flex items-center">
            <div className="mx-1 flex flex-col items-center">
              <span className="text-l text-blue-600 font-semibold mb-1">
                {progress === 100 ? "Done" : "Progress"}
              </span>
              <div className="relative">
                <div className="w-44 h-10 overflow-hidden rounded-full bg-gray-200 shadow-lg">
                  <div
                    className={`h-full ${
                      progress === 100 ? "bg-green-500" : "bg-blue-300"
                    }`}
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.5s ease",
                    }}
                  >
                    {progress === 100 ? (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600">
                        {progress}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Weight Bar */}
          <div className="flex items-center">
            <div className="mx-1 flex flex-col items-center">
              <span className="text-l text-blue-600 font-semibold mb-1">
                Weight
              </span>
              <div className="relative">
                <div className="w-44 h-10 overflow-hidden rounded-full bg-gray-200 shadow-lg">
                  <div
                    className={`h-full bg-blue-300 ${getWeightBackgroundColor()}`}
                    style={{
                      width: `${weight}%`,
                      transition: "width 0.5s ease",
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600 font-semibold">
                      {weight}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content/React-scheduler component */}
      <div className="relative h-full mt-1">
        <Scheduler
          data={mockedSchedulerData}
          isLoading={isLoading}
          onRangeChange={(newRange) => console.log(newRange)}
          onTileClick={(clickedResource) => {
            setProgress(clickedResource.progress);
            setWeight(clickedResource.weight);
          }}
          onItemClick={(item) => {
            setProgress(item.progress);
            setWeight(item.weight);
          }} // Update progress and weight state when item is clicked
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1);
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0);
          }}
          config={{
            zoom: 0,
            filterButtonState,
          }}
        />
      </div>
    </div>
  );
};

export default ProjectView;

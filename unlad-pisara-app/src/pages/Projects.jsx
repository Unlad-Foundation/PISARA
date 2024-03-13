import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import CreateNew from '../forms/new-project';
import { Link } from 'react-router-dom';
import { dummyProjects } from '../dummy/data';

function Projects() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5'>
      <div className='bg-white rounded-lg h-full w-full shadow-lg p-5 relative' style={{ boxShadow: '0px 5px 5px -5px rgba(0, 0, 0, 0.2)' }}>
        <div className='header mb-4'>
          <div className='text-2xl font-bold text-gray-700 mb-2'>
            All Projects
          </div>
          <button onClick={toggleModal} className='bg-transparent text-blue-500 text-sm font-semibold border-none ml-auto hover:text-blue-700 transition duration-300 ease-in-out'>
            Create New <PlusCircle className='inline-block ml-1 h-5 w-5' />
          </button>
        </div>

        <CreateNew isOpen={isOpen} toggleModal={toggleModal} />
        <div>
          <div>
            <div className='font-semibold my-2 py-4' style={{ boxShadow: '0px 5px 5px -5px rgba(0, 0, 0, 0.2)' }}>Recent</div>
            {/* Recent projects content */}
            <div className='m-4 overflow-y-auto max-h-20'>
            {dummyProjects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="text-gray-800">
              <div className="grid grid-cols-4 items-center border-b p-3 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out">
                <div className='font-semibold text-gray-700'>{project.name}</div>
                <div className="text-gray-500">{project.code}</div>
                <div className="text-gray-500 text-end col-span-2">{project.date}</div>
              </div>
            </Link>
          ))}

            </div>
          </div>

          <div>
            <div className='font-semibold my-2 py-4' style={{ boxShadow: '0px 5px 5px -5px rgba(0, 0, 0, 0.2)' }}>All Projects</div>
            {/* All projects content */}
            <div className='m-4 overflow-y-auto max-h-80'>
            {dummyProjects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="text-gray-800">
                <div className="grid grid-cols-4 items-center border-b p-3 cursor-pointer hover:bg-gray-200 transition-all duration-400 ease-in-out">
                  <div className='font-semibold text-gray-700'>{project.name}</div>
                  <div className="text-gray-500">{project.code}</div>
                  <div className="text-gray-500 text-end col-span-2">{project.date}</div>
                </div>
              </Link>
            ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;

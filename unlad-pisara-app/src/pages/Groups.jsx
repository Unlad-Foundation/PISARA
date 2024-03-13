import React, { useState } from 'react';
import { Search, Plus, Users, PlusCircle } from 'lucide-react';
import ComingSoon from '../ui/comingsoon';

function Groups() {
  // Dummy data for groups
  const dummyGroups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter groups based on search term
  const filteredGroups = dummyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the number of columns dynamically based on the number of groups
  const numColumns = Math.ceil(filteredGroups.length / 3);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
    // Perform search functionality here
  };

  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5 relative'>
      <ComingSoon/>
      <div className='bg-white rounded-lg h-full w-full shadow-lg p-5 relative'>
        <div className='header mb-4 flex justify-between items-center'>
          <div className='text-2xl font-bold text-gray-700 mb-2'>
            Groups
          </div>
          <div className='flex items-center'>
            {/* Search bar */}
                <form onSubmit={handleSubmit} className="w-96 mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Search Groups..." 
                            value={searchTerm} 
                            onChange={handleSearchChange}
                            required 
                            />
                            <button 
                            type="submit" 
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Search
                            </button>
                        </div>
                </form>

                <div className='m-2'>
                    <button className='flex  bg-none p-4 text-blue-500 font-semibold'>
                        <Users/> <PlusCircle className='w-3 h-3 mr-1'/>
                        Create a group
                    </button>
                </div>
          </div>
        </div>
        <div className={`grid grid-cols-${numColumns} gap-4`}>
          {filteredGroups.map(group => (
            <div key={group.id} className='bg-gray-100 p-4 rounded-md'>
              {group.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Groups;

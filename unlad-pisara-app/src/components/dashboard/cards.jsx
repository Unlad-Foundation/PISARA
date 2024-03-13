import React from 'react';

function Cards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div key={index} className="bg-transparent p-4 rounded-lg shadow-md mb-4 flex items-center relative">
          {item.icon && <item.icon className="w-4 h-4  absolute top-0 right-0 mt-1 mr-2 text-gray-500" />} 
          <div className='p-1'>
            <p className="text-gray-700 font-semibold mb-2">{item.title}</p>
            <h2 className="text-xl font-bold mb-1 text-gray-800">+{item.value}</h2>
            <p className="text-xs text-gray-500">{item.description}</p> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;

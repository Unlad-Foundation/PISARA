import { dummyProfile } from '../../dummy/data';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, email, avatarSrc, menuItems } = dummyProfile;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Profile */}
      <button
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
      >
        <img src={avatarSrc} alt="User dropdown" className='rounded-full' />
      </button>

      {/* Dropdown menu */}
      <div
        id="userDropdown"
        className={`z-10 absolute top-full right-0 mt-2 ${isOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{name}</div>
          <div className="text-sm truncate">{email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-1">
          <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

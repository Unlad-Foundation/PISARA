import React from 'react'
import ComingSoon from '../ui/comingsoon'
import { profileData } from '../dummy/data'

function Profile() {
  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5 relative'>
      <ComingSoon />
      <div className='bg-white rounded-lg shadow-lg p-5 w-full max-w-md'>
        <div className="flex items-center justify-center mb-5">
          <img src={profileData.avatarUrl} alt="Profile" className="rounded-full h-24 w-24 border-4 border-gray-200" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
        <p className="text-gray-600 font-semibold">@{profileData.username}</p>
        <p className="text-gray-600">{profileData.email}</p>
        <p className="text-gray-600">{profileData.location}</p>
        <hr className="my-4 border-t-2 border-gray-200" />
        <p className="text-gray-700">{profileData.bio}</p>
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Edit Profile
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
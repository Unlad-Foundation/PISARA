import React from 'react'
import ComingSoon from '../ui/comingsoon'
import { notificationData } from '../dummy/data'

function Notification() {
  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5 relative'>
      <ComingSoon/>
        <div className='bg-white rounded-lg h-full w-full shadow-lg p-5 relative'>
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <ul>
              {notificationData.map(notification => (
                <li key={notification.id} className="bg-white shadow-md rounded-md p-4 mb-4">
                  <strong className="block text-lg">{notification.title}</strong>
                  <p className="text-gray-600">{notification.description}</p>
                  <small className="text-gray-400 block">{notification.timestamp.toLocaleString()}</small>
                  {notification.isRead ? <span className="text-green-500"> - Read</span> : <span className="text-red-500"> - Unread</span>}
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Notification
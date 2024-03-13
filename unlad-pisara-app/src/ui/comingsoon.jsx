import React from 'react'

const ComingSoon = () => {
  return (
    <div className='absolute top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50'>
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
            Coming soon
        </h1>
        <p className="text-white text-lg mb-8">
            We're working on something amazing. Stay tuned!
        </p>
        </div>
    </div>
  )
}

export default ComingSoon
import ComingSoon from '@/components/ComingSoon'
import React from 'react'

const page = () => {
  return (
    <>
    <div className="lg:hidden overflow-hidden fixed inset-0 flex items-center justify-center bg-black text-white z-50 p-4 text-center">
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-sm">
          <h2 className="text-xl font-bold mb-2">
            Desktop Experience Required
          </h2>
          <p className="text-sm text-gray-300">
            CloneChamp is optimized for larger screens to provide the best
            experience. Please access this platform from a desktop or laptop
            device.
          </p>
        </div>
      </div>

      <div><ComingSoon/></div>

      
    </>
  )
}

export default page

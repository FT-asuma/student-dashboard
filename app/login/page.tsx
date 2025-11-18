"use client"

import Form from "./_components/Form"

const Login = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#6A5AE0] via-[#8B7CE8] to-[#A99BED] flex items-center justify-center p-8'>
      <div className='bg-white rounded-xl p-8 w-full max-w-md'>
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="url(#gradient)" />
              <path
                d="M20 12L10 16L20 20L30 16L20 12Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M12 17.5V22C12 23.1046 15.5817 26 20 26C24.4183 26 28 23.1046 28 22V17.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="30" cy="16" r="1.5" fill="white" />
              <line x1="30" y1="17.5" x2="30" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6A5AE0" />
                  <stop offset="1" stopColor="#8B7CE8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="">
              <h3 className="text-sm text-gray-900 font-semibold">HEMIN Portal</h3>
              <p className="text-gray-500">STUDENT SYSTEM</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to access your student portal</p>
          </div>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default Login
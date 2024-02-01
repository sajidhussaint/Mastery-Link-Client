import React from 'react'

const SpinnerMain = () => {
  return (
    <div>
          {/* <Spinner className="h-16 w-16 text-gray-900/50" /> */}
          <div class="absolute bg-white bg-opacity-60 z-10 h-screen w-screen flex items-center justify-center ">
            <div class="flex gap-2">
              <div class="w-5 h-5 rounded-full animate-pulse bg-green-600"></div>
              <div class="w-5 h-5 rounded-full animate-pulse bg-green-500"></div>
              <div class="w-5 h-5 rounded-full animate-pulse bg-green-400"></div>
            </div>
            {/* <div class="flex items-center">
                <span class="text-3xl mr-4">Loading</span>
                <svg
                  class="animate-spin h-8 w-8 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div> */}
          </div>
        </div>
  )
}

export default SpinnerMain

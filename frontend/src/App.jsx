// App.jsx
// Root component of the FridgeMate frontend
// This is the main entry point for the React application

import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* App Header */}
        <h1 className="text-4xl font-bold text-green-800 text-center mb-2">
          FridgeMate
        </h1>
        <p className="text-center text-green-600 mb-8">
          AI-powered recipes based on what you have
        </p>

        {/* Recipe form will go here */}
        <p className="text-center text-gray-400">Form coming soon...</p>

      </div>
    </div>
  )
}

export default App
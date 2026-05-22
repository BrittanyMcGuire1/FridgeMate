// Root component of the FridgeMate frontend
// Manages the overall app state and connects the form to the backend

import { useState } from 'react'
import RecipeForm from './RecipeForm'
import RecipeDisplay from './RecipeDisplay'

function App() {
  // State for the generated recipe and loading status
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Called when the user submits the form
  const handleRecipeGenerated = async (formData) => {
    setIsLoading(true)
    setError(null)
    setRecipe(null)

    try {
      // Send POST request to FastAPI backend
      const response = await fetch('https://fridgemate-api.onrender.com/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate recipe')
      }

      const data = await response.json()
      setRecipe(data)

    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* App Header */}
        <h1 className="text-4xl font-bold text-teal-700 text-center mb-2">
          FridgeMate
        </h1>
        <p className="text-center text-sky-500 mb-8">
          AI-powered recipes based on what you have
        </p>

        {/* Recipe Form Component */}
        <RecipeForm
          onRecipeGenerated={handleRecipeGenerated}
          isLoading={isLoading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Recipe Display Component */}
        {recipe && (
          <RecipeDisplay recipe={recipe} />
        )}

      </div>
    </div>
  )
}

export default App
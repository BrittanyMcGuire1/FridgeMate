// Handles all user inputs for recipe generation
// Collects dietary preference, allergies, and ingredients from the user

import { useState } from 'react'

function RecipeForm({ onRecipeGenerated, isLoading }) {
  // State for each form field
  const [dietaryPreference, setDietaryPreference] = useState('vegan')
  const [allergies, setAllergies] = useState('')
  const [ingredients, setIngredients] = useState('')

  // Handle form submission
  const handleSubmit = () => {
    // Convert comma separated strings to arrays and clean up whitespace
    const ingredientList = ingredients.split(',').map(item => item.trim()).filter(item => item)
    const allergyList = allergies.split(',').map(item => item.trim()).filter(item => item)

    // Pass the data up to the parent component (App.jsx)
    onRecipeGenerated({
      ingredients: ingredientList,
      dietary_preference: dietaryPreference,
      allergies: allergyList
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

      {/* Dietary Preference Dropdown */}
      <div className="mb-4">
        <label className="block text-green-800 font-semibold mb-1">
          Dietary Preference
        </label>
        <select
          value={dietaryPreference}
          onChange={(e) => setDietaryPreference(e.target.value)}
          className="w-full border border-green-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="none">No Restrictions</option>
        </select>
      </div>

      {/* Allergies Input */}
      <div className="mb-4">
        <label className="block text-green-800 font-semibold mb-1">
          Allergies (comma separated)
        </label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="e.g. nuts, soy, shellfish"
          className="w-full border border-green-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Ingredients Input */}
      <div className="mb-6">
        <label className="block text-green-800 font-semibold mb-1">
          Ingredients You Have (comma separated)
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. rice, black beans, tomatoes, garlic"
          rows={4}
          className="w-full border border-green-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !ingredients.trim()}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
      </button>

    </div>
  )
}

export default RecipeForm
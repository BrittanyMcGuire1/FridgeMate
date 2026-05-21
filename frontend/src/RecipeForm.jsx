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
    // Convert comma separated strings to arrays and clean whitespace
    const ingredientList = ingredients
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '')

    const allergyList = allergies
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '')

    // Pass the data up to the parent component
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
        <label className="block text-teal-700 font-semibold mb-2">
          Dietary Preference
        </label>
        <select
          value={dietaryPreference}
          onChange={(e) => setDietaryPreference(e.target.value)}
          className="w-full border border-sky-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
        <label className="block text-teal-700 font-semibold mb-2">
          Allergies (comma separated)
        </label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="e.g. nuts, soy, wheat"
          className="w-full border border-sky-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Ingredients Input */}
      <div className="mb-6">
        <label className="block text-teal-700 font-semibold mb-2">
          Ingredients You Have (comma separated)
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. rice, black beans, tomatoes, onion"
          rows={4}
          className="w-full border border-sky-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || ingredients.trim() === ''}
        className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
      </button>

    </div>
  )
}

export default RecipeForm
// Displays the generated recipe in a clean formatted layout
// Receives the recipe object as a prop from App.jsx

function RecipeDisplay({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Recipe Title */}
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        {recipe.title}
      </h2>

      {/* Recipe Description */}
      {recipe.description && (
        <p className="text-gray-600 mb-4 italic">
          {recipe.description}
        </p>
      )}

      {/* Recipe Meta Info */}
      <div className="flex gap-4 mb-6 text-sm text-gray-500">
        {recipe.prep_time && (
          <span>Prep: {recipe.prep_time}</span>
        )}
        {recipe.cook_time && (
          <span>Cook: {recipe.cook_time}</span>
        )}
        {recipe.servings && (
          <span>Serves: {recipe.servings}</span>
        )}
      </div>

      {/* Ingredients Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Ingredients
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Instructions
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-700 leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </div>

    </div>
  )
}

export default RecipeDisplay
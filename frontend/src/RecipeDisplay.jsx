// Displays the generated recipe in a clean formatted layout
// Receives the recipe object as a prop from App.jsx

function RecipeDisplay({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Recipe Title */}
      <h2 className="text-2xl font-bold text-teal-700 mb-2">
        {recipe.title}
      </h2>

      {/* Recipe Description */}
      {recipe.description && (
        <p className="text-stone-500 mb-4 italic">
          {recipe.description}
        </p>
      )}

      {/* Recipe Meta Info */}
      <div className="flex gap-4 mb-6 text-sm">
        {recipe.prep_time && (
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
            Prep: {recipe.prep_time}
          </span>
        )}
        {recipe.cook_time && (
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
            Cook: {recipe.cook_time}
          </span>
        )}
        {recipe.servings && (
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
            Serves: {recipe.servings}
          </span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-sky-100 mb-6" />

      {/* Ingredients Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-600 mb-3">
          Ingredients
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-stone-600">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <hr className="border-sky-100 mb-6" />

      {/* Instructions Section */}
      <div>
        <h3 className="text-lg font-semibold text-teal-600 mb-3">
          Instructions
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-stone-600 leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </div>

    </div>
  )
}

export default RecipeDisplay
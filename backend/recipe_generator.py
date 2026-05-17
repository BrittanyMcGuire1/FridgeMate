# TODO: replace mock with real OpenAI call when API key is ready

def generate_recipe(ingredients: list[str], dietary_preference: str, allergies: list[str]) -> dict:
    recipe = {
        "title": "Hearty Vegan Black Bean and Rice Bowl",
        "description": (
            "A protein-packed, smoky black bean and rice bowl seasoned with cumin, "
            "garlic, and lime. Perfect for a quick weeknight dinner that's completely "
            "plant-based and full of flavor."
        ),
        "prep_time": "10 minutes",
        "cook_time": "25 minutes",
        "servings": 4,
        "ingredients": [
            "1 cup long-grain brown rice",
            "2 cups vegetable broth",
            "1 tablespoon olive oil",
            "1 medium yellow onion, diced",
            "3 cloves garlic, minced",
            "1 red bell pepper, diced",
            "2 cans (15 oz each) black beans, drained and rinsed",
            "1 teaspoon ground cumin",
            "1 teaspoon smoked paprika",
            "1/2 teaspoon chili powder",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1 lime, juiced",
            "1/4 cup fresh cilantro, chopped",
            "1 avocado, sliced (for serving)",
        ],
        "instructions": [
            "Rinse the brown rice under cold water until the water runs clear.",
            "In a medium saucepan, combine the rice and vegetable broth. Bring to a boil, then reduce heat, cover, and simmer for 20 to 25 minutes until tender.",
            "While the rice cooks, heat olive oil in a large skillet over medium heat.",
            "Add the diced onion and cook for 3 to 4 minutes until softened and translucent.",
            "Add the minced garlic and diced bell pepper, and cook for another 2 minutes.",
            "Stir in the black beans, cumin, smoked paprika, chili powder, salt, and pepper.",
            "Cook for 5 to 7 minutes, stirring occasionally, until the beans are heated through and the spices are fragrant.",
            "Remove the skillet from heat and stir in the lime juice and half of the cilantro.",
            "Fluff the cooked rice with a fork and divide it among 4 bowls.",
            "Top each bowl with the black bean mixture, avocado slices, and the remaining cilantro. Serve immediately.",
        ],
    }
    return recipe
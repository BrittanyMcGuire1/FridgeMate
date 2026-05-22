# Handles AI recipe generation using Google Gemini API
# Uses the new google.genai package

from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env file
load_dotenv()

# Initialize the Gemini client with API key
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_recipe(ingredients: list[str], dietary_preference: str, allergies: list[str]) -> dict:
    # Build the prompt with user inputs
    allergy_text = f"Avoid these allergens: {', '.join(allergies)}." if allergies else "No specific allergies."

    prompt = f"""
    You are a professional chef. Create a recipe using these ingredients: {', '.join(ingredients)}.
    Dietary requirement: {dietary_preference}.
    {allergy_text}

    Respond with ONLY a valid JSON object in this exact format, no other text:
    {{
        "title": "Recipe name here",
        "description": "Brief appetizing description",
        "prep_time": "X minutes",
        "cook_time": "X minutes",
        "servings": 4,
        "ingredients": ["ingredient 1", "ingredient 2"],
        "instructions": ["Step 1", "Step 2"]
    }}
    """

    try:
        # Call Gemini API using the free tier model
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        # Clean the response text and parse as JSON
        response_text = response.text.strip()

        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]

        # Parse the JSON response into a Python dictionary
        recipe = json.loads(response_text)
        return recipe

    except Exception as e:
        # If anything goes wrong return a fallback recipe
        print(f"Gemini API error: {e}")
        return {
            "title": "Simple Recipe",
            "description": "A simple recipe based on your ingredients",
            "prep_time": "10 minutes",
            "cook_time": "20 minutes",
            "servings": 2,
            "ingredients": ingredients,
            "instructions": ["Combine your ingredients", "Cook until done", "Serve and enjoy"]
        }
# Main entry point for the FridgeMate FastAPI backend
# This file creates the API server and defines all endpoints

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from recipe_generator import generate_recipe

# Create the FastAPI application instance
app = FastAPI()

# Allow the React frontend to communicate with this backend
# Without this, browsers block cross-origin requests by default
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected shape of incoming recipe requests
# Pydantic automatically validates that data matches these types
class RecipeRequest(BaseModel):
    ingredients: List[str]        # List of ingredients the user has available
    dietary_preference: str       # User's diet type e.g. vegan, gluten-free
    allergies: List[str]          # List of allergens to avoid

# Health check endpoint - confirms the API is running
@app.get("/")
def root():
    return {"message": "FridgeMate API is running"}

# Main recipe generation endpoint
# Accepts ingredient and dietary data, returns a generated recipe
@app.post("/generate-recipe")
def create_recipe(request: RecipeRequest):
    recipe = generate_recipe(
        ingredients=request.ingredients,
        dietary_preference=request.dietary_preference,
        allergies=request.allergies
    )
    return recipe
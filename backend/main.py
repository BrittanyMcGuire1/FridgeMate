# Main entry point for the FridgeMate FastAPI backend
# This file creates the API server and defines all endpoints

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from recipe_generator import generate_recipe
from database import get_db, engine, Base
from contextlib import asynccontextmanager
import models
import json

@asynccontextmanager
async def lifespan(app):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

# Create database tables on startup if they don't exist
from contextlib import asynccontextmanager
from database import engine, Base
import models

@asynccontextmanager
async def lifespan(app):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

# Allow the React frontend to communicate with this backend
# Without this, browsers block cross-origin requests by default
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://fridge-mate-nine.vercel.app",
        "*"
    ],
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
# Accepts ingredient and dietary data, generates a recipe, and saves it to the database
# CHANGED: added db parameter so this endpoint has access to the database session
@app.post("/generate-recipe")
def create_recipe(request: RecipeRequest, db: Session = Depends(get_db)):
    # Generate the recipe using recipe generator function
    recipe = generate_recipe(
        ingredients=request.ingredients,
        dietary_preference=request.dietary_preference,
        allergies=request.allergies
    )

    # NEW: Save the generated recipe to the database
    db_recipe = models.Recipe(
        title=recipe["title"],
        description=recipe.get("description", ""),
        prep_time=recipe.get("prep_time", ""),
        cook_time=recipe.get("cook_time", ""),
        servings=recipe.get("servings", 0),
        ingredients=json.dumps(recipe["ingredients"]),   # converts list to JSON string for storage
        instructions=json.dumps(recipe["instructions"]), # converts list to JSON string for storage
        dietary_preference=request.dietary_preference
    )

    # NEW: Add to session, commit to save, refresh to get the saved data back
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)

    # Return the recipe to the frontend
    return recipe
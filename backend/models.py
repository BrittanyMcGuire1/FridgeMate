# Defines the database table structures as Python classes
# Each class here becomes a table in the PostgreSQL database

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

# Users table
# Stores user account information and dietary preferences
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    dietary_preference = Column(String, nullable=True)
    allergies = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # One user can have many saved recipes
    recipes = relationship("Recipe", back_populates="owner")


# Recipes table
# Stores every recipe generated for a user
class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    prep_time = Column(String, nullable=True)
    cook_time = Column(String, nullable=True)
    servings = Column(Integer, nullable=True)
    ingredients = Column(Text, nullable=False)
    instructions = Column(Text, nullable=False)
    dietary_preference = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Foreign key linking each recipe to the user who generated it
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationship back to the User who owns this recipe
    owner = relationship("User", back_populates="recipes")
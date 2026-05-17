# Handles the database connection and base model setup
# All other database models will import from this file

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine
# The engine is the connection pool to the PostgreSQL database
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the base class for all database models
# Every table will inherit from this Base class
Base = declarative_base()

# Dependency function for FastAPI
# This creates a database session for each request and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# This file creates all database tables in PostgreSQL
# This file run once to set up the database structure
# Do not need to run again unless database is deleted

from database import engine, Base
import models  # Import models so Base knows about all tables

def init_database():
    # Creates all tables that inherit from Base
    # If tables already exist it leaves them alone
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")

# Run the initialization when this file is executed directly
if __name__ == "__main__":
    init_database()
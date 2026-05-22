Readme · MD
# FridgeMate 🥗
 
**AI-powered recipe generator that creates personalized recipes based on ingredients you have on hand**
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-teal)](https://fridge-mate-nine.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Swagger%20Docs-blue)](https://fridgemate-api.onrender.com/docs)
 
---
 
## 🌐 Live Demo
 
**[https://fridge-mate-nine.vercel.app](https://fridge-mate-nine.vercel.app)**
 
> Note: The backend may take up to 60 seconds to respond on the first request as the free tier server wakes up. Subsequent requests are fast.
 
---
 
## 📸 Screenshots
 
### Recipe Form
![FridgeMate Form](screenshots/form.png)
 
### Recipe Display
![Recipe Display](screenshots/recipe-display.png)
 
### Instructions
![Recipe Instructions](screenshots/instructions.png)
 
---
 
## 🚀 Features
 
- **Dietary preference selection** — Vegan, Vegetarian, Gluten-Free, Dairy-Free, or No Restrictions
- **Allergen filtering** — Enter any allergies and they are factored into the recipe
- **AI-powered recipe generation** — Recipes generated based on ingredients you actually have
- **Full recipe display** — Title, description, prep time, cook time, servings, ingredients, and step-by-step instructions
- **Recipe history** — Every generated recipe is saved to a PostgreSQL database
---
 
## 🛠 Tech Stack
 
| Technology | Role |
|------------|------|
| **Python** | Backend language |
| **FastAPI** | REST API framework with automatic Swagger documentation |
| **React** | Frontend UI framework |
| **Tailwind CSS** | Utility-first CSS styling |
| **PostgreSQL** | Relational database for recipe storage |
| **SQLAlchemy** | Python ORM for database interaction |
| **OpenAI API** | AI recipe generation |
| **Vite** | Frontend build tool |
| **Render** | Backend hosting |
| **Vercel** | Frontend hosting |
 
---
 
## 🏗 Architecture
 
```
User Browser (React + Vite)
        │
        │ POST /generate-recipe
        ▼
FastAPI Backend (Python)
        │
        ├── Validates request with Pydantic
        ├── Calls OpenAI API for recipe generation
        ├── Saves recipe to PostgreSQL
        └── Returns recipe as JSON
```
 
---
 
## 📁 Project Structure
 
```
fridgemate/
├── backend/
│   ├── main.py              # FastAPI app and endpoints
│   ├── recipe_generator.py  # OpenAI recipe generation logic
│   ├── database.py          # Database connection and session management
│   ├── models.py            # SQLAlchemy database models
│   ├── init_db.py           # Database initialization script
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Root component and API call logic
│   │   ├── RecipeForm.jsx   # User input form component
│   │   └── RecipeDisplay.jsx # Recipe output display component
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite and Tailwind configuration
├── screenshots/             # App screenshots for README
└── README.md
```
 
---
 
## ⚙️ Running Locally
 
### Prerequisites
 
- Python 3.11+
- Node.js 18+
- PostgreSQL 17
- Git
### Backend Setup
 
```bash
# Clone the repository
git clone https://github.com/BrittanyMcGuire1/fridgemate.git
cd fridgemate/backend
 
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
 
# Install dependencies
pip install -r requirements.txt
 
# Set up environment variables
cp .env.example .env
# Edit .env and add your values:
# OPENAI_API_KEY=your-openai-api-key
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/fridgemate
 
# Create database tables
python init_db.py
 
# Start the backend server
uvicorn main:app --reload
```
 
Backend runs at: http://127.0.0.1:8000
API documentation: http://127.0.0.1:8000/docs
 
### Frontend Setup
 
```bash
# In a new terminal, navigate to frontend
cd fridgemate/frontend
 
# Install dependencies
npm install
 
# Start the development server
npm run dev
```
 
Frontend runs at: http://localhost:5173
 
---
 
## 🔌 API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check — confirms API is running |
| POST | `/generate-recipe` | Generate a recipe from ingredients and dietary preferences |
 
### POST /generate-recipe
 
**Request Body:**
```json
{
  "ingredients": ["rice", "black beans", "tomatoes"],
  "dietary_preference": "vegan",
  "allergies": ["nuts"]
}
```
 
**Response:**
```json
{
  "title": "Hearty Vegan Black Bean and Rice Bowl",
  "description": "A protein-packed bowl...",
  "prep_time": "10 minutes",
  "cook_time": "25 minutes",
  "servings": 4,
  "ingredients": ["1 cup brown rice", "..."],
  "instructions": ["Rinse the rice...", "..."]
}
```
 
---
 
## 🗄 Database Schema
 
### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| email | String | Unique user email |
| hashed_password | String | Bcrypt hashed password |
| dietary_preference | String | User's default dietary preference |
| allergies | String | User's allergies |
| created_at | DateTime | Account creation timestamp |
 
### Recipes Table
| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| title | String | Recipe title |
| description | Text | Recipe description |
| prep_time | String | Preparation time |
| cook_time | String | Cooking time |
| servings | Integer | Number of servings |
| ingredients | Text | JSON string of ingredients list |
| instructions | Text | JSON string of instructions list |
| dietary_preference | String | Dietary preference used |
| owner_id | Integer | Foreign key to users table |
| created_at | DateTime | Recipe generation timestamp |
 
---
 
## 🗺 Roadmap

### ✅ Version 1 — Complete
- [x] Core recipe generation with dietary preference and allergen filtering
- [x] PostgreSQL database storing every generated recipe
- [x] Full stack deployment — React on Vercel, FastAPI on Render
- [x] REST API with automatic Swagger documentation

### 🔄 Version 2 — In Progress
- [ ] **Real AI recipe generation** — Swap mock for live OpenAI API integration so every recipe is unique and based on actual ingredients entered
- [ ] User accounts and authentication — sign up, log in, save preferences
- [ ] Personal recipe history — view all previously generated recipes
- [ ] Recipe converter — paste any recipe and convert it to your dietary preference

### 🔮 Version 3 — Planned
- [ ] Docker containerization
- [ ] AWS migration from Render and Vercel
- [ ] Social features — share and rate recipes
- [ ] Mobile responsive improvements
 
## 👩‍💻 Built By
 
**Brittany McGuire**
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/brittany-mcguire-59553a338/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/BrittanyMcGuire1)
 
---
 
## 📄 Environment Variables
 
Create a `.env` file in the backend folder based on `.env.example`:
 
```
OPENAI_API_KEY=your-openai-api-key-here
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/fridgemate
```
 
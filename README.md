Lume Blog – Full Stack Project (React + Django REST)

This is a full-stack blog application built using:

Frontend: React + Vite

Backend: Django REST Framework

Database: SQLite

Media Storage: Local media folder

Both the frontend and backend are included inside the same repository.

--------------------------------------------------------------------------
Project Structure

LUME BLOG/
│
├── lume/                     # React Frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── extensions/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── lume_backend/             # Django Backend
│   ├── env/                  # Virtual environment (local use only)
│   ├── lumebackend/
│   ├── lumeapp/
│   ├── blog_images/
│   ├── media/
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
│
└── .gitignore

--------------------------------------------------------------------

Start Backend (Django)

cd lume_backend
.\env\Scripts\activate       # Activate virtual environment
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

Backend will run on: http://localhost:8000/

---------------------------------------------------------------------

Start Frontend (React + Vite)

cd lume
npm install
npm run dev

Frontend will run on: http://localhost:5173/

--------------------------------------------------------------------

🔗 API Endpoints

POST /api/posts/             Create new blog with image/video upload.

GET /api/posts/              Get all blogs.

POST /api/upload/image/      Upload images.

POST /api/upload/video/      Upload videos.

---------------------------------------------------------------------

Technologies Used

Frontend
   React
   Vite
   Axios
   CSS

Backend
   Django  
   Django REST Framework
   SQLite
   CORS Headers enabled

# MediAiProject

An AI-powered health assistant built with **React**, **Django**, and **Machine Learning**, designed to help users monitor their mental and physical health.

---

## Features

### 1. 📱 Screen Time & Sanity

- Analyze the impact of screen time on mental health.
- Predict sanity scores using trained ML models.
- Visual representation with interactive charts.

### 2. Disease Prediction

- Enter symptoms to receive possible disease predictions.
- Built with smart ML classifiers trained on real health datasets.

### 3. AI Health Assistant

- Chatbot powered by Gemini API for conversational health support.
- Provides personalized, real-time health tips and guidance.

---

## Project Structure

MediAiProject/
├── App/
│ ├── frontend/ # React + Vite frontend
│ └── backend/ # Django + DRF backend with multiple apps
├── Training/ # ML models and Jupyter notebooks
├── raw data/ # (ignored) Raw CSVs, Excel files, etc.
├── README.md
└── .gitignore

---

## 💡 Tech Stack

| Layer         | Tech                                   |
|---------------|----------------------------------------|
| Frontend      | React, Vite, TailwindCSS               |
| Backend       | Django, Django REST Framework          |
| ML Models     | scikit-learn, pandas, NumPy            |
| Chatbot       | Gemini API (Google AI Chat Integration)|
| Auth & API    | JWT (if used), axios                   |

---

## 🛠️ Setup Instructions

### Backend (Django)

```bash
cd App/backend
python -m venv .venv
source .venv/bin/activate    # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

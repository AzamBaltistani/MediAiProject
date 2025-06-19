from rest_framework.decorators import api_view
from rest_framework.response import Response
import joblib
import numpy as np
import os

# Load model
MODEL_PATH = '/media/sikander-azam/ntfsdrive/AI Projects/MediAiProject/App/backend/screen_time_n_sanity/trained_ai_models/mental_health_model_MOXGReg.pkl'
model = joblib.load(MODEL_PATH)

@api_view(['POST'])
def predict_mental_health(request):
    try:
        data = request.data
        features = [
            float(data.get('screen_time_hours', 0)),
            float(data.get('social_media_platforms_used', 0)),
            float(data.get('hours_on_TikTok', 0)),
            float(data.get('sleep_hours', 0)),
        ]
        prediction = model.predict([features])[0]
        return Response({
            "stress_level": round(prediction[0], 2),
            "mood_score": round(prediction[1], 2)
        })
    except Exception as e:
        return Response({"error": str(e)}, status=400)

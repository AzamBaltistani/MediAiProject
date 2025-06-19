from django.urls import path
from .views import PredictDiseaseView

urlpatterns = [
    path('predict_disease/', PredictDiseaseView.as_view(), name='predict-disease'),
]

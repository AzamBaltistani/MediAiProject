from django.urls import path
from .views import predict_mental_health
urlpatterns = [
    path('screen_vs_health/', predict_mental_health),
]

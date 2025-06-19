from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('screen_time_n_sanity.urls')),
    path('api/', include('disease_predictor.urls')),
    path("api/healthbot/", include("healthbot.urls")),
]

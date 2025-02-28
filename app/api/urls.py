from api import views
from django.urls import path, re_path


app_name = "api"

urlpatterns = [
    path("", views.api_view, name="index"),
    re_path(r"^discord/?$", views.api_view, name="discord"),
]

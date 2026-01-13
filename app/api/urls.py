from django.urls import path

from api import views


# from django.urls import re_path

app_name = "api"

urlpatterns = [
    # path("", views.api_view, name="index"),
    path("<path:path>", views.api_view, name="index"),
    # re_path(r"^discord/?$", views.api_view, name="discord"),
]

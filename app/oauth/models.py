from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    avatar_hash = models.CharField(max_length=255, blank=True, default="")
    access_token = models.CharField(max_length=255, blank=True, default="")
    refresh_token = models.CharField(max_length=255, blank=True, default="")
    expires_in = models.DateTimeField(null=True)

    def __str__(self):
        return self.username

    def get_name(self):
        return self.first_name or self.username or self.id

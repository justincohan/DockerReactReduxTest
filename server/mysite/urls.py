from django.contrib import admin
from django.urls import include, path

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
urlpatterns = [
    path('', include('todo.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]





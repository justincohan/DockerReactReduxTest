from django.urls import include, path
from rest_framework import routers

from .views import TodoViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'todo', TodoViewSet)
router.register(r'users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
]

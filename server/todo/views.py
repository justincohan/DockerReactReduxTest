from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import viewsets, permissions

from .models import Todo
from .serializers import TodoSerializer, UserSerializer


def index(request):
    return HttpResponse("Hello")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# ViewSets define the view behavior.
class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

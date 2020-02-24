from django.http import HttpResponse
from rest_framework import viewsets

from .models import Todo
from .serializers import TodoSerializer


def index(request):
    return HttpResponse("Hello")


# ViewSets define the view behavior.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

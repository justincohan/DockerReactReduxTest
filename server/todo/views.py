from djoser.serializers import User
from rest_framework import viewsets

from .models import Todo
from .permissions import AdminOrReadOnly
from .serializers import TodoSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.user:
            return UserSerializer
        return UserSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        action = self.action

        if (action == 'list'):
            context['fields'] = ('id', 'title', 'price',)
        elif (action == 'create'):
            context['fields'] = ('id',)
        elif (action == 'retrieve'):
            context['fields'] = ('title', 'author', 'isbn', 'price', 'synopsis')
        return context


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [AdminOrReadOnly]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

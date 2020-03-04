from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Todo


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class TodoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Todo
        fields = ['id', 'content', 'completed']

    def __init__(self, *args, **kwargs):
        if kwargs['context']['request'].user.username != 'admin':
            self.fields.pop('completed')

        super(TodoSerializer, self).__init__(*args, **kwargs)

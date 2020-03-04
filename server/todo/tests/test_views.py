import json

from django.contrib.auth.models import User, Group, Permission
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Todo


def login(client, name):
    user = User.objects.create_user('admin', '', 'TestPassword1!')
    user.groups.set([Group.objects.get(name=name)])
    user.save()

    #client.post('/auth/users/', {'username': 'admin', 'password': 'TestPassword1!'})
    response = client.post('/auth/token/login/', {'username': 'admin', 'password': 'TestPassword1!'})
    client.credentials(HTTP_AUTHORIZATION='Token ' + json.loads(response.content)['auth_token'])


def login_as_admin(client):
    login(client, 'admin')


def login_as_writer(client):
    login(client, 'writer')


def login_as_toggler(client):
    login(client, 'toggler')


def login_as_deleter(client):
    login(client, 'deleter')


def login_as_reader(client):
    login(client, 'reader')


def dont_login(client):
    pass

class TodoTests(APITestCase):
    rules = [
        {'login': login_as_writer, 'add': status.HTTP_201_CREATED, 'put': status.HTTP_403_FORBIDDEN, 'delete': status.HTTP_403_FORBIDDEN, 'read': status.HTTP_200_OK},
        {'login': login_as_toggler, 'add': status.HTTP_403_FORBIDDEN, 'put': status.HTTP_200_OK, 'delete': status.HTTP_403_FORBIDDEN, 'read': status.HTTP_200_OK},
        {'login': login_as_deleter, 'add': status.HTTP_403_FORBIDDEN, 'put': status.HTTP_403_FORBIDDEN, 'delete': status.HTTP_204_NO_CONTENT, 'read': status.HTTP_200_OK},
        {'login': login_as_reader, 'add': status.HTTP_403_FORBIDDEN, 'put': status.HTTP_403_FORBIDDEN, 'delete': status.HTTP_403_FORBIDDEN, 'read': status.HTTP_200_OK},
        {'login': dont_login, 'add': status.HTTP_403_FORBIDDEN, 'put': status.HTTP_403_FORBIDDEN, 'delete': status.HTTP_403_FORBIDDEN, 'read': status.HTTP_403_FORBIDDEN},
    ]

    def test_writer(self):
        self.role_test(TodoTests.rules[0])

    def test_toggler(self):
        self.role_test(TodoTests.rules[1])

    def test_deleter(self):
        self.role_test(TodoTests.rules[2])

    def test_reader(self):
        self.role_test(TodoTests.rules[3])

    def test_anonymous(self):
        self.role_test(TodoTests.rules[4])

    def role_test(self, rule):
        todo = Todo.objects.create(content="goodtest")
        print(vars(todo))
        if True:
            rule['login'](self.client)

            # Add todo
            response = self.client.post('/todo/', {'content': 'goodtest'})
            content = json.loads(response.content)
            self.assertEqual(response.status_code, rule['add'])

            # Get todo
            todo_id = todo.id
            response = self.client.get('/todo/' + str(todo_id) + '/', format='json')
            self.assertEqual(response.status_code, rule['read'])

            # Update todo
            response = self.client.put('/todo/' + str(todo_id) + '/', {'content': 'changed'}, format='json')
            self.assertEqual(response.status_code, rule['put'])

            # Delete todo
            response = self.client.delete('/todo/' + str(todo_id) + '/', format='json')
            self.assertEqual(response.status_code, rule['delete'])

            # List todo
            response = self.client.get('/todo/', format='json')
            self.assertEqual(response.status_code,  rule['read'])


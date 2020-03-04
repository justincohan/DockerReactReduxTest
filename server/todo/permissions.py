from rest_framework.permissions import BasePermission


class AdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.user.has_perm('todo.add_todo')
        elif request.method == 'PUT':
            return request.user.has_perm('todo.change_todo')
        elif request.method == 'DELETE':
            return request.user.has_perm('todo.delete_todo')
        else:
            return request.user.has_perm('todo.view_todo')

    def has_object_permission(self, request, view, obj):
        return getattr(obj, 'hidden', False) is not True

"""
Create permission groups
"""
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

from todo.models import Todo


class Command(BaseCommand):
    help = 'Creates default permission groups'
    content_type = ContentType.objects.get_for_model(Todo)


    def handle(self, *args, **options):
        new_group, created = Group.objects.get_or_create(name='admin')
        self.add('Can delete todo', new_group)
        self.add('Can view todo', new_group)
        self.add('Can add todo', new_group)
        self.add('Can change todo', new_group)

        new_group, created = Group.objects.get_or_create(name='deleter')
        self.add('Can delete todo', new_group)
        self.add('Can view todo', new_group)

        new_group, created = Group.objects.get_or_create(name='writer')
        self.add('Can add todo', new_group)
        self.add('Can view todo', new_group)

        new_group, created = Group.objects.get_or_create(name='toggler')
        self.add('Can change todo', new_group)
        self.add('Can view todo', new_group)

        new_group, created = Group.objects.get_or_create(name='reader')
        self.add('Can view todo', new_group)

    def add(self, name, group):
        model_add_perm = None
        try:
            model_add_perm = Permission.objects.get(name=name)
        except Permission.DoesNotExist:
            pass


        if not model_add_perm:
            model_add_perm = Permission.objects.create(codename=name.replace(' ', '_').lower(),
                                               name=name,
                                               content_type=Command.content_type)

        group.permissions.add(model_add_perm)

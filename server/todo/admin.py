from django.contrib import admin
from django.contrib.auth.models import Permission

from .models import Todo

admin.site.register(Todo)
admin.site.register(Permission)

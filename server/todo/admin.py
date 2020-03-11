from django.contrib import admin
from django.contrib.auth.models import Permission

from .models import Todo, User, Vehicle, Address, Schedule, TransportationType, UserAddress, ScheduledPerson, \
    ScheduledCoach, PersonSkill, PersonType, LocationAddress, LocationSkill, Location, Skill

admin.site.register(Todo)
admin.site.register(Permission)
admin.site.register(User)
admin.site.register(Schedule)
admin.site.register(TransportationType)
admin.site.register(Skill)
admin.site.register(Location)
admin.site.register(LocationSkill)
admin.site.register(LocationAddress)
admin.site.register(PersonType)
admin.site.register(PersonSkill)
admin.site.register(ScheduledCoach)
admin.site.register(ScheduledPerson)
admin.site.register(UserAddress)
admin.site.register(Vehicle)
admin.site.register(Address)

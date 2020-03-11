from django.contrib.auth.models import AbstractUser
from django.db import models
from safedelete import SOFT_DELETE_CASCADE
from safedelete.models import SafeDeleteModel


class BaseModel(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Todo(BaseModel):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.content


class Address(BaseModel):
    address1 = models.CharField(max_length=255, blank=True, null=True)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    zip = models.CharField(max_length=255, blank=True, null=True)


class Schedule(BaseModel):
    date = models.DateField()
    isMaster = models.BooleanField(default=False)
    isFinalized = models.BooleanField(default=False)


class TransportationType(BaseModel):
    name = models.CharField(max_length=255)


class Skill(BaseModel):
    skill = models.CharField(max_length=255)


class Location(BaseModel):
    name = models.CharField(max_length=255)


class LocationSkill(BaseModel):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, blank=True, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, blank=True, null=True)


class LocationAddress(BaseModel):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)


class PersonType(BaseModel):
    type = models.CharField(max_length=255, blank=True, null=True)


class User(AbstractUser):
    person_type = models.ForeignKey(PersonType, on_delete=models.CASCADE, default=2)


class PersonSkill(BaseModel):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, blank=True, null=True)
    person = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)


class ScheduledCoach(BaseModel):
    coach = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    skill = models.ForeignKey(LocationSkill, on_delete=models.SET_NULL, null=True)
    transportation_type = models.ForeignKey(TransportationType, on_delete=models.SET_NULL, null=True)


class ScheduledPerson(BaseModel):
    scheduled_coach = models.ForeignKey(
        ScheduledCoach, on_delete=models.SET_NULL, null=True, related_name='scheduled_person')
    person = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)


class UserAddress(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name='address')
    address = models.OneToOneField(Address, on_delete=models.CASCADE, blank=True, null=True)


class Vehicle(BaseModel):
    description = models.CharField(max_length=255, blank=True, null=True)
    is_owned_by_person = models.BooleanField(null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)


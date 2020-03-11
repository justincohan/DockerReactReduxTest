from djoser.serializers import User
from rest_framework import viewsets

from .models import Todo, User, UserAddress, Schedule, TransportationType, Skill, Location, LocationSkill, \
    Vehicle, ScheduledPerson, ScheduledCoach, PersonSkill, PersonType, LocationAddress
from .permissions import AdminOrReadOnly
from .serializers import TodoSerializer, UserSerializer, UserSerializer, UserAddressSerializer, \
    TransportationTypeSerializer, SkillSerializer, LocationSerializer, LocationSkillSerializer, VehicleSerializer, \
    ScheduledPersonSerializer, ScheduledCoachSerializer, PersonSkillSerializer, PersonTypeSerializer, \
    LocationAddressSerializer


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


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = UserSerializer


class TransportationTypeViewSet(viewsets.ModelViewSet):
    queryset = TransportationType.objects.all()
    serializer_class = TransportationTypeSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationSkillViewSet(viewsets.ModelViewSet):
    queryset = LocationSkill.objects.all()
    serializer_class = LocationSkillSerializer


class LocationAddressViewSet(viewsets.ModelViewSet):
    queryset = LocationAddress.objects.all()
    serializer_class = LocationAddressSerializer


class PersonTypeViewSet(viewsets.ModelViewSet):
    queryset = PersonType.objects.all()
    serializer_class = PersonTypeSerializer


class PersonSkillViewSet(viewsets.ModelViewSet):
    queryset = PersonSkill.objects.all()
    serializer_class = PersonSkillSerializer


class ScheduledCoachViewSet(viewsets.ModelViewSet):
    queryset = ScheduledCoach.objects.all()
    serializer_class = ScheduledCoachSerializer


class ScheduledPersonViewSet(viewsets.ModelViewSet):
    queryset = ScheduledPerson.objects.all()
    serializer_class = ScheduledPersonSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PersonViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        id = PersonType.objects.get(type='Person')
        return User.objects.filter(person_type=id)


class CoachViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        id = PersonType.objects.get(type='Coach')
        print(id, 'id')
        return User.objects.filter(person_type=id)


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer


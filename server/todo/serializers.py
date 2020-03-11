from django.db import transaction
from rest_framework import serializers

from .models import Todo, User, UserAddress, Address, Schedule, Skill, Location, TransportationType, \
    LocationSkill, LocationAddress, PersonType, PersonSkill, ScheduledCoach, ScheduledPerson, Vehicle


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


class ScheduleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Schedule
        fields = ['date', 'isMaster', 'isFinalized']


class TransportationTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransportationType
        fields = ['name']


class SkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = ['skill']


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['name']


class LocationSkillSerializer(serializers.HyperlinkedModelSerializer):
    skill = SkillSerializer(read_only=True)
    location = LocationSerializer(read_only=True)

    class Meta:
        model = LocationSkill
        fields = ['skill', 'location']


class PersonTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PersonType
        fields = ['type']


class PersonSkillSerializer(serializers.HyperlinkedModelSerializer):
    skill = SkillSerializer(read_only=True)

    class Meta:
        model = PersonSkill
        fields = ['skill', 'person']


class VehicleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['description', 'is_owned_by_person', 'user']


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'address1', 'address2', 'city', 'state', 'zip']


class UserAddressSerializer(serializers.HyperlinkedModelSerializer):
    address = AddressSerializer()

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        print(representation)
        address_representation = representation.pop('address')
        for key in address_representation:
            representation[key] = address_representation[key]

        return representation

    class Meta:
        model = UserAddress
        fields = ['id', 'address']


class LocationAddressSerializer(serializers.HyperlinkedModelSerializer):
    address = AddressSerializer(read_only=True)
    location = LocationSerializer(read_only=True)

    class Meta:
        model = LocationAddress
        fields = ['location', 'address']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    address = UserAddressSerializer()
    person_type = PersonTypeSerializer()

    @transaction.atomic()
    def create(self, validated_data):
        address = validated_data.pop('address')
        user = User.objects.create(**validated_data)
        address = address['address']
        address = Address.objects.create(**address)
        UserAddress.objects.create(user=user, address=address)
        return user

    class Meta:
        model = User
        fields = ['id', 'address', 'person_type', 'first_name', 'last_name']


class ScheduledPersonSerializer(serializers.HyperlinkedModelSerializer):
    person = UserSerializer(read_only=True)

    class Meta:
        model = ScheduledPerson
        fields = ['id', 'person']

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        return representation['person']


class ScheduledCoachSerializer(serializers.HyperlinkedModelSerializer):
    skill = SkillSerializer()
    location = LocationSerializer()
    transportation_type = TransportationTypeSerializer()
    coach = UserSerializer()
    scheduled_person = ScheduledPersonSerializer(read_only=True, many=True)

    class Meta:
        model = ScheduledCoach
        fields = ['id', 'coach', 'location', 'skill', 'transportation_type', 'scheduled_person']

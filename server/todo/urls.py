from django.urls import include, path
from rest_framework import routers

from .views import TodoViewSet, UserViewSet, UserViewSet, UserAddressViewSet, VehicleViewSet, \
    ScheduledPersonViewSet, ScheduledCoachViewSet, PersonSkillViewSet, PersonTypeViewSet, LocationSkillViewSet, \
    LocationViewSet, SkillViewSet, TransportationTypeViewSet, ScheduleViewSet, LocationAddressViewSet, PersonViewSet, \
    CoachViewSet

router = routers.DefaultRouter()
router.register(r'todo', TodoViewSet)
router.register(r'users', UserViewSet)
router.register(r'person', PersonViewSet, basename='Person')
router.register(r'coach', CoachViewSet, basename='Coach')
router.register(r'user', UserViewSet)
router.register(r'user_address', UserAddressViewSet)
router.register(r'schedule', ScheduleViewSet)
router.register(r'transportation_type', TransportationTypeViewSet)
router.register(r'skill', SkillViewSet)
router.register(r'location', LocationViewSet)
router.register(r'location_address', LocationAddressViewSet)
router.register(r'location_skill', LocationSkillViewSet)
router.register(r'person_type', PersonTypeViewSet)
router.register(r'person_skill', PersonSkillViewSet)
router.register(r'scheduled_coach', ScheduledCoachViewSet)
router.register(r'scheduled_person', ScheduledPersonViewSet)
router.register(r'vehicle', VehicleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from rest_framework.routers import DefaultRouter
from .views import UserViewSet, current_user_profile
from django.urls import path, include

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('me/', current_user_profile, name='current-user-profile'),
    
    path('', include(router.urls)),
]
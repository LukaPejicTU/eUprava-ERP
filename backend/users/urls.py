from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UserViewSet, current_user_profile, DashboardView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),

    path('me/', current_user_profile, name='current-user-profile'),
    
    path('', include(router.urls)),
]
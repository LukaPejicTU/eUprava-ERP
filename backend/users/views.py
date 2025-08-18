from django.shortcuts import render
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = UserSerializer
	queryset = CustomUser.objects.all()

from django.shortcuts import render
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = UserSerializer

	def get_queryset(self):
		user = self.request.user
		if user.role == CustomUser.Role.ADMIN:
			return CustomUser.objects.all()
		elif user.role == CustomUser.Role.MANAGER:
			return CustomUser.objects.filter(manager=user) | CustomUser.objects.filter(id=user.id)
		else:
			return CustomUser.objects.filter(id=user.id)


@api_view(['GET'])
def current_user_profile(request):
    """
    Returns the details of the currently authenticated user.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
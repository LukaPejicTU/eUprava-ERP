from django.shortcuts import render
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from tasks.models import Task
from .serializers import DashboardSerializer
from .permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):

	permission_classes = [IsAdminUser]

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
@permission_classes([IsAuthenticated])
def current_user_profile(request):
    """
    Returns the details of the currently authenticated user.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class DashboardView(APIView):

	permission_classes = [permissions.IsAuthenticated]

	def get(self, request):
		user = request.user

		my_open_tasks_count = Task.objects.filter(
			assigned_to = user
		).exclude(
			status = Task.Status.COMPLETED
		).count()

		recent_tasks = Task.objects.filter(
			assigned_to = user
		).exclude(
			status = Task.Status.COMPLETED
		).order_by(
			'-created_at'
		)[:5]
		
		data = {
			'my_open_tasks_count' : my_open_tasks_count,
			'recent_tasks' : recent_tasks
		}

		serializer = DashboardSerializer(instance=data)
		return Response(serializer.data)
		
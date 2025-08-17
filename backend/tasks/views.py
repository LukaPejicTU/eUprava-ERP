from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Task
from users.models import CustomUser
from .serializers import TaskSerializer
from rest_framework import filters
from .permissions import IsAdminOrManager

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrManager]

    filterset_fields = ['status', 'assigned_to', 'created_by']
    search_fields = ['title', 'description']

    def get_queryset(self):
        user = self.request.user
        if user.role == CustomUser.Role.ADMIN:
            return Task.objects.all()
        elif user.role == CustomUser.Role.MANAGER:
            subordinates = CustomUser.objects.filter(manager=user)
            return Task.objects.filter(assingned_to__in=subordinates) | Task.objects.filter(created_by=user)
        else:
            return Task.objects.filter(assingned_to=user)
        
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

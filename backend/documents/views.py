from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Document
from .serializers import DocumentSerializer
from users.models import CustomUser
from rest_framework import filters

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    filterset_fields = ['upload_date']
    search_fields = ['title']

    def get_queryset(self):
        user = self.request.user

        if user.role == CustomUser.Role.ADMIN:
            return Document.objects.all()
        elif user.role == CustomUser.Role.MANAGER:
            subordinates = CustomUser.objects.filter(manager=user)
            return Document.objects.filter(uploaded_by__in[user] + list(subordinates))
        else:
            return Document.objects.filter(uploaded_by=user)
            

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


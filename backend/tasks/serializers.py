from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):

    assigned_to_fullname = serializers.CharField(source='assigned_to.full_name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('created_by', 'created_at')

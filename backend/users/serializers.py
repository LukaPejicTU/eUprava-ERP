from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model, exposing only the necessary fields.
    """
    class Meta:
        model = CustomUser
        # We only need the ID to submit the form, and the username for display.
        fields = ['id', 'username', 'first_name', 'last_name', 'role']



from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model, exposing only the necessary fields.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    has_subordinates = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        # We only need the ID to submit the form, and the username for display.
        fields = (
            'id', 'username', 'first_name', 'last_name', 'role', 
            'email', 'manager', 'has_subordinates', 'password' 
        )

    def get_has_subordinates(self, obj):
            """
            Calls the has_subordinates method on the CustomUser model instance.
            'obj' here is the user instance being serialized.
            """
            return obj.has_subordinates()
    
    def create(self, validated_data):
        """
        Create and return a new `CustomUser` instance, given the validated data.
        """
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

class DashboardTaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    status = serializers.CharField(max_length=255)

class DashboardSerializer(serializers.Serializer):
    my_open_tasks_count = serializers.IntegerField()
    recent_tasks = DashboardTaskSerializer(many=True)
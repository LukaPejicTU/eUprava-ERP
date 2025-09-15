from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model, exposing only the necessary fields.
    """

    has_subordinates = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        # We only need the ID to submit the form, and the username for display.
        fields = ['id', 'username', 'first_name', 'last_name', 'role', 'has_subordinates']  


    def get_has_subordinates(self, obj):
            """
            Calls the has_subordinates method on the CustomUser model instance.
            'obj' here is the user instance being serialized.
            """
            return obj.has_subordinates()
    

class DashboardTaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    status = serializers.CharField(max_length=255)

class DashboardSerializer(serializers.Serializer):
    my_open_tasks_count = serializers.IntegerField()
    recent_tasks = DashboardTaskSerializer(many=True)
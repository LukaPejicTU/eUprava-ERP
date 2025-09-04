from rest_framework import serializers
from .models import Document

uploaded_by_username = serializers.CharField(source='uploaded_by.username', read_only = True)
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'file', 'upload_date', 'uploaded_by', 'uploaded_by_username']
        read_only_fields = ['uploaded_by', 'upload_date']

   
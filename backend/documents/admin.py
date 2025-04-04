from django.contrib import admin
from .models import Document

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_by', 'upload_date')
    search_fields = ('title',)
    list_filter = ('upload_date',)
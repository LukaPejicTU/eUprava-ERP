from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # This defines the columns shown in the list of users
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff')
    
    # This defines the layout for the "Edit User" page
    fieldsets = (
        # Section 1: Login Credentials (email is primary)
        (None, {'fields': ('email', 'password')}),
        
        # Section 2: Personal & Role Information
        ('Personal & Role Info', {'fields': ('username', 'first_name', 'last_name', 'role', 'manager')}),
        
        # Section 3: Standard Django Permissions
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        
        # Section 4: Important Dates
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # This defines the fields for the "Add User" page
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            # 'username' is required here because it's in your REQUIRED_FIELDS
            'fields': ('email', 'username', 'password', 'password2', 'role'),
        }),
    )
    
    search_fields = ('email', 'username')
    ordering = ('email',)
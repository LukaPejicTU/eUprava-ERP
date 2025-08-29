# in users/admin.py

from django.contrib import admin
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    # Use our custom forms
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    
    # The model we are administering
    model = CustomUser

    # Display columns in the user list
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'manager', 'is_staff')
    list_filter = ('role', 'manager', 'is_staff', 'is_superuser')
    
    # Define the fields shown on the 'add' and 'change' pages
    # For the 'add' page, it will use the fields from 'add_form'
    # For the 'change' page, it will use the fields from 'form'
    
    search_fields = ('email', 'username')
    ordering = ('email',)

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form for user creation
        """
        defaults = {}
        if obj is None:
            defaults['form'] = self.add_form
        defaults.update(kwargs)
        return super().get_form(request, obj, **defaults)

    def save_model(self, request, obj, form, change):
        """
        Hash the password when saving a user in the admin.
        """
        if obj.password and not obj.password.startswith(('pbkdf2_sha256$', 'bcrypt$', 'argon2')):
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)
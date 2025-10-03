# in users/forms.py

from django import forms
from django.contrib.auth.forms import UserChangeForm # We keep this one, it works well for editing
from .models import CustomUser

class CustomUserCreationForm(forms.ModelForm):
    # We are explicitly defining the password fields ourselves now
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'first_name', 'last_name', 'role', 'manager')

    def clean_password2(self):
        # This is our own validation to make sure the passwords match
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return cd['password2']

    def save(self, commit=True):
        # --- THIS IS OUR DEBUGGING STEP ---
        print("\n--- DEBUG: Form cleaned_data ---")
        print(self.cleaned_data)
        print("---------------------------------\n")
        # --- END DEBUGGING STEP ---

        user = CustomUser.objects.create_user(
            email=self.cleaned_data['email'],
            username=self.cleaned_data['username'],
            password=self.cleaned_data['password'],
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            role=self.cleaned_data.get('role'),
            manager=self.cleaned_data.get('manager')
        )
        return user


# The UserChangeForm for editing is fine and doesn't need to be changed.
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'first_name', 'last_name', 'role', 'manager', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions') 
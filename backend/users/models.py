from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        MANAGER = 'manager', 'Menadžer'
        WORKER = 'worker', 'Radnik'

    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.WORKER)
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def is_admin(self):
        return self.role == self.Role.ADMIN
    
    def is_manager(self):
        return self.role == self.Role.MANAGER
    
    def is_worker(self):
        return self.role == self.Role.WORKER

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def has_subordinates(self):
        return self.subordinates.exists()

    def save(self, *args, **kwargs):
        if self.manager:
            if self.manager.role == self.Role.WORKER:
                self.manager.role = self.Role.MANAGER
                self.manager.save()
        
        super().save(*args, **kwargs)
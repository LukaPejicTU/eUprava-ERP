from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        MANAGER = 'manager', 'Menadžer'
        WORKER = 'worker', 'Radnik'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.WORKER)
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')

    def is_admin(self):
        return self.role == self.Role.ADMIN
    
    def is_manager(self):
        return self.role == self.Role.MANAGER
    
    def is_worker(self):
        return self.role == self.Role.WORKER


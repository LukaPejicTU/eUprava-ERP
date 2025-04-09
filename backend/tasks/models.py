from django.db import models
from users.models import CustomUser

class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Na čekanju'
        IN_PROGRESS = 'in_progress', 'U toku'
        COMPLETED = 'completed', 'Završeno'
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_created')
    assingned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_assigned')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



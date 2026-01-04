from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    # Define the possible roles
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        FACULTY = "FACULTY", "Faculty"
        STUDENT = "STUDENT", "Student"

    # Set the default role to Student
    role = models.CharField(
        max_length=10, 
        choices=Role.choices, 
        default=Role.STUDENT
    )
    
    # Additional common fields
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
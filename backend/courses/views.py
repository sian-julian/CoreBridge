from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Course, Category,Enrollment, Progress,Lesson
from .serializers import CourseSerializer, CategorySerializer,EnrollmentSerializer,ProgressSerializer,LessonSerializer

# Custom Permission to check if the user is a Faculty member
class IsFaculty(permissions.BasePermission):
    def has_permission(self, request, view):
        # Only allow if the user is authenticated and their role is FACULTY
        return bool(request.user and request.user.is_authenticated and request.user.role == 'FACULTY')

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        # This ensures the 'instructor' field is the person logged in
        serializer.save(instructor=self.request.user)

    def get_queryset(self):
        # Optional: If a Faculty is looking at courses, maybe they only want to see THEIR courses?
        # For now, let's keep it so everyone can see all courses.
        return Course.objects.all()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only Faculty can Create, Update, or Delete
            return [IsFaculty()]
        else:
            # Anyone (even guest students) can browse courses
            return [permissions.AllowAny()]
        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer # We'll create this in a second
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Optimized: Students should only see their own enrollments
    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Progress.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsFaculty()]
        return [permissions.AllowAny()]

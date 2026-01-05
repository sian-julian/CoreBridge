from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CategoryViewSet, EnrollmentViewSet, ProgressViewSet,LessonViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()

# 2. Register all your viewsets here (NOT inside urlpatterns)
router.register(r'list', CourseViewSet, basename='course')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'enroll', EnrollmentViewSet, basename='enrollment')
router.register(r'progress', ProgressViewSet, basename='progress')
router.register(r'lessons', LessonViewSet, basename='lesson')

# 3. Include the router urls once
urlpatterns = [
    path('', include(router.urls)),
]
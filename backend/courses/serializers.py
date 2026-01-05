from rest_framework import serializers
from .models import Course, Category, Lesson,Enrollment, Progress

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrolled_at']
        read_only_fields = ['student']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'video_url', 'content', 'order']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    instructor_name = serializers.ReadOnlyField(source='instructor.username')
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'instructor_name', 'category', 'thumbnail', 'lessons', 'created_at']
        read_only_fields = ['instructor']

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ['id', 'lesson', 'completed', 'completed_at']
        read_only_fields = ['student']
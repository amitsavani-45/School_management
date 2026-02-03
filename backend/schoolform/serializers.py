from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'age', 'student_class', 'school', 'subject', 'score', 'result', 'created_at']
        read_only_fields = ['id', 'result', 'created_at']
    
    def validate_age(self, value):
        if value < 5 or value > 100:
            raise serializers.ValidationError("Age must be between 5 and 100")
        return value
    
    def validate_score(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("Score must be between 0 and 100")
        return value
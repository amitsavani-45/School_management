from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'age', 'student_class', 'school', 'subject', 'score', 'result']
        read_only_fields = ['id', 'result']
    
    def validate_age(self, value):
        if value < 5 or value > 100:
            raise serializers.ValidationError("Age must be between 5 and 100")
        return value
    
    def validate_score(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("Score must be between 0 and 100")
        return value
def validate_student_class(self, value):
    # Convert to int first
    try:
        class_value = int(value)
    except (ValueError, TypeError):
        raise serializers.ValidationError("Class must be a valid number")
    
    # Now validate the integer
    if class_value < 1 or class_value > 12:
        raise serializers.ValidationError("Class must be between 1 and 12")
    return class_value
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Student data saved successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Failed to save student data',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_students(request):
    """Get all students"""
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response({
        'message': 'Students retrieved successfully',
        'data': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_student(request):
    """Create a new student record"""
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Student data saved successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Failed to save student data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_student(request, pk):
    """Get a single student by ID"""
    try:
        student = Student.objects.get(pk=pk)
        serializer = StudentSerializer(student)
        return Response({
            'message': 'Student retrieved successfully',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Student.DoesNotExist:
        return Response({
            'message': 'Student not found'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_student(request, pk):
    """Delete a student record"""
    try:
        student = Student.objects.get(pk=pk)
        student.delete()
        return Response({
            'message': 'Student deleted successfully'
        }, status=status.HTTP_200_OK)
    except Student.DoesNotExist:
        return Response({
            'message': 'Student not found'
        }, status=status.HTTP_404_NOT_FOUND)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')

urlpatterns = [
    path('', include(router.urls)),
    # Custom endpoint to match your frontend's expected URL
    path('student/create/', StudentViewSet.as_view({'post': 'create'}), name='student-create'),
]
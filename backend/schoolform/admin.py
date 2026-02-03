from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name', 'age', 'student_class', 'school', 'subject', 'score', 'result', 'created_at']
    list_filter = ['result', 'student_class', 'school', 'subject', 'created_at']
    search_fields = ['name', 'school', 'subject']
    readonly_fields = ['result', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Student Information', {
            'fields': ('name', 'age', 'student_class', 'school')
        }),
        ('Academic Information', {
            'fields': ('subject', 'score', 'result')
        }),
        ('Timestamp', {
            'fields': ('created_at',)
        }),
    )
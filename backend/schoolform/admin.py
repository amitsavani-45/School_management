from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name', 'age', 'student_class', 'school', 'subject', 'score', 'result']
    list_filter = ['result', 'student_class', 'school', 'subject']
    search_fields = ['name', 'school', 'subject']
    readonly_fields = ['result']
    
    
    fieldsets = (
        ('Student Information', {
            'fields': ('name', 'age', 'student_class', 'school')
        }),
        ('Academic Information', {
            'fields': ('subject', 'score', 'result')
        })
        
    )
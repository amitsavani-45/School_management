from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    student_class = models.CharField(max_length=50)
    school = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    result = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'students'
       
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
    
    def save(self, *args, **kwargs):
        # Automatically calculate result based on score
        if self.score >= 40:
            self.result = 'Pass'
        else:
            self.result = 'Fail'
        super().save(*args, **kwargs)
from django.db import models
from django.forms import ModelForm, Textarea

# Create your models here.
class Todo(models.Model):
    name = models.CharField(max_length=150)
    desc = models.CharField(max_length=1024, blank=True)
    created = models.DateTimeField(null=True, auto_now_add=True)
    updated = models.DateTimeField(null=True, auto_now=True)
    completed = models.DateTimeField(null=True, blank=True)
    attachment = models.FileField(upload_to='upload', null=True, blank=True)

    def __unicode__(self):
        return self.name
from django.db import models


class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.content

from django.db import models


FILE_TYPE = (
    ('IM', 'image'),
    ('VI', 'video'),
    ('GE', 'generic'),
)

class FileModel(models.Model):
    type = models.CharField(max_length=2, choices=FILE_TYPE)
    file_name = models.CharField(max_length=200)
    caption = models.CharField(max_length=200)
    file = models.ImageField(upload_to="/static/img/")
    size_width = models.IntegerField(blank=True)
    size_height = models.IntegerField(blank=True)
    creation_date = models.DateTimeField(blank=True)
    update_date = models.DateTimeField(blank=True)



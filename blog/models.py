from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=125)
    pub_date = models.DateField()
    update_date = models.DateField()
    content = models.TextField()
    like = models.IntegerField()
    author = models.ForeignKey(User)


class Reference(models.Model):
    author = models.CharField(max_length=125)
    link = models.CharField(max_length=125)
    article_name = models.CharField(max_length=125)
    page = models.IntegerField()
    article = models.ForeignKey(Article)


class Comment(models.Model):
    user = models.ForeignKey(User)
    comment = models.TextField()
    pub_date = models.DateField()
    like = models.IntegerField()



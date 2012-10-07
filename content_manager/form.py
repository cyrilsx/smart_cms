from django.forms import ModelForm
from models import FileModel


class FileForm(ModelForm):
    class Meta:
        model = FileModel
        #exclude = ('author', 'pub_date', 'update_date', 'like')

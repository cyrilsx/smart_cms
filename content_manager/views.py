from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from models import VideoModel, FileModel, ImageModel
from form import FileRenameForm
from django.core.serializers import serialize
from django.utils.simplejson import loads

CONTENT_TEMPLATE="content_manager/"


@login_required(login_url='/users/login')
def index(request):
    return view_file(request)


@login_required(login_url='/users/login')
def view_file(request, page=0, nb_elem=10):
    data = {}
    files = FileModel.objects.order_by('file_name')[page * nb_elem:nb_elem + page * nb_elem]
    data['items'] = files
    return render_to_response(CONTENT_TEMPLATE + 'view.html', data, context_instance=RequestContext(request))



@login_required(login_url='/users/login')
def delete_file(request, id):
    file = FileModel.objects.get(pk=id)
    file.delete()
    return loads(serialize('json', video)) 


@login_required(login_url='/users/login')
def edit_file(request, id=None):
    data = {}
    file = FileModel()
    
    if request.method == "POST":
        form = FileForm(request.POST,instance=file) # A form bound to the POST data
        if form.is_valid():
            file.file_name = form.cleaned_data['file_name']
            file.caption = form.cleaned_data['caption']

            file.save()
            #return HttpResponseRedirect('/blog/view/%s' % article.id)
    elif request.method == "GET":
        if id != None:
            file = FileModel.objects.get(pk=id)
        form = FileForm(instance=file)
    else:
        raise Http404

    data['form'] = form
    return render_to_response(BLOG_TEMPLATE + 'edit.html', data, context_instance=RequestContext(request))

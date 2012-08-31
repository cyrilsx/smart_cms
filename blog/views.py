from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from models import Article, Reference
from form import ArticleForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import Http404


BLOG_TEMPLATE="blog/"

def home(request):
    data = {}
    articles = Article.objects.order_by('pub_date')[0:10]
    data['articles'] = articles
    return render_to_response(BLOG_TEMPLATE + 'index.html', data, context_instance=RequestContext(request))


def view_article(request, id):
    data = {}
    article = Article.objects.get(pk=id)
    data['article'] = article
    return render_to_response(BLOG_TEMPLATE + 'view.html', data, context_instance=RequestContext(request))


@login_required(login_url='/users/login')
def edit_article(request, id=None):
    data = {}
    article = Article()
    
    if request.method == "POST":
        form = ArticleForm(request.POST,instance=article) # A form bound to the POST data
        if form.is_valid():
            article.title = form.cleaned_data['title']
            article.content = form.cleaned_data['content']
            article.author = User.objects.get(pk=request.user.id)

            article.save()
            return HttpResponseRedirect('/blog/view/%s' % article.id)
    elif request.method == "GET":
        if id != None:
            article = Article.objects.get(pk=id)
        form = ArticleForm(instance=article)
    else:
        raise Http404

    data['form'] = form
    print form.errors
    return render_to_response(BLOG_TEMPLATE + 'edit.html', data, context_instance=RequestContext(request))


@login_required(login_url='/users/login')
def detele_article(request, id):
    article = Article.objects.get(pk=id)
    article.delete()
    return HttpResponseRedirect("/blog/home")

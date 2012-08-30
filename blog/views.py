from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from models import Article, Reference
from form import ArticleForm
from django.contrib.auth.decorators import login_required


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


#@login_required(login_url='/blog/login')
def edit_article(request, id=None):
    data = {}
    if id == None:
        article = Article()
        article.author = request.user
    else:
        article = Article.objects.get(pk=id)

    form = ArticleForm(instance=article)

    if request.method == "POST":
         request.POST["id"] = id
         form = ArticleForm(request.POST,instance=article) # A form bound to the POST data
         if form.is_valid():
             article.title = form.cleaned_data['title']
             article.content = form.cleaned_data['content']
             if article.pub_date == None:
                 article.pub_date = datetime.date

             article.save()
             return HttpResponseRedirect('blog/view/'+article.id)


    data['form'] = form
    return render_to_response(BLOG_TEMPLATE + 'edit.html', data, context_instance=RequestContext(request))

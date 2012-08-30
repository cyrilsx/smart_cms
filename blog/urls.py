from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
        url(r'^home/$', 'blog.views.home', name='home'),
        url(r'^view/(?P<id>\d+)/$', 'blog.views.view_article', name='view'),
        url(r'^edit/(?P<id>\d+)/$', 'blog.views.edit_article', name='edit'),
        url(r'^edit/$', 'blog.views.edit_article', name='edit'),
)

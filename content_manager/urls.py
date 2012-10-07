from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
        url(r'^index/$', 'content_manager.views.index', name='index'),
        # View
        url(r'^view/$', 'content_manager.views.view_video', name='view video'),
        url(r'^view/video/(?P<page>\d+)/(?P<nb_elem>\d+)/$', 'content_manager.views.view_video', name='view video'),
        url(r'^view/image/(?P<page>\d+)/(?P<nb_elem>\d+)/$', 'content_manager.views.view_image', name='view image'),
        url(r'^view/file/(?P<page>\d+)/(?P<nb_elem>\d+)/$', 'content_manager.views.view_file', name='view file'),

        #delete
        url(r'^delete/(?P<id>\d+)/$', 'content_manager.views.delete_file', name='delete file'),

        # new
        url(r'^edit/(?P<id>\d+)/$', 'content_manager.views.edit_article', name='edit'),
        url(r'^edit/$', 'blog.views.edit_article', name='edit'),
)

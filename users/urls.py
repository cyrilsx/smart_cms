from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
        #url(r'^view/(?P<id>\d+)/$', 'users.views.view_user_', name='view'),
        url(r'^edit/(?P<id>\d+)/$', 'users.views.edit_user', name='edit'),
        url(r'^edit/$', 'users.views.edit_user', name='edit'),
        url(r'^login/$', 'users.views.login_user', name='login'),
        url(r'^logout/$', 'users.views.logout_user', name='login'),
)

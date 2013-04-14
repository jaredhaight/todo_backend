from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.ListTodos.as_view(), name="todo-list"),
    url(r'^(?P<pk>[0-9]+)$', views.TodoDetail.as_view(), name="todo-detail"),
    url(r'^users/$', views.ListUsers.as_view(), name="users-list"),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name="user-detail"),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^home/', 'todo.views.api_root')
)

urlpatterns = format_suffix_patterns(urlpatterns)
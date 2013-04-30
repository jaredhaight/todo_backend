from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from todo.api import views

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'todo.api.views.api_root'),
    url(r'^todo$', views.ListTodos.as_view(), name="todo-list"),
    url(r'^todo/(?P<pk>[0-9]+)$', views.TodoDetail.as_view(), name="todo-detail"),
    url(r'^users$', views.ListUsers.as_view(), name="users-list"),
    url(r'^users/(?P<pk>[0-9]+)$', views.UserDetail.as_view(), name="user-detail"),
    url(r'^users/(?P<username>[\-\d\w]+)$', views.UsernameDetail.as_view(), name="user-name"),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

urlpatterns = format_suffix_patterns(urlpatterns)
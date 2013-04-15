# Create your views here.
from django.contrib.auth.models import User
from todo.models import Todo
from todo.api.serializers import TodoSerializer, UserSerializer
from todo.api.permissions import IsOwnerOrReadOnly
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users': reverse('users-list', request=request, format=format),
        'todos': reverse('todo-list', request=request, format=format)
    })

class ListTodos(generics.ListCreateAPIView):
    model = Todo
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.owner = self.request.user

class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Todo
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.owner = self.request.user

class ListUsers(generics.ListAPIView):
    model = User
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    model = User
    serializer_class = UserSerializer
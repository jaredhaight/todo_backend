from django.forms import widgets
from rest_framework import serializers
from django.contrib.auth.models import User
from todo.models import Todo

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Todo
        fields = ('url', 'name', 'desc', 'created', 'updated', 'completed','owner')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    todos = serializers.HyperlinkedRelatedField(view_name='todo-detail', many=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'todos')

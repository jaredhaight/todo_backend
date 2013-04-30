from django.forms import widgets
from rest_framework import serializers
from django.contrib.auth.models import User
from todo.models import Todo

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')
    id = serializers.Field()

    class Meta:
        model = Todo
        fields = ('url', 'id', 'name', 'desc', 'created', 'updated', 'completed','owner')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    todos = TodoSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ('url', 'username', 'todos')

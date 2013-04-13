# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext
from todo.models import Todo

def home(request):
    todos = Todo.objects.all()
    d = dict(todos=todos)
    return render_to_response("home.html", d, context_instance=RequestContext(request))
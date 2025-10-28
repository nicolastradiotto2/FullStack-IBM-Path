from django.shortcuts import render
from .models import Post

def home(request):
    posts = Post.objects.all().order_by('-data_creazione')
    return render(request, 'blog/index.html', {'posts': posts})
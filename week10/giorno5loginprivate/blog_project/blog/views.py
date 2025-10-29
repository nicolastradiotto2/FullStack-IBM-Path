from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Post

def home(request):
    """Mostra tutti i post pubblici del blog."""
    posts = Post.objects.order_by('-data_creazione')
    return render(request, 'blog/index.html', {'posts': posts})

@login_required(login_url='/accounts/login/')
def dashboard(request):
    """Area privata: mostra i post e permette di aggiungerne di nuovi."""
    posts = Post.objects.order_by('-data_creazione')

    if request.method == 'POST':
        titolo = request.POST.get('titolo')
        contenuto = request.POST.get('contenuto')

        # Crea il post solo se i campi non sono vuoti
        if titolo and contenuto:
            Post.objects.create(titolo=titolo, contenuto=contenuto)
            return redirect('dashboard')

    return render(request, 'blog/dashboard.html', {'posts': posts})

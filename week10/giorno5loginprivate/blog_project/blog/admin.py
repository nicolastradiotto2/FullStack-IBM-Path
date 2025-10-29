from django.contrib import admin
from .models import Post   #  importa il modello

class PostAdmin(admin.ModelAdmin):
    list_display = ('titolo', 'data_creazione')  # colonne visibili
    ordering = ('-data_creazione',)

admin.site.register(Post, PostAdmin)  #  registra il modello

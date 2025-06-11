from django.contrib import admin
from .models import Perro, Adoptante, SolicitudAdopcion

admin.site.register(Perro)
admin.site.register(Adoptante)
admin.site.register(SolicitudAdopcion)

# Register your models here.

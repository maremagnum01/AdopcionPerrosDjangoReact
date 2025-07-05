from django.shortcuts import render
from rest_framework import viewsets
from .models import Perro, Adoptante, SolicitudAdopcion
from .serializers import PerroSerializer, AdoptanteSerializer, SolicitudAdopcionSerializer

#Visulizaciones de los modelos
#mostramos los atributos que deseamos, en este caso usamos todos

class PerroViewSet(viewsets.ModelViewSet):
    queryset = Perro.objects.all()
    serializer_class = PerroSerializer

class AdoptanteViewSet(viewsets.ModelViewSet):
    queryset = Adoptante.objects.all()
    serializer_class = AdoptanteSerializer

class SolicitudAdopcionViewSet(viewsets.ModelViewSet):
    queryset = SolicitudAdopcion.objects.all()
    serializer_class = SolicitudAdopcionSerializer

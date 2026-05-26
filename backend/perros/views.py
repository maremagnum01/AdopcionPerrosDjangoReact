from django.shortcuts import render
from rest_framework import viewsets
from .models import Perro, Adoptante, SolicitudAdopcion
from .serializers import PerroSerializer, AdoptanteSerializer, SolicitudAdopcionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import RegistroAdoptanteSerializer

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

class RegistroAdoptanteView(APIView):
    # AllowAny permite que cualquier visitante se registre sin estar logueado previamente
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistroAdoptanteSerializer(data=request.data)
        if serializer.is_valid(): # aca lo verifica
            serializer.save()
            return Response(
                {"mensaje": "Usuario y perfil de adoptante creados con éxito"}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
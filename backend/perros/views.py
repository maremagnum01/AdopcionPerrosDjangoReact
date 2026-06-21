from django.shortcuts import render
from rest_framework import viewsets
from .models import Perro, Adoptante, SolicitudAdopcion
from .serializers import PerroSerializer, AdoptanteSerializer, SolicitudAdopcionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegistroAdoptanteSerializer
from .ia_matcher import calcular_compatibilidad

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
    
class SolicitudAdopcionCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post (self, request):
        perro_id = request.data.get('perro_id')
        if not perro_id:
            return Response({"error": "El campo 'perro_id' es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            perro = Perro.objects.get(id=perro_id)
            if not perro.disponible:
                return Response({"error": "El perro no está disponible para adopción"}, status=status.HTTP_400_BAD_REQUEST)
        
            try:
                Adoptante = request.objects.get(user=request.user)
            except Adoptante.DoesNotExist:
                return Response({"error": "El usuario no tiene un perfil de adoptante"}, status=status.HTTP_400_BAD_REQUEST)
            
            solicitud = SolicitudAdopcion.objects.create(perro=perro, adoptante=Adoptante, estado='PENDIENTE')
            
            perro.disponible = False
            perro.save()
            
            return Response({"mensaje": f"¡Solicitud registrada con éxito para {perro.nombre}!",
                "solicitud_id": solicitud.id}, status=status.HTTP_201_CREATED)
        except Perro.DoesNotExist:
            return Response({"error": "Perro no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RecomendacionesIAView(APIView):
    # 🔒 Seguridad: Obligatorio estar logueado para calcular su match personalizado
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # 1. Buscamos el perfil de adoptante del usuario que hace la petición
            adoptante = Adoptante.objects.get(user=request.user)
        except Adoptante.DoesNotExist:
            return Response({"error": "Debe completar su perfil de adoptante para usar la recomendación por IA."}, status=status.HTTP_400_BAD_REQUEST)
        
        # 2. Buscamos solo los perros que estén disponibles
        perros = Perro.objects.filter(disponible=True)
        lista_recomendados = []

        # 3. Recorremos los perros y les calculamos el match individual
        for perro in perros:
            porcentaje = calcular_compatibilidad(adoptante, perro)
            
            # Convertimos el objeto Perro a JSON con tu Serializer existente
            perro_data = PerroSerializer(perro, context={'request': request}).data
            
            # Le inyectamos una clave nueva al JSON llamada 'match_porcentaje'
            perro_data['match_porcentaje'] = porcentaje
            lista_recomendados.append(perro_data)
        
        # 4. Ordenamos la lista de mayor a menor porcentaje (reverse=True)
        lista_recomendados = sorted(lista_recomendados, key=lambda x: x['match_porcentaje'], reverse=True)

        return Response(lista_recomendados, status=status.HTTP_200_OK)
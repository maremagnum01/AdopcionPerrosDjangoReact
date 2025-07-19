from rest_framework import serializers
from .models import Perro, Adoptante, SolicitudAdopcion

#Serielizadores de los modelos para pasarlos a Json

class PerroSerializer(serializers.ModelSerializer):
    # img = serializers.ImageField(use_url=True)
    class Meta:
        model = Perro
        fields = '__all__'
        
class AdoptanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adoptante
        fields = '__all__'
        
class SolicitudAdopcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudAdopcion
        fields = '__all__'
        

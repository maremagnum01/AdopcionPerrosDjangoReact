from rest_framework import serializers
from .models import Perro, Adoptante, SolicitudAdopcion
from django.contrib.auth.models import User  # Importamos el modelo User nativo

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


class RegistroAdoptanteSerializer(serializers.ModelSerializer):
    # Definimos los campos que necesitamos del User de Django
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Adoptante
        # Mapeamos los campos del User + los campos específicos de Adoptante
        fields = [
            'username', 'password', 'email', 'dni', 'telefono', 'edad',
            'tipo_vivienda', 'tiene_niños', 'tiene_otras_mascotas', 
            'tiempo_disponible', 'actividad_fisica'
        ]

    def create(self, validated_data):
        # 1. Extraemos los datos del usuario del diccionario validado
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        # 2. Creamos el objeto User usando create_user (esto encripta la contraseña automáticamente)
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # 3. Creamos el perfil de Adoptante vinculándolo al usuario recién creado
        adoptante = Adoptante.objects.create(user=user, **validated_data)
        
        return adoptante
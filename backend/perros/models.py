from django.db import models
from django.contrib.auth.models import User #importamos el modelo de usuario para relacionarlo con el adoptante
from django.utils import timezone

#Modelos de los objetos perro, adoptante y la solicitud de adopcion
#con sus correspondientes atributos 

class Perro(models.Model):
    OPCIONES_TAMAÑO = [
        ('1', 'Chico'),
        ('2', 'Mediano'),
        ('3', 'Grande')
    ]
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    tamaño = models.CharField(max_length=1, choices=OPCIONES_TAMAÑO, blank=False)
    raza = models.CharField(max_length=100)
    img = models.ImageField(upload_to="img_perros", null=True, blank=True, default='img_perros/default.jpg')
    # img = models.ImageField() ## usar asi con CLOUDINARY
    descripcion = models.TextField(blank=True, null=True, default='No incluye descripcion', max_length=50)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Adoptante(models.Model):
    #Opciones de vivienda
    OPCIONES_VIVIENDA = [
        ('casa_patio', 'Casa con patio/jardín'),
        ('casa_sin_patio', 'Casa sin patio'),
        ('depto_grande', 'Departamento grande'),
        ('depto_chico', 'Departamento chico')        
    ]
    #Tiempo dispinible
    OPCIONES_TIEMPO = [
        ('bajo', 'Poco tiempo (menos de 1 hora al día)'),
        ('medio', 'Tiempo moderado (1 a 2 horas al día)'),
        ('alto', 'Mucho tiempo (más de 2 horas al día)')
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil_adoptante', null=True, blank=True)
    dni = models.CharField(max_length=10)
    telefono = models.CharField(max_length=20)
    edad = models.IntegerField(null=True, blank=True)
    
    #Algoritmo para IA
    tipo_vivienda = models.CharField(max_length=20, choices=OPCIONES_VIVIENDA, default='casa_patio')
    tiene_niños = models.BooleanField(default=False, help_text="¿Viven niños en el hogar?")
    tiene_otras_mascotas = models.BooleanField(default=False, help_text="¿Tiene otros perros o gatos?")
    tiempo_disponible = models.CharField(max_length=10, choices=OPCIONES_TIEMPO, default='medio')
    actividad_fisica = models.BooleanField(default=False, help_text="¿Busca un perro para hacer actividad intensa/correr?")
    

    def __str__(self):
        # Si tiene usuario vinculado, muestra el username.
        if self.user and self.user.username:
            return f"Perfil de {self.user.username}"
        # Si estás creando uno nuevo en el admin y no tiene DNI cargado todavía:
        if self.dni:
            return f"Adoptante DNI: {self.dni}"
        return "Nuevo Adoptante (En creación)"

class SolicitudAdopcion(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente de aprobación'),
        ('APROBADO', 'Adoptado definitivamente'),
        ('RECHAZADO', 'Solicitud rechazada'),
    ]

    adoptante = models.ForeignKey(Adoptante, on_delete=models.CASCADE)
    perro = models.ForeignKey(Perro, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=50, choices=ESTADOS, default='PENDIENTE')

    def __str__(self):
        # Buscamos el nombre del adoptante de forma segura
        if self.adoptante and self.adoptante.user and self.adoptante.user.username:
            username = self.adoptante.user.username
        elif self.adoptante and self.adoptante.dni:
            username = f"Adoptante DNI {self.adoptante.dni}"
        else:
            username = "Adoptante nuevo"
            
        # Buscamos el nombre del perro de forma segura
        perro_nombre = self.perro.nombre if self.perro else "Perro nuevo"
        
        return f"Solicitud de {username} para {perro_nombre} - Estado: {self.estado}"
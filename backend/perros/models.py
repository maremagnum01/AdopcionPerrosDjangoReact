from django.db import models

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
    descripcion = models.TextField(blank=True, null=True, default='No incluye descripcion', max_length=50)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Adoptante(models.Model):
    nombre = models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre


class SolicitudAdopcion(models.Model):
    perro = models.ForeignKey(Perro, on_delete=models.CASCADE)
    adoptante = models.ForeignKey(Adoptante, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=50, default='pendiente')

    def __str__(self):
        return f"{self.adoptante} solicita a: {self.perro}"


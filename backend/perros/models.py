from django.db import models

#Modelos de los objetos perro, adoptante y la solicitud de adopcion
#con sus correspondientes atributos 

class Perro(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    tamaño = models.CharField(max_length=50)
    raza = models.CharField(max_length=100)
    img = models.ImageField(upload_to="img_perros", null=True, blank=True)
    descripcion = models.TextField()
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


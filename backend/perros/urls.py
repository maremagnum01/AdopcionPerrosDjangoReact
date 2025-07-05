from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerroViewSet, AdoptanteViewSet, SolicitudAdopcionViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'perros', PerroViewSet)
router.register(r'adoptantes', AdoptanteViewSet)
router.register(r'solicitudes', SolicitudAdopcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #url para imagenes de los modelos

#Aca se utiliza las urls para los modelos, que se gestionaran mediante el admin

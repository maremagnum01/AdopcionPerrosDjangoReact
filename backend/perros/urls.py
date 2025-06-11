from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerroViewSet, AdoptanteViewSet, SolicitudAdopcionViewSet

router = DefaultRouter()
router.register(r'perros', PerroViewSet)
router.register(r'adoptantes', AdoptanteViewSet)
router.register(r'solicitudes', SolicitudAdopcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

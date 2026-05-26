from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerroViewSet, AdoptanteViewSet, SolicitudAdopcionViewSet,RegistroAdoptanteView
from django.conf import settings
from django.conf.urls.static import static

# Vistas simplejwt para el login
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'perros', PerroViewSet)
router.register(r'adoptantes', AdoptanteViewSet)
router.register(r'solicitudes', SolicitudAdopcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # --- NUEVOS ENDPOINTS PARA AUTENTICACIÓN ---
    # Endpoint para Login (React enviará usuario y contraseña, recibirá los tokens)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Endpoint para refrescar el token de acceso cuando venza
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # ruta de registro
    path('registro/', RegistroAdoptanteView.as_view(), name='registro_adoptante'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #url para imagenes de los modelos

#Aca se utiliza las urls para los modelos, que se gestionaran mediante el admin

"""
URL configuration for adopcionperros project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #endpoint admin
    path('admin/', admin.site.urls),
    #conexion api para el front
    path('api/', include('perros.urls')),
]

## Verifica que en settings el DEBUG este en True y asi visualizar las imagenes de carpeta MEDIA
## Dentro de settings se cargar el .env, el cual tiene esta funcion activada
## Esto permite visualizar las imagenes en Modo DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# Adopción y Clínica de Mascotas

Este proyecto es una plataforma web para la adopción de perros y gestión de una clínica veterinaria. Está compuesto por un backend desarrollado en **Django** (Python) y un frontend realizado en **React**. Permite a los usuarios ver perros disponibles para adopción, gestionar solicitudes y contactar a la clínica.

---

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
  - [Backend (Django)](#backend-django)
  - [Frontend (React)](#frontend-react)
- [Despliegue](#despliegue)
- [Descripción de la Funcionalidad](#descripción-de-la-funcionalidad)
- [Créditos](#créditos)

---

## Características
- Listado de perros disponibles para adopción.
- Gestión de solicitudes de adopción.
- Registro de adoptantes.
- Sección de contacto y localización de la clínica.
- Interfaz moderna y responsiva.

## Tecnologías
- **Backend:** Python, Django, Django REST Framework, Cloudinary (almacenamiento de imágenes), SQLite/PostgreSQL.
- **Frontend:** React, Bootstrap, Axios.
- **Despliegue:** Render, Gunicorn, Whitenoise.

## Estructura del Proyecto
```
├── backend/         # Backend Django
│   ├── perros/      # App principal (modelos, vistas, serializers)
│   ├── adopcionperros/ # Configuración Django
│   ├── ...
├── frontend/        # Frontend React
│   ├── src/         # Componentes y servicios
│   ├── public/
│   ├── ...
├── readme.md        # Este archivo
```

## Instalación y Ejecución

### Backend (Django)
1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Crea y activa un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Realiza migraciones y ejecuta el servidor:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend (React)
1. Ve a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` y define la URL de la API:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Ejecuta la aplicación:
   ```bash
   npm start
   ```

## Despliegue
- El backend está preparado para desplegarse en Render.com usando Gunicorn y Whitenoise.
- Archivos relevantes: `Procfile`, `render.yaml`, `render-build.sh`.
- El frontend puede desplegarse en servicios como Vercel, Netlify o Firebase Hosting.

## Descripción de la Funcionalidad
- **Backend:**
  - Modelos principales: `Perro` (nombre, edad, tamaño, raza, imagen, descripción, disponibilidad), `Adoptante` (nombre, DNI, email, teléfono), `SolicitudAdopcion` (perro, adoptante, fecha, estado).
  - API REST para listar perros, gestionar solicitudes y adoptantes.
  - Almacenamiento de imágenes en Cloudinary. (no utilizado pero no descartado)
- **Frontend:**
  - Listado de perros en adopción con imágenes y detalles.
  - Formulario de contacto y sección de localización de la clínica.
  - Consumo de la API mediante Axios.

## Créditos
- Proyecto realizado para la materia de Programación Orientada a Objetos.
- Backend: Python/Django por Ezequiel Di lallo.
- Frontend: React por Ezequiel Di lallo.

---

¡Gracias por contribuir o utilizar este proyecto! Para dudas o sugerencias, contacta al equipo de desarrollo.

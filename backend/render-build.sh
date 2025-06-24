#Script para render, dependencias y migraciones
#!/usr/bin/env bash

# Instala dependencias
pip install -r requirements.txt

# Aplica migraciones de base de datos
python manage.py migrate

# Junta archivos estáticos
python manage.py collectstatic --noinput

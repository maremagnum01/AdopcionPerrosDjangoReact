#!/bin/bash

# Nombre del entorno virtual
VENV_DIR="venv"

echo "Eliminando entorno virtual anterior (si existe)..."
rm -rf $VENV_DIR

echo "Creando nuevo entorno virtual..."
python3 -m venv $VENV_DIR

echo "Activando entorno virtual..."
source $VENV_DIR/bin/activate

echo "Instalando Django y Django REST Framework..."
pip install --upgrade pip
pip install django djangorestframework

echo "Verificando instalación..."
python -m django --version

echo ""
echo "Entorno backend configurado exitosamente."
echo "Recordá correr 'source $VENV_DIR/bin/activate' antes de trabajar."

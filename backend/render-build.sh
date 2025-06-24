#!/usr/bin/env bash

# ¡Este script se ejecuta después del build!
python manage.py migrate
python manage.py collectstatic --noinput

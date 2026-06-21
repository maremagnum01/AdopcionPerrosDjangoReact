import math

def calcular_similitud_coseno(vector_a, vector_b):
    producto_punto = sum(a * b for a, b in zip(vector_a, vector_b))
    magnitud_a = math.sqrt(sum(a ** 2 for a in vector_a))
    magnitud_b = math.sqrt(sum(b ** 2 for b in vector_b))
    if magnitud_a == 0 or magnitud_b == 0:
        return 0.0
    return producto_punto / (magnitud_a * magnitud_b)


def calcular_compatibilidad(adoptante, perro):
    """
    Algoritmo de recomendación que cruza el perfil del adoptante 
    con los campos estructurados y cualitativos del modelo Perro.
    """
    
    # 1. PASAMOS TEXTOS A MINÚSCULAS PARA EL ANÁLISIS
    raza = perro.raza.lower() if perro.raza else ""
    desc = perro.descripcion.lower() if perro.descripcion else ""
    texto_total = f"{raza} {desc}"

    # 2. EVALUAMOS RAZAS Y COMPORTAMIENTO (Deducción por reglas de negocio)
    es_raza_amigable = any(r in texto_total for r in ['labrador', 'golden', 'bulldog', 'caniche', 'boxer', 'poodle', 'mimoso', 'bueno', 'cariñoso'])
    es_raza_energetica = any(r in texto_total for r in ['ovejero', 'collie', 'pitbull', 'husky', 'boxer', 'activo', 'jugueton', 'correr', 'energia', 'deportivo'])

    # 3. CONSTRUIOS EL VECTOR DEL ADOPTANTE
    # Puntos de vivienda: [Espacio General, Tolera Grande, Tolera Mediano]
    vivienda_puntos = {
        'casa_patio': [1.0, 1.0, 1.0],
        'casa_sin_patio': [0.7, 0.4, 0.9],
        'depto_grande': [0.6, 0.3, 0.8],
        'depto_chico': [0.3, 0.0, 0.4]
    }
    espacio_adoptante = vivienda_puntos.get(adoptante.tipo_vivienda, [0.5, 0.5, 0.5])
    
    # Actividad del adoptante (alto = 1.0, medio = 0.5, bajo = 0.2)
    actividad_adoptante = 1.0 if adoptante.tiempo_disponible == 'alto' else (0.5 if adoptante.tiempo_disponible == 'medio' else 0.2)
    
    # Entorno familiar (Niños o Mascotas)
    tiene_entorno_sensible = 1.0 if (adoptante.tiene_niños or adoptante.tiene_otras_mascotas) else 0.0

    vector_adoptante = [
        espacio_adoptante[0],   # Espacio en casa
        espacio_adoptante[1],   # Tolerancia a grandes
        espacio_adoptante[2],   # Tolerancia a medianos
        actividad_adoptante,    # Ganas de hacer deporte / tiempo
        tiene_entorno_sensible  # Necesidad de perro familiar
    ]

    # 4. CONSTRUIMOS EL VECTOR DEL PERRO (Usando tus campos reales)
    # Tamaño real de tu Base de Datos ('1'=Chico, '2'=Mediano, '3'=Grande)
    req_chico = 1.0 if perro.tamaño == '1' else 0.0
    req_mediano = 1.0 if perro.tamaño == '2' else 0.0
    req_grande = 1.0 if perro.tamaño == '3' else 0.0

    # Puntuamos qué tan apto es el perro para espacios reducidos según su tamaño real
    apto_espacio_chico = 0.9 if perro.tamaño == '1' else (0.5 if perro.tamaño == '2' else 0.2)

    # Nivel de energía del perro (Mezclamos Tamaño + Edad + Raza)
    # Un perro cachorro/joven ('edad' baja) o de raza energética sumará más aquí
    energia_base = 0.8 if perro.tamaño == '3' else (0.6 if perro.tamaño == '2' else 0.4)
    if perro.edad <= 2: 
        energia_base += 0.15 # Los cachorros tienen más energía
    if es_raza_energetica:
        energia_base += 0.2
    energia_perro = max(0.1, min(energia_base, 1.0)) # Toque de normalización

    # Adaptabilidad familiar del perro
    # Si el usuario tiene niños, un perro de raza amigable o tamaño chico/mediano sumará más puntos
    familiar_base = 0.6
    if es_raza_amigable:
        familiar_base += 0.3
    if perro.tamaño == '1' or perro.tamaño == '2':
        familiar_base += 0.1
    familiar_perro = max(0.1, min(familiar_base, 1.0))

    vector_perro = [
        apto_espacio_chico,
        req_grande,
        req_mediano,
        energia_perro,
        familiar_perro
    ]

    # 5. CÁLCULO MATEMÁTICO FINALES
    similitud = calcular_similitud_coseno(vector_adoptante, vector_perro)
    porcentaje = int(similitud * 100)
    
    return max(0, min(porcentaje, 100))
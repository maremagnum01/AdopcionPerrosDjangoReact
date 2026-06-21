import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    const lat = -34.602536;
    const lng = -58.44171;

    // 1. Inicializamos el mapa en el div con id="map"
    const map = window.L.map("map").setView([lat, lng], 15);

    // 2. Cargamos las imágenes (Tiles) del mapa de OpenStreetMap
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 3. Creamos el marcador del refugio con su ventana emergente
    const marker = window.L.marker([lat, lng]).addTo(map);
    marker.bindPopup("<b>¡Nuestro Refugio y Clínica!</b><br>Atención gratuita.").openPopup();

    // Fix para recalcular tamaño al renderizar
    setTimeout(() => { map.invalidateSize(); }, 400);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="map_section" style={{ position: "relative", width: "100%", minHeight: "450px" }}>
      
      {/* 1. El mapa de fondo ocupa el 100% y es totalmente interactivo */}
      <div id="map" className="h-100 w-100" style={{ minHeight: "450px", width: "100%" }}></div>

      {/* 2. El contenedor del formulario flotante (Alineado estrictamente a la derecha) */}
      <div 
        className="form_container" 
        style={{ 
          position: "absolute", 
          top: "50%", 
          right: "5%", /* Lo separa un poco del borde derecho de la pantalla */
          transform: "translateY(-50%)", 
          zIndex: 1000, 
          width: "90%",
          maxWidth: "360px", /* Controlamos el tamaño exacto para que no sea gigante */
        }}
      >
        {/* Eliminamos las columnas y offsets fantasmas para que el mapa quede libre */}
        <form action="">
          <div className="text-center">
            <h3>Contáctenos</h3>
          </div>
          <div>
            <input type="text" placeholder="Nombre" className="pt-3" />
          </div>
          <div>
            <input type="text" placeholder="Numero telefonico" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="text" className="message-box" placeholder="Su mensaje" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Map;
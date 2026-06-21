import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import api from "@/Services/api";
// import api from "@/Services/api_produccion";

const PerroList = ({ isLogged, onOpenLogin, onOpenVisita }) => {
  const [perros, setPerros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función dinámica para traer los perros (Con IA si está logueado, común si no)
  const obtenerPerros = () => {
    const endpoint = isLogged ? "/perros-ia/" : "/perros/";

    // Configuramos las cabeceras de seguridad con el token JWT si corresponde
    const config = {};
    if (isLogged) {
      const token = localStorage.getItem("access_token"); // Ajustalo si usás otro nombre en localStorage
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }

    api
      .get(endpoint, config)
      .then((response) => setPerros(response.data))
      .catch((error) => console.error("Error al obtener perros:", error))
      .finally(() => setLoading(false));
  };

  // Re-ejecuta la consulta si el usuario inicia o cierra sesión para cambiar de endpoint
  useEffect(() => {
    setLoading(true);
    obtenerPerros();
  }, [isLogged]);

  // Función de adopción (queda lista por si se usa en el flujo de visitas o futuro botón)
  const handleAdoptar = (perroId) => {
    const token = localStorage.getItem("access_token");
    api
      .post(
        "/adoptar/",
        { perro_id: perroId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      .then((response) => {
        alert(
          response.data.mensaje || "¡Solicitud de adopción enviada con éxito!"
        );
        obtenerPerros();
      })
      .catch((error) => {
        console.error("Error al procesar adopción:", error);
        const mensajeError =
          error.response?.data?.error ||
          "Hubo un error al procesar tu solicitud.";
        alert(mensajeError);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h4>Cargando Api de OnRender (Tardara unos segundos)</h4>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <ClipLoader color="#0dc3ff" size={50} />
        </div>
      </div>
    );
  }

  return (
    <div
      id="listaperros"
      style={{
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        padding: "50px",
      }}
    >
      <h2>Nuestros perritos en adopcion</h2>
      <ul
        style={{
          listStyle: "none",
          width: "100%",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "30px",
        }}
        className="container"
      >
        {perros.map((perro) => (
          <li key={perro.id}>
            {/* Adaptamos dinámicamente el alto si se renderiza el bloque de IA */}
            <div
              className="card"
              style={{
                width: "151px",
                height: isLogged ? "385px" : "350px",
                transition: "height 0.3s ease",
              }}
            >
              <img
                src={perro.img}
                className="card-img-top"
                alt={perro.nombre}
                style={{
                  width: "150px",
                  height: "150px",
                  minHeight: "149px",
                  objectFit: "cover",
                  margin: "auto",
                  borderRadius: "5px",
                }}
              />
              <div
                className="card-body"
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <div>
                  <h5
                    className="card-title"
                    style={{ fontSize: "16px", margin: "0 0 2px 0" }}
                  >
                    {perro.nombre}
                  </h5>
                  <p style={{ fontSize: "14px", margin: 0 }}>
                    Raza: <b>{perro.raza}</b>
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "12px",
                      margin: "3px 0",
                      height: "32px",
                      overflow: "hidden",
                    }}
                  >
                    {perro.descripcion}
                  </p>
                </div>

                {/*  SECCIÓN DE IA: Renderiza la barrita de compatibilidad si el usuario está logueado */}
                {isLogged && perro.match_porcentaje !== undefined && (
                  <div style={{ margin: "5px 0" }}>
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#6f42c1",
                      }}
                    >
                      <span>Match IA</span>
                      <span>{perro.match_porcentaje}%</span>
                    </div>
                    <div className="progress" style={{ height: "5px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${perro.match_porcentaje}%`,
                          backgroundColor:
                            perro.match_porcentaje > 75
                              ? "#198754"
                              : perro.match_porcentaje > 45
                              ? "#ffc107"
                              : "#dc3545",
                        }}
                        aria-valuenow={perro.match_porcentaje}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                )}

                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: perro.disponible ? "green" : "red",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    <b>{perro.disponible ? "Disponible" : "Reservado"}</b>
                  </span>

                  {!isLogged ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm w-100"
                      onClick={onOpenLogin}
                    >
                      Iniciá sesión
                    </button>
                  ) : !perro.disponible ? (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm w-100"
                      disabled
                    >
                      Reservado
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success btn-sm w-100"
                      onClick={onOpenVisita}
                    >
                      ¡Visitar!
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerroList;

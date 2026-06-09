import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import api from "@/Services/api";
// import api from "@/Services/api_produccion";

const PerroList = ({ isLogged, onOpenLogin }) => {
    const [perros, setPerros] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para traer los perros de la API (La aislamos para poder volver a llamarla)
    const obtenerPerros = () => {
        api.get("/perros/")
            .then((response) => setPerros(response.data))
            .catch((error) => console.error("Error al obtener perros:", error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);
        obtenerPerros();
    }, []);

    // 2. Creamos la función que maneja el click de adopción conectándose con Django
    const handleAdoptar = (perroId) => {
        api.post("/adoptar/", { perro_id: perroId })
            .then((response) => {
                alert(response.data.mensaje || "¡Solicitud de adopción enviada con éxito!");
                obtenerPerros();
            })
            .catch((error) => {
                console.error("Error al procesar adopción:", error);
                const mensajeError = error.response?.data?.error || "Hubo un error al procesar tu solicitud.";
                alert(mensajeError);
            });
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h4>Cargando Api de OnRender (Tardara unos segundos)</h4>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                    <ClipLoader color="#0dc3ff" size={50} />
                </div>
            </div>
        );
    }

    return (
        <div id='listaperros' style={{ textAlign: 'center', backgroundColor: '#f8f9fa', padding: '50px' }}>
            <h2>Nuestros perritos en adopcion</h2>
            <ul style={{ listStyle: 'none', width: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', padding: '30px' }} className='container'>
                {perros.map((perro) => (
                    <li key={perro.id}>
                        <div className="card" style={{ width: '151px', height: '350px' }}>
                            <img src={perro.img} className="card-img-top" alt={perro.nombre} style={{ width: '150px', height: '150px', minHeight: '149px', objectFit: 'cover', margin: 'auto', borderRadius: '5px' }} />
                            <div className="card-body" style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                                <h5 className="card-title">{perro.nombre}</h5>
                                <p style={{ fontSize: '15px', margin: 0 }}>Raza: <b>{perro.raza}</b></p>
                                <p className="card-text" style={{ fontSize: '13px', margin: '5px 0' }}>{perro.descripcion}</p>
                                <span style={{ fontSize: '13px', color: perro.disponible ? "green" : "red", marginBottom: '5px' }}>
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
                                        Reservado / Adoptado
                                    </button>
                                ) : (
                                    <button 
                                        type="button" 
                                        className="btn btn-success btn-sm w-100" 
                                        onClick={() => handleAdoptar(perro.id)}
                                    >
                                        ¡Adoptar!
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PerroList;
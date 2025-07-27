import React, {useEffect, useState} from 'react';
import api from "@/Services/api";
// import api from "@/Services/api_produccion";

const PerroList = ()=>{
    const [perros, setPerros] = useState([]);

    useEffect(()=>{
        api.get("/perros/")
        .then((response) => setPerros(response.data))
        .catch((error) => console.error("Error al obtener perros:", error));
    }, []);

    return (
        <div id='listaperros' style= {{textAlign: 'center', backgroundColor: '#f8f9fa', padding: '50px'}}>
            <h2>Nuestros perritos en adopcion</h2>
            <ul style={{listStyle: 'None', width: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', padding:'30px'}} className='container'>
                {perros.map((perro) => (
                    <li key={perro.id} >
                        <div className="card" style={{width: '151px', height: '350px'}}>
                            <img src={perro.img} className="card-img-top" alt={perro.nombre} style={{ width: '150px', height: '150px', minHeight: '149px', objectFit: 'cover', margin: 'auto', bordeRadius: '5px'}}/>
                            <div className="card-body" style={{padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1}}>
                                <h5 className="card-title">{perro.nombre}</h5>
                                <p style={{fontSize: '15px'}}>Raza: <b>{perro.raza}</b></p>
                                <p className="card-text" style={{fontSize: '13px'}}>{perro.descripcion}</p>
                                <span style={{fontSize: '13px', color: "green"}}><b>{perro.disponible ? "Disponible" : "Reservado"}</b></span>
                                {/* <a href="/" className="btn btn-primary">Adoptar</a> */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
} 

export default PerroList;
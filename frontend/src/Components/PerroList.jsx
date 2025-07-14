import React, {useEffect, useState} from 'react';
import api from "@/Services/api";

const PerroList = ()=>{
    const [perros, setPerros] = useState([]);

    useEffect(()=>{
        api.get("/perros/")
        .then((response) => setPerros(response.data))
        .catch((error) => console.error("Error al obtener perros:", error));
    }, []);

    return (
        <div id='listaperros' style= {{textAlign: 'center'}}>
            <h2>Lista de perros en adopcion</h2>
                <ul style={{listStyle: 'None', width: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'}} className='container'>
                    {perros.map((perro) => (
                        <li key={perro.id}>
                        <div className="card">
                            <img src={perro.img} className="card-img-top" alt={perro.nombre} style={{ width: '150px', height: '150px', objectFit: 'cover', margin: 'auto', marginTop: '10px', bordeRadius: '5px'}}/>
                            <div className="card-body">
                                <h5 className="card-title">{perro.nombre}</h5>
                                <h6>Raza: {perro.raza}</h6>
                                <p className="card-text">{perro.descripcion}</p>
                                {/* <a href="/" className="btn btn-primary">Adoptar</a> */}
                            </div>
                        </div>
                        </li>
                    ))}
                </ul>

            {/* <ul>
                {perros.map((perro)=>(
                    <li key={perro.id}>
                        {perro.nombre}, {perro.raza}, {perro.edad} anios 
                    </li>
                ))}
            </ul> */}
        </div>
    )
} 

export default PerroList;
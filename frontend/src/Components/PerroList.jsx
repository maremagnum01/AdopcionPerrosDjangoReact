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
        <div class='container' id='listaperros'>
            <h2>Lista de perros </h2>
                <ul>
                    {perros.map((perro) => (
                        <li key={perro.id}>
                        <div className="card" Style={{ width: '2rem' }}>
                            <img src={perro.img} class="card-img-top" alt={perro.nombre}/>
                            <div className="card-body">
                                <h5 className="card-title">{perro.nombre}</h5>
                                <p className="card-text">{perro.descripcion}</p>
                                <a href="/" className="btn btn-primary">Adoptar</a>
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
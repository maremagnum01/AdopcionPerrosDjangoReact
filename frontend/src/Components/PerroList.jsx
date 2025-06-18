import React, {useEffect, useState} from 'react';
import api from "../Services/api";

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
                {perros.map((perro)=>(
                    <li key={perro.id}>
                        <div class="card" Style="width: 18rem;">
                            <img src="..." class="card-img-top" alt={perro.nombre}/>
                            <div class="card-body">
                                <h5 class="card-title">{perro.nombre}</h5>
                                <p class="card-text">{perro.descripcion}</p>
                                <a href="\" class="btn btn-primary">Adoptar</a>
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
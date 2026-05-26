import React, { useState } from 'react';
import api from '@/Services/api';

const Registro = ({ AlCerrar }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', dni: '', telefono: '', edad: '',
    tipo_vivienda: 'casa_patio', tiene_niños: false, tiene_otras_mascotas: false,
    tiempo_disponible: 'medio', actividad_fisica: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/registro/', formData)
      .then(() => {
        alert("¡Registro exitoso! Ya podés iniciar sesión con tu usuario.");
        if (AlCerrar) AlCerrar();
      })
      .catch((error) => {
        console.error("Error en registro:", error.response?.data);
        alert("Hubo un error al registrarse. Verificá los datos.");
      });
  };

  return (
    <div className="text-start p-2" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <h3 className="mb-3 text-center">Registro de Adoptante</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input className="form-control" type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input className="form-control" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input className="form-control" type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input className="form-control" type="text" name="dni" placeholder="DNI" onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input className="form-control" type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="number" name="edad" placeholder="Edad" onChange={handleChange} required />
        </div>

        <hr />
        <h5 className="text-muted mb-2" style={{fontSize: '15px'}}>Datos para la IA (Match)</h5>

        <div className="mb-2">
          <label className="form-label mb-1" style={{fontSize: '13px'}}>Tipo de Vivienda</label>
          <select className="form-select" name="tipo_vivienda" onChange={handleChange}>
            <option value="casa_patio">Casa con patio/jardín</option>
            <option value="casa_sin_patio">Casa sin patio</option>
            <option value="depto_grande">Departamento grande</option>
            <option value="depto_chico">Departamento chico</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label mb-1" style={{fontSize: '13px'}}>Tiempo diario disponible</label>
          <select className="form-select" name="tiempo_disponible" onChange={handleChange}>
            <option value="bajo">Poco tiempo (menos de 1h)</option>
            <option value="medio">Tiempo moderado (1 a 2h)</option>
            <option value="alto">Mucho tiempo (más de 2h)</option>
          </select>
        </div>

        <div className="form-check mb-1">
          <input className="form-check-input" type="checkbox" name="tiene_niños" id="ninos" onChange={handleChange} />
          <label className="form-check-label" htmlFor="ninos" style={{fontSize: '13px'}}>¿Viven niños?</label>
        </div>
        <div className="form-check mb-1">
          <input className="form-check-input" type="checkbox" name="tiene_otras_mascotas" id="mascotas" onChange={handleChange} />
          <label className="form-check-label" htmlFor="mascotas" style={{fontSize: '13px'}}>¿Tenés otras mascotas?</label>
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="actividad_fisica" id="actividades" onChange={handleChange} />
          <label className="form-check-label" htmlFor="actividades" style={{fontSize: '13px'}}>¿Buscás un perro deportivo?</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
import React, { useState } from 'react';
import api from '@/Services/api';

const Login = ({ OnLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/login/', credentials)
      .then((response) => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        alert("¡Sesión iniciada con éxito!");
        if (OnLoginSuccess) OnLoginSuccess();
      })
      .catch((error) => {
        console.error("Error en login:", error.response?.data);
        alert("Usuario o contraseña incorrectos.");
      });
  };

  return (
    <div className="text-start p-2">
      <h3 className="mb-3 text-center">Iniciar Sesión</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input className="form-control" type="text" name="username" placeholder="Ingresá tu usuario" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" name="password" placeholder="Ingresá tu contraseña" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-2">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
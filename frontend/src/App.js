import '@/App.css';
import React, { useState, useEffect } from 'react';
import Header from '@/Components/Header';
import Section from '@/Components/Section';
import Map from '@/Components/Map';
import Footer from '@/Components/Footer';
import Info from '@/Components/Info';
import PerroList from '@/Components/PerroList';
import Gallery from '@/Components/Gallery';
import About from './Components/About';
import Login from '@/Components/Login';
import Registro from '@/Components/Registro';
import Visitar from '@/Components/Visitar';

function App() {
  // Estados para controlar la visibilidad de los formularios en la One-Page
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem("access_token") ? true : false;
  });
  const [mostrarModalVisita, setMostrarModalVisita] = useState(false);

  // Al cargar la aplicación por primera vez, verificamos si ya existe un token guardado
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLogged(false);
    setMostrarLogin(false);
    setMostrarRegistro(false);
    alert("Sesión cerrada correctamente.");
  };

  return (
    <div className="App">
      {/* El Header recibe los estados y funciones para controlar los botones */}
      <Header 
        isLogged={isLogged} 
        onClickLogin={() => { setMostrarLogin(true); setMostrarRegistro(false); }}
        onClickRegistro={() => { setMostrarRegistro(true); setMostrarLogin(false); }}
        onLogout={handleLogout}
      />
      
      {/*  MODAL DEL LOGIN*/}
      {mostrarLogin && (
        <div style={modalOverlayStyle} onClick={() => setMostrarLogin(false)}>
          {/* El stopPropagation evita que el modal se cierre si hacés clic adentro del formulario */}
          <div className="card p-4 shadow-lg border-0" style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div className="text-end mb-2">
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setMostrarLogin(false)} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: '0' }}>X</button>
            </div>
            <Login OnLoginSuccess={() => { setIsLogged(true); setMostrarLogin(false); }} />
          </div>
        </div>
      )}

      {/*  MODAL DEL REGISTRO */}
      {mostrarRegistro && (
        <div style={modalOverlayStyle} onClick={() => setMostrarRegistro(false)}>
          <div className="card p-4 shadow-lg border-0" style={{ ...modalContentStyle, maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
            <div className="text-end mb-2">
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setMostrarRegistro(false)} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: '0' }}>X</button>
            </div>
            <Registro AlCerrar={() => setMostrarRegistro(false)} />
          </div>
        </div>
      )}

      {/* Secciones originales*/}
      <Section/>
      
      {/* Le pasamos "isLogged" a la lista de perros para saber en el futuro si habilitamos el botón Adoptar */}
      <PerroList isLogged={isLogged} onOpenLogin={() => setMostrarLogin(true)} onOpenVisita={()=> setMostrarModalVisita(true)} /> 
      
      {/* MODAL DE VISITA */}
      {mostrarModalVisita && (
        <div style={modalOverlayStyle} onClick={() => setMostrarModalVisita(false)}>
          <div className="card p-4 shadow-lg border-0" style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div className="text-end mb-2">
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setMostrarModalVisita(false)} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: '0' }}>X</button>
            </div>
            <Visitar />
          </div>
        </div>
      )}

      <Gallery/>
      <About/>
      <Map/>
      <Info/>
      <Footer/>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Por encima de la portada, navbar y mapas
};

const modalContentStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '360px',
  maxHeight: '85vh',
  overflowY: 'auto', // Permite scroll interno si el formulario es largo
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
};

export default App;
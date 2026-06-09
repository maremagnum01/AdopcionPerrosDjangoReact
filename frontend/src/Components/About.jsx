import React from 'react';

const About = () => {
    return (
        <div id="about" style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
            <div className="container text-center">
                
                {/* Título Principal */}
                <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Sobre Nuestro Refugio y Clínica
                </h2>
                <p className="lead mx-auto mb-5" style={{ maxWidth: '800px', color: '#7f8c8d' }}>
                    Trabajamos día a día para brindarle una segunda oportunidad a los animales desamparados y garantizar el acceso a la salud animal de forma justa, gratuita y universal.
                </p>

                {/* Fila de 3 Columnas (Refugio, Clínica y Pasantías) */}
                <div className="row g-4 text-start">
                    
                    {/* Columna 1: El Refugio */}
                    <div className="col-lg-4 col-md-6">
                        <div className="p-4 h-100 rounded" style={{ backgroundColor: '#fdfafe', borderLeft: '5px solid #0dc3ff' }}>
                            <h4 style={{ color: '#2c3e50', fontWeight: 'bold' }}>🏡 El Refugio</h4>
                            <p className="mt-3" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                Albergamos temporalmente a perritos rescatados del abandono o el maltrato. Aquí reciben alimentación, socialización y mucho amor mientras esperan encontrar a su familia definitiva a través de nuestra plataforma.
                            </p>
                        </div>
                    </div>

                    {/* Columna 2: La Clínica Veterinaria */}
                    <div className="col-lg-4 col-md-6">
                        <div className="p-4 h-100 rounded" style={{ backgroundColor: '#f4fbfd', borderLeft: '5px solid #198754' }}>
                            <h4 style={{ color: '#2c3e50', fontWeight: 'bold' }}>🩺 Clínica Gratuita</h4>
                            <p className="mt-3" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                Ofrecemos atención médica primaria, castraciones, vacunación y cirugías complejas de manera 100% gratuita. Creemos firmemente que la salud de nuestras mascotas no debe depender del bolsillo de sus familias.
                            </p>
                        </div>
                    </div>

                    {/* Columna 3: Pasantías Universitarias */}
                    <div className="col-lg-4 col-md-12">
                        <div className="p-4 h-100 rounded" style={{ backgroundColor: '#fff9f3', borderLeft: '5px solid #ff9f43' }}>
                            <h4 style={{ color: '#2c3e50', fontWeight: 'bold' }}>🎓 Pasantías y Formación</h4>
                            <p className="mt-3" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                Impulsamos el futuro de la medicina veterinaria. Ofrecemos programas de pasantías para estudiantes avanzados que buscan ganar experiencia práctica, sumando sus manos y su vocación para apoyar nuestro proyecto diario.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Sección de Financiamiento / Sustentabilidad (¡Acá está de vuelta!) */}
                <div className="mt-5 p-4 rounded" style={{ backgroundColor: '#f8f9fa', width: '100%' }}>
                    <h5 className="mb-3" style={{ fontWeight: 'bold', color: '#2c3e50' }}>🤝 ¿Cómo nos mantenemos?</h5>
                    <p className="mx-auto" style={{ maxWidth: '750px', color: '#555', fontSize: '15px' }}>
                        Este proyecto es una realidad gracias al esfuerzo conjunto: contamos con el apoyo y subsidios del <b>Gobierno</b> para el equipamiento e insumos médicos, y nos sostenemos activamente gracias al corazón de nuestra comunidad a través de <b>donaciones voluntarias</b> y padrinos que colaboran mensualmente.
                    </p>
                    <button type="button" className="btn btn-outline-primary mt-2 btn-sm">
                        Quiero colaborar con una donación
                    </button>
                </div>

            </div>
        </div>
    );
};

export default About;
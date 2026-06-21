import React from "react";

function Header({ isLogged, onClickLogin, onClickRegistro, onLogout }) {
  return (
    <header className="header_section">
      {" "}
      {/* Cambiado class por className */}
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="/">
            <img src="images/logo.png" alt="" />
            <span>Doccion</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Doccion
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/clinic">
                    Clinica
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#info">
                    Contacto
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    Sobre nosotros
                  </a>
                </li>
              </ul>

              {/* --- BOTONES DINÁMICOS DE AUTENTICACIÓN --- */}
              <div className="d-flex gap-2 align-items-center">
                {!isLogged ? (
                  <>
                    {/* Si NO está logueado, ve estos botones */}
                    <button
                      className="btn btn-outline-primary btn-sm px-3"
                      onClick={onClickLogin}
                    >
                      Ingresar
                    </button>
                    <button
                      className="btn btn-primary btn-sm px-3"
                      onClick={onClickRegistro}
                    >
                      Registrarse
                    </button>
                  </>
                ) : (
                  <>
                    {/* Si SÍ está logueado, ve un saludo y el botón de salir */}
                    <span
                      className="text-muted me-2"
                      style={{ fontSize: "14px" }}
                    >
                      ¡Hola, Adoptante!
                    </span>
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() => {
                        onLogout();
                        window.location.reload();
                      }}
                      //   {CREAR RELOAD AL HACER LOGOUT PARA QUE SE ACTUALICE EL ESTADO DE LA APP Y SE MUESTRE EL HEADER CORRECTAMENTE}
                    >
                      Salir
                    </button>
                  </>
                )}
              </div>
              {/* ----------------------------------------- */}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

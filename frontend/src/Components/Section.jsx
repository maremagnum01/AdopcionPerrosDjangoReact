
function Section(){
    return(
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" Style="background-color: #0dc3ff" >
            <div class="carousel-inner" >
            <div class="carousel-item active" >
                <div class="container-fluid" >
                <div class="row">
                    <div class="col-md-4 offset-md-2">
                    <div class="slider_detail-box">
                        <h1>
                        Profesionales
                        <span>
                            Cuando tu mascota
                        </span>
                        </h1>
                        <p>
                            No solo somos un refugio, sino tambien una clinica veterinaria gratuita.
                        </p>
                        <div class="btn-box">
                        <a href="#listaperros" class="btn-1" style={{textDecoration:'None', borderRadius: '5px', width:'170px'}}>
                            Ver perros
                        </a>
                        <a href="/" class="btn-2" style={{textDecoration:'None', borderRadius: '5px', margin: '10px', width:'170px', marginRight:'20px'}}>
                            Contacto
                        </a>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="slider_img-box">
                        <img src="images/slider-img.png" alt=""/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Section;
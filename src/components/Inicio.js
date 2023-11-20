

function Inicio() {
    return (
      <div className="container">
          <section className="tm-section-head" id="top">
              <header id="header" className="text-center tm-text-gray">
                  <h1>Trabajo Final</h1>
                  <p>Fundamentos de Programación Web</p>
              </header>
              <div className="navbar navbar-default navbar-fixed-top">
                  <a href="/index.html" className="navbar-brand"></a>
              </div>
          </section>
  
          <section className="tm-section-2 tm-section-mb" id="tm-section-2">
              <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-5 pr-md-5">
                      <header className="text-center">
                          <i className="fa fa-4x fa-power-off pl-5 pb-5 pr-5 pt-2"></i>
                      </header>
  
                      <h2>Aula Virtual</h2>
                      <p>Parte de la información requerida para realizar este proyecto fue sacada del <a href="https://virtual.unju.edu.ar/course/view.php?id=2519&section=0" target="_blank">Aula Virtual</a>. 
                        Tanto algunos repositorios como recursos fueron provistos por los profesores mediante dicha aula. </p>
  
                      <a href="https://virtual.unju.edu.ar/course/view.php?id=2519&section=0" className="btn tm-btn-pad-2 float-right">Link hacia el aula virtual</a>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-5 pr-md-5">
                      <header className="text-center">
                          <i className="fa fa-4x fa-bolt pl-5 pb-5 pr-5 pt-2"></i>
                      </header>
                      <h2>Github</h2>
                      <p> Todos los proyectos, tanto éste como los anteriores fueron subidos a repositorios en Github para realizar lostrabajos en equipo. 
                        En dicha página se pueden ver las aportaciones que hizo cada integrante.
                      </p>
  
                      <a href="https://github.com" className="btn tm-btn-pad-2 float-right">Link a Github</a>
                  </div>
              </div>
          </section>
  
          <section className="tm-section-3 tm-section-mb" id="tm-section-3">
              <div className="row">
                  <div className="col-md-6 tm-mb-sm-4 tm-2col-l">
                      <div className="image">
                      </div>
                      <div className="tm-box-3">
                          <h2>React</h2>
                          <p> ReactJS es una de las librerías más populares de JavaScript para el desarrollo de aplicaciones móviles y web. 
                            Creada por Facebook, React contiene una colección de fragmentos de código JavaScript reutilizables utilizados 
                            para crear interfaces de usuario llamadas componentes.</p>
                          <div className="text-center">
                              <a href="https://es.react.dev" className="btn btn-big">Link a la página de React</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6 tm-2col-r">
                      <div className="image">
                      </div>
                      <div className="tm-box-3">
                          <header>
                              <h2>Phaser</h2>
                          </header>
                          <p> Phaser es un framework de juegos HTML5 cuyo propósito es ayudar a los desarrolladores a hacer juegos HTML5 potentes y portables. 
                            El único requisito del navegador es que soporte la etiqueta canvas. Además, toma muchas cosas prestadas de Flixel.</p>
                          <div className="text-center">
                              <a href="https://phaser.io" className="btn btn-big">Link a la página de Phaser</a>
                          </div>
                      </div>
                  </div>
              </div>
              <img src="../img/react.png" className="img-responsive tm-media-img"  width={650}></img>
              <img src="../img/phaser.jpg" className="img-responsive tm-media-img" ></img>
          </section>
          <footer className="mt-5">
              <p className="text-center">Copyright © 2023 Grupo 5 - Design: Tooplate</p>
          </footer>
      </div>
      );
}

export default Inicio;
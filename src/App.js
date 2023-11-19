import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Inicio from './components/Inicio';
import About from './components/About';
import ErrorPage from './components/ErrorPage';
import JuegoDude from './components/JuegoDude';
import JuegoNave from './components/JuegoNave';
import InicioJuego from './components/phaserComponents/JuegoDude/InicioJuego';
import InicioJuegoNave from './components/phaserComponents/JuegoNave/InicioJuegoNave';
import ListaTareas from './components/ListaTareas';
import ComparadorDePreciosForm from './components/ComparadorPrecios';

import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';


function App(){
    return(
<Router>
<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Grupo 5</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <NavDropdown title="Lista de Proyectos" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Comparador de Precios</NavDropdown.Item>
              <NavDropdown.Item href="JuegoDude">Juego DUDE</NavDropdown.Item>
              <NavDropdown.Item href="JuegoNave">Juego de Naves</NavDropdown.Item>
              <NavDropdown.Item href="ListaTareas">Lista de Tareas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Juego de Imágenes de Animales</NavDropdown.Item>
              <NavDropdown.Item href="ComparadorDePreciosForm">ComparadorPrecios</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="aboutUs">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="aboutUs" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="JuegoDude" element={<JuegoDude />} />
        <Route path="ListaTareas" element={<ListaTareas />} />
        <Route path="JuegoNave" element={<JuegoNave />} />
        <Route path="ComparadorDePreciosForm" element={<ComparadorDePreciosForm />} />

    </Routes>
</Router>
    )
}

export default App;
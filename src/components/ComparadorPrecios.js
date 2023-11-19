import React, { useState } from 'react';
import { Container } from 'react-bootstrap';


const ComparadorPrecios = () => {
  const [productosAcumulados, setProductosAcumulados] = useState({
    listaProductos: [],
    nombreProducto: '',
    precioProducto: '',
    nombreComercio: '',
  });

  const GuardarProducto = () => {
    const { nombreProducto, precioProducto, nombreComercio } = productosAcumulados;

    if (nombreProducto.trim() !== '') {
      setProductosAcumulados({
        ...productosAcumulados,
        listaProductos: [
          ...productosAcumulados.listaProductos,
          { nombre: nombreProducto, precio: parseFloat(precioProducto), comercio: nombreComercio },
        ],
        nombreProducto: '',
        precioProducto: '',
        nombreComercio: '',
      });
    } else {
      console.log('Completa el campo "Nombre del Producto"');
    }
  };

  const ListarProductos = () => {
    if (productosAcumulados.listaProductos.length === 0) {
      alert('NO HAY PRODUCTOS CARGADOS');
    } else {
      pBaratos.innerHTML = '';
      console.log(productosAcumulados.listaProductos);

      const listaProductos = document.getElementById('listaProductos');
      listaProductos.innerHTML = '';
      productosAcumulados.listaProductos.forEach((producto) => {
        const listItem = document.createElement('ul');
        listItem.textContent = `Nombre: ${producto.nombre}, Precio: ${producto.precio}, Comercio: ${producto.comercio}`;
        listaProductos.appendChild(listItem);
    });
    
    }
  };

  const CompararPrecios = () => {
    if (productosAcumulados.listaProductos.length === 0) {
      alert('NO HAY PRODUCTOS CARGADOS');
      return;
    }

    const pBaratos = document.getElementById('pBaratos');
    pBaratos.innerHTML = '';

    const productosBaratos = {};

    productosAcumulados.listaProductos.forEach(producto => {
      const nombre = producto.nombre;
      const precio = producto.precio;

      if (nombre in productosBaratos) {
        if (precio < productosBaratos[nombre].precio) {
          productosBaratos[nombre] = { precio, producto };
        }
      } else {
        productosBaratos[nombre] = { precio, producto };
      }
    });

    Object.values(productosBaratos).forEach(({ producto }) => {
      mostrarProducto(producto, pBaratos);
    });

    console.log(Object.values(productosBaratos).map(({ producto }) => producto));
  };

  const mostrarProducto = (pro, container) => {
    const listItem = document.createElement('ul');
    listItem.textContent = `Nombre: ${pro.nombre}, Precio: ${pro.precio}, Comercio: ${pro.comercio}`;
    container.appendChild(listItem);
  };

  return (
    <Container style={{ backgroundImage: `url(/img/ComparadorPrecios/fondoanime.png)` }}>
    <form className="form-signin">
      <img className="mb-4" src="/img/ComparadorPrecios/productos.jpg" alt="" width="400" height="200"/>
      <h1 className="h3 mb-3 font-weight-normal">Comparador de Precios</h1>
      <div className="row">
        <div className="col">
          <input
            type="text"
            id="nombreProducto"
            className="form-control"
            placeholder="Nombre del producto"
            required
            autoFocus
            value={productosAcumulados.nombreProducto}
            onChange={(e) => setProductosAcumulados({ ...productosAcumulados, nombreProducto: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            type="number"
            id="precioProducto"
            className="form-control"
            placeholder="Precio del Producto"
            required
            autoFocus
            value={productosAcumulados.precioProducto}
            onChange={(e) => setProductosAcumulados({ ...productosAcumulados, precioProducto: e.target.value })}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            aria-label="Default select example"
            id="nombreComercio"
            value={productosAcumulados.nombreComercio}
            onChange={(e) => setProductosAcumulados({ ...productosAcumulados, nombreComercio: e.target.value })}
          >
            <option value="SUPERMERCADO">---Elegir Supermercado---</option>
            <option value="DIA">DIA</option>
            <option value="COMODIN">COMODIN</option>
            <option value="CARREFOUR">CARREFOUR</option>
            <option value="CHANGOMAS">CHANGO MAS</option>
          </select>
        </div>
      </div>
      <br/><br/>
      <button id="guardarProducto" type="button" className="btn btn-success" onClick={GuardarProducto}>
        Guardar Producto
      </button>
      <button id="listarProductos" type="button" className="btn btn-success" onClick={ListarProductos}>
        Listar Productos
      </button>
      <button id="compararPrecios" type="button" className="btn btn-success" onClick={CompararPrecios}>
        Comparar Precios
      </button>
      <br/><br/>
      <div className="row">
        <div className="caja col listaProductos" id="listaProductos">
          
        </div>
        <div className="caja col pBaratos" id="pBaratos">
          
        </div>
      </div>
    </form>
    </Container>
  );
};

export default ComparadorPrecios;

//import ListaTareas from "./listaTareasComponents/ListaTareas";
import React,{useEffect, useState} from 'react';
//import EstadoEjecucion from './EstadoEjecucion';
//import Resuelto from './Resuelto';

function ListaTareas() {
const [notas, setNotas]=useState([]);

const [notasEjecucion, setNotasEjecucion]=useState([]);

const [notasResuelto, setNotasResuelto]=useState([]);



//const [nuevaNota, setNuevaNota]=useState('');
    const [nuevaNota, setNuevaNota] = useState({ titulo: '', descripcion: '', estado: 'Inicio' });
    
    


const agregarNota=()=>{

  //verigica si los campos estan rellenos antes de agregar la nota
  //trim() se usa para eliminar espacios blancos al principio y final
  if (nuevaNota.titulo.trim() === '' || nuevaNota.descripcion.trim() === '') {
    // Mostrar un mensaje de error o tomar la acción que desees
    console.log('Completar los campos');
    return;
  }

    setNotas([...notas, nuevaNota]);
    setNuevaNota({ titulo: '', descripcion: '', estado: '' });
};

const agregarNotaEjecucion=()=>{
  //setNotasEjecucion([...notas]);

  //usar map para actualizar la propiedad 'estado' de cada objeto en el array 'notas'
  const nuevasNotas = notas.map(nota => ({ ...nota, estado: 'Ejecucion' }));

  //actualizar el estado de 'notasEjecucion' con las nuevas notas
  setNotasEjecucion(nuevasNotas);

  //limpiar el estado de 'nuevaNota'
  setNuevaNota({ titulo: '', descripcion: '', estado: 'Inicio' });

};

const agregarNotaResuelto=()=>{
   //usar map para actualizar la propiedad 'estado' de cada objeto en el array 'notas'
   const nuevasNotas = notasEjecucion.map(nota => ({ ...nota, estado: 'Resuelto' }));

   //actualizar el estado de 'notasEjecucion' con las nuevas notas
   setNotasResuelto(nuevasNotas);
 
   //limpiar el estado de 'nuevaNota'
   setNuevaNota({ titulo: '', descripcion: '', estado: 'Inicio' });
  //setNotasResuelto([...notasResuelto, nuevaNotaR]);
  //setNuevaNotaR({ titulo: '', descripcion: '', estado: '' });
};

const eliminarNota=(index)=>{
  const nuevaNotas=[...notas];
  nuevaNotas.splice(index,1);
  setNotas(nuevaNotas);
}

const eliminarNotaE=(indexE)=>{
  const nuevaNotasE=[...notasEjecucion];
  nuevaNotasE.splice(indexE,1);
  setNotasEjecucion(nuevaNotasE);
}
const eliminarNotaR=(indexR)=>{
  const nuevaNotasR=[...notasResuelto];
  nuevaNotasR.splice(indexR,1);
  setNotasResuelto(nuevaNotasR);
}



return (
<div  style={{
    textAlign: 'center',
    background: 'linear-gradient(to right, #2c3e50, #4a4a4a)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    transition: 'background 0.5s ease',
  }}>
    <h1>Lista de Notas</h1>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <input
        type='text'
        placeholder='Titulo'
        value={nuevaNota.titulo}
        onChange={(e) => setNuevaNota({ ...nuevaNota, titulo: e.target.value })}
        style={{ 
          marginBottom: '15px',
          marginRight: '15px',
          padding: '10px', 
          width: '30%', 
          fontSize: '16px', 
          borderRadius: '5px', 
          border: 'none', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
          boxSizing: 'border-box' 
        }}
  
      />

      <textarea
        placeholder='Descripción'
        value={nuevaNota.descripcion}
        onChange={(e) => setNuevaNota({ ...nuevaNota, descripcion: e.target.value })}
        style={{ 
          marginBottom: '15px',
          marginRight: '15px',
          padding: '10px', 
          width: '70%', 
          fontSize: '16px', 
          borderRadius: '5px', 
          border: 'none', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
          boxSizing: 'border-box' 
        }}
      />

      <button onClick={agregarNota} 
      style={{ 
        backgroundColor: '#3498db', 
        color: 'white', 
        padding: '10px', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}
      >Agregar Nota
      </button>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>
      <ul style={{ listStyleType: 'none', padding: 0, width: '30%', height: '100%' }}>
        <h2>Nota de Tarea</h2>
        {notas.map((nota, index) => (
          <li key={index} style={{ border: '1px solid white', marginBottom: '10px', padding: '10px', height: '100%' }}>
            <div>
              <h3>{nota.titulo}</h3>
              <p>{nota.descripcion}</p>
              <p>Estado: {nota.estado}</p>
            </div>
            <button onClick={() => eliminarNota(index)} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '5px', marginRight: '5px', cursor: 'pointer' }}>
              Eliminar
            </button>

            <button onClick={agregarNotaEjecucion} style={{ backgroundColor: '#27ae60', color: 'white', padding: '5px', cursor: 'pointer' }}>
              Agregar Nota Ejecucion
            </button>
          </li>
        ))}
      </ul>

      <ul style={{ listStyleType: 'none', padding: 0, width: '30%' }}>
        <h2>Tarea en Ejecucion</h2>
        {notasEjecucion.map((notaE, indexE) => (
          <li key={indexE} style={{ marginBottom: '20px', padding: '10px', border: '1px solid white' }}>
            <div>
              <h3>{notaE.titulo}</h3>
              <p>{notaE.descripcion}</p>
              <p>Estado: {notaE.estado}</p>
              <h5>{indexE}</h5>
            </div>
            <button onClick={() => eliminarNotaE(indexE)} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '5px', marginRight: '5px', cursor: 'pointer' }}>
              Eliminar Ejecucion
            </button>
            <button onClick={agregarNotaResuelto} style={{ backgroundColor: '#27ae60', color: 'white', padding: '5px', cursor: 'pointer' }}>
              Agregar Nota Resuelto
            </button>
          </li>
        ))}
      </ul>

      <ul style={{ listStyleType: 'none', padding: 0, width: '30%' }}>
        <h2>Tarea Resuelta</h2>
        {notasResuelto.map((nota, indexR) => (
          <li key={indexR} style={{ marginBottom: '20px', padding: '10px', border: '1px solid white' }}>
            <div>
              <h3>{nota.titulo}</h3>
              <p>{nota.descripcion}</p>
              <p>Estado: {nota.estado}</p>
            </div>
            <button onClick={() => eliminarNotaR(indexR)} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '5px', marginRight: '5px', cursor: 'pointer' }}>
              Eliminar Resuelta
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);



}



export default ListaTareas;


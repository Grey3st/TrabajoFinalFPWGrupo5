import React,{useEffect, useState} from 'react';
//import EstadoEjecucionButton from './EstadoEjecucion';
//import Resuelto from './Resuelto';

function EstadoEjecucion( {notaDescripcion, notaTitulo, notaEstado, keyIndex, onDelete  }) {//nota, notaTitulo, notas
const [notasE, setNotasE]=useState([]);
//const [nuevaNota, setNuevaNota]=useState('');
    const [nuevaNotaE, setNuevaNotaE] = useState({ titulo: '', descripcion: '', estado: 'Inicio' });

const [condicionNotaE, setCondicionNotaE]=useState(false);
const [notaSeleccionadaE, setNotaSeleccionadaE] = useState(null);

    const [condicionNotaResueltoE, setCondicionNotaResueltoE]=useState(false);

const agregarNota=()=>{
  
    setNotasE([...notasE, nuevaNotaE]);
    setNuevaNotaE({ titulo: '', descripcion: '', estado: 'En Ejecucion' });

};



return (
<div>
      
      <div>
            
          <h3>{notaTitulo}</h3>
          <p>{notaDescripcion}</p>
          <p>{notaEstado}</p>
          <p>{keyIndex}</p>
          <button onClick={onDelete}>Eliminar</button>

      </div>
      
</div>);


}

export default EstadoEjecucion;

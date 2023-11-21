//import React,{useEffect, useState} from 'react';
//import EstadoEjecucion from './EstadoEjecucion';
//import Resuelto from './Resuelto';

/*function ListaTareas() {
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
<div>
  <h1>Lista de Notas</h1>
  <input 
    type='text' 
    placeholder='Titulo' 
    value={nuevaNota.titulo} 
    

    onChange={(e) => setNuevaNota({ ...nuevaNota, titulo: e.target.value })}
    
    
    />
  

  <textarea
      placeholder='Descripción'
      value={nuevaNota.descripcion}
      onChange={(e) => setNuevaNota({ ...nuevaNota, descripcion: e.target.value })}
  />
  <button onClick={agregarNota}>Agregar Nota</button>

  <ul>{notas.map((nota,index)=>(
    <li 
      key={index}>
        Nota de Tarea
        <div>
            <h3>{nota.titulo}</h3>
            <p>{nota.descripcion}</p>
            <p>Estado: {nota.estado}</p>
            
        </div>
        <button onClick={()=>eliminarNota(index)}>Eliminar</button>
        <button onClick={agregarNotaEjecucion}>Agregar Nota Ejecucion</button>
    </li>
  ))}</ul>


    <ul>{notasEjecucion.map((notaE,indexE)=>(
    <li 
      key={indexE}>
        Tarea en Ejecucion
        <div>
            <h3>{notaE.titulo}</h3>
            <p>{notaE.descripcion}</p>
            <p>Estado: {notaE.estado}</p>
            <h5>{indexE}</h5>

        </div>
        <button onClick={()=>eliminarNotaE(indexE)}>Eliminar Ejecucion</button>
        <button onClick={agregarNotaResuelto}>Agregar Nota Resuelto</button>
    </li>
  ))}</ul>


<ul>{notasResuelto.map((nota,indexR)=>(
    <li 
      key={indexR}>
        Tarea Resuelta
        <div>
            <h3>{nota.titulo}</h3>
            <p>{nota.descripcion}</p>
            <p>Estado: {nota.estado}</p>
            
        </div>
        <button onClick={()=>eliminarNotaR(indexR)}>Eliminar Resuelta</button>
        
    </li>
  ))}</ul>
    
</div>);


}

export default ListaTareas;


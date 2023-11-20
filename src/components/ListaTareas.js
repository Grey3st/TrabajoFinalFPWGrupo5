import React,{useEffect, useState} from 'react';
import EstadoEjecucion from './listaTareasComponents/EstadoEjecucion';
import Resuelto from './listaTareasComponents/EstadoResuelto';

function ListaTareas() {
const [notas, setNotas]=useState([]);
//const [nuevaNota, setNuevaNota]=useState('');
    const [nuevaNota, setNuevaNota] = useState({ titulo: '', descripcion: '', estado: 'Inicio' });

/**/const [condicionNota, setCondicionNota]=useState(false);

    const [notaSeleccionada, setNotaSeleccionada] = useState(null);

    const [condicionNotaResuelto, setCondicionNotaResuelto]=useState(false);

    const [notasSeleccionadas, setNotasSeleccionadas] = useState([]);


const agregarNota=()=>{
  
    setNotas([...notas, nuevaNota]);
    setNuevaNota({ titulo: '', descripcion: '', estado: 'Inicio' });

};
const eliminarNota=(index)=>{
  const nuevaNotas=[...notas];
  nuevaNotas.splice(index,1);
  setNotas(nuevaNotas);
}
const eliminarNotaE=(index)=>{
  const nuevaNotasE=[...notasSeleccionadas];
  nuevaNotasE.splice(index,1);
  setNotasSeleccionadas(nuevaNotasE);
}

/* */
const estadoEjecucionClick = (index) => {
  setCondicionNota(true);
  //setNotaSeleccionada({ index, nota: notas[index] });
  setNotasSeleccionadas((prevNotasSeleccionadas) => [
    ...prevNotasSeleccionadas,
    { index, nota: notas[index] }
  ]);
}

const estadoResueltoClick = (index) => {
  //setCondicionNota(true);
  setNotaSeleccionada({ index, nota: notas[index]});
  setCondicionNotaResuelto(true);
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
        golaa
        <div>
            <h3>{nota.titulo}</h3>
            <p>{nota.descripcion}</p>
            <p>Estado: {nota.estado}</p>
            
        </div>
      
      <button onClick={()=>eliminarNota(index)}>Eliminar</button>
      
            {/* Renderizar el componente EstadoEjecucion solo si hay una nota seleccionada */}
            <button onClick={() => estadoEjecucionClick(index)}>
              Estado de Ejecucion
            </button>

            <button onClick={() => estadoResueltoClick(index)}>
              Resuelto
            </button>
            <EstadoEjecucion
        
      onDelete={() => eliminarNotaE(index)}/>
 
    </li>
  ))}</ul>



{notasSeleccionadas.map((seleccionada, index) => (
  <EstadoEjecucion
    key={index}
    notaTitulo={seleccionada.nota.titulo}
    notaDescripcion={seleccionada.nota.descripcion}
    notaEstado={seleccionada.nota.estado}
    
  />
))}

  {/* Renderizar el componente EstadoEjecucion solo si hay una nota seleccionada */}
  {condicionNota && notaSeleccionada &&  (
    <EstadoEjecucion
      onClickHandler={() => setCondicionNota(true)}
      src='./img/disparo.png'
                
                notaTitulo={notaSeleccionada.nota.titulo}
                notaDescripcion={notaSeleccionada.nota.descripcion}
                notaEstado={notaSeleccionada.nota.estado}
                onDelete={() => eliminarNotaE(index)}
    />
  )}
      { notaSeleccionada && condicionNotaResuelto && (
        <Resuelto
          onClickHandler={() => condicionNotaResuelto(true)}
          src='./img/disparo.png'
                    index={notaSeleccionada.nota.titulo}
                    nota={notaSeleccionada.nota.descripcion}

        />
      )}
</div>);


}

export default ListaTareas;
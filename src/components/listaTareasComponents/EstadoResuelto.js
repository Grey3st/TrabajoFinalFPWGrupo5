import React, {useState} from 'react';

function Resuelto({ onClickHandler ,index, nota, src }){


    const [visible, setVisible] = useState(true);

    const eliminarNotaResuelto=(index)=>{
        
        setVisible(false);

      }

return(
    visible==true && (
    <div>
        <ul>
            <h5>Resuelto</h5>
            <h5>{index}</h5>
            <h6>{nota}</h6>
            <button onClick={()=>eliminarNotaResuelto(index)}>Eliminar</button>

        </ul>
        
    </div>
    )
);
}
export default Resuelto;
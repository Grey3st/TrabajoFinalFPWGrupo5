import React, { useState, useEffect } from 'react';
import dataAnimal2 from '../../data/dataAnimal.json';
//import styles2 from "./inicio.module.css";

function Juego2({ nombreJugador2, puntaje2, setPuntaje2, alTerminar2, rondaActual2, setRondaActual2 }) {
    const [animalObjetivo2, setAnimalObjetivo2] = useState({});
    const [opciones2, setOpciones2] = useState([]);
    const [esCorrecto2, setEsCorrecto2] = useState(null);
    const [rondasTotales2, setRondasTotales2] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic2, setPuedeHacerClic2] = useState(true);
    const [audioContext2, setAudioContext2] = useState(null);
    const [audioBuffer2, setAudioBuffer2] = useState(null);
    const [usarComodin2, setUsarComodin2] = useState(true);

    const usarComodin2Handler = () => {
        if (usarComodin2) {
            const opcionesConComodin = opciones2.slice(); // Clonar opciones para no modificar el estado directamente
            const opcionesIncorrectas = opcionesConComodin.filter(animal => animal !== animalObjetivo2);
            const opcionEliminada = opcionesIncorrectas[Math.floor(Math.random() * opcionesIncorrectas.length)];

            opcionesConComodin.splice(opcionesConComodin.indexOf(opcionEliminada), 1);

            setOpciones2(opcionesConComodin);
            setUsarComodin2(false);
        }
    };

   

    const obtenerAnimalAleatorio2 = () => {
        const indiceAleatorio2 = Math.floor(Math.random() * dataAnimal2.length);
        return dataAnimal2[indiceAleatorio2];
    };

    const obtenerOpcionesAleatorias2 = () => {
        const animalCorrecto2 = obtenerAnimalAleatorio2();
        let opcionesAleatorias2 = [animalCorrecto2];

        while (opcionesAleatorias2.length < 3) {
            const opcion2 = obtenerAnimalAleatorio2();
            if (!opcionesAleatorias2.includes(opcion2)) {
                opcionesAleatorias2.push(opcion2);
            }
        }

        opcionesAleatorias2 = opcionesAleatorias2.sort(() => Math.random() - 0.5);

        setOpciones2(opcionesAleatorias2);
        setAnimalObjetivo2(animalCorrecto2);

    };

    const verificarRespuesta2 = (animalSeleccionado2) => {
        if (animalSeleccionado2 === animalObjetivo2) {
            setEsCorrecto2(true);
            setPuntaje2(puntaje2 + 1);
        } else {
            setEsCorrecto2(false);
        }
        setPuedeHacerClic2(false);
    };

    const siguienteRonda2 = () => {
        if (rondaActual2 < rondasTotales2) {
            setRondaActual2(rondaActual2 + 1);
            setEsCorrecto2(null);
            setPuedeHacerClic2(true);
            obtenerOpcionesAleatorias2();
        } else {
            alTerminar2(puntaje2);
        }
    };

    const opcionesDeshabilitadas2 = esCorrecto2 !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias2();
    }, []);

    return (
        <div>
            <h1>{nombreJugador2} what is this animal?</h1>
            <p>Game round: {rondaActual2}</p>
            <img src={animalObjetivo2.imagen} alt={animalObjetivo2.nombre} />
            <div>
                {opciones2.map((animal2) => (
                    <button
                        key={animal2.nombre}
                        onClick={() => verificarRespuesta2(animal2)}
                        disabled={!puedeHacerClic2 || opcionesDeshabilitadas2}
                    >
                        {animal2.nombre}
                    </button>
                ))}
                <button onClick={usarComodin2Handler} disabled={!usarComodin2 || opcionesDeshabilitadas2}>
                    Use Wildcard
                </button>
            </div>
            {esCorrecto2 === true && <p>¡Correct!</p>}
            {esCorrecto2 === false && <p>¡Incorrect!</p>}
            <button onClick={siguienteRonda2}>Next</button>
        </div>
    );
}

export default Juego2;
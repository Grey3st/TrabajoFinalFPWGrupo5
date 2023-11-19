import Phaser from "phaser";
import Escena1 from "./phaserComponents/JuegoNave/Escena1.js"; // importar cada escena para poder utilizarla en el array
import Escena2 from "./phaserComponents/JuegoNave/Escena2.js";
import FinDelJuego from "./phaserComponents/JuegoNave/FinDelJuego.js"; 
import InicioJuegoNave from "./phaserComponents/JuegoNave/InicioJuegoNave.js";
import Ganador from "./phaserComponents/JuegoNave/Ganador.js";
import { useEffect, useState } from "react";

function JuegoNave() {

    const [listo, setListo]= useState(false);
    useEffect (()=>{
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
        
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
        
            scene: [InicioJuegoNave,Escena1,Escena2,FinDelJuego,Ganador]      // cargar las escenas que se mostraran en el juego 
        };
        
        let game = new Phaser.Game(config);
        game.events.on("Listo", setListo);

        return ()=>{
            setListo(false);
            game.destroy(false);
        }
    }, [listo]);
}

export default JuegoNave
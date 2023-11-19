import Phaser from "phaser";
import Escena1 from "./phaserComponents/JuegoDude/Escena1.js"; // importar cada escena para poder utilizarla en el array
import Escena2 from "./phaserComponents/JuegoDude/Escena2.js";
import Escena3 from "./phaserComponents/JuegoDude/Escena3.js";
import FinDelJuego from "./phaserComponents/JuegoDude/FinDelJuego.js"; // escena fin del juego al tocar bomba 
import InicioJuegoNave from "./phaserComponents/JuegoDude/InicioJuego.js";
import Felicitaciones from "./phaserComponents/JuegoDude/Felicitaciones.js";
import { useEffect, useState } from "react";

function JuegoDude() {

    const [listo, setListo]= useState(false);
    useEffect (()=>{
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
        
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
        
            scene: [InicioJuegoNave,Escena1,Escena2, Escena3,FinDelJuego,Felicitaciones]      // cargar las escenas que se mostraran en el juego 
        };
        
        let game = new Phaser.Game(config);
        game.events.on("Listo", setListo);

        return ()=>{
            setListo(false);
            game.destroy(false);
        }
    }, [listo]);
}

export default JuegoDude
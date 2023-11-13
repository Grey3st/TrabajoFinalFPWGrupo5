import Phaser from "phaser";

class InicioJuego extends Phaser.Scene {

    constructor() {
        super({ key: 'InicioJuego' });
        
    }

    preload() {
        // Precargar la imagen de fondo y el botón
        this.load.image('fondo', '/img/JuegoDude/fondoInicio.png');
        this.load.image('boton', '/img/JuegoDude/boton.png');

       this.load.audio('menuAudio', '/sound/JuegoDude/menuMusic.mp3');

    }

    create() {


        // Agrega la imagen de fondo
        let fondo = this.add.image(0, 0, 'fondo');
        fondo.setOrigin(0, 0); // Establece el origen en la esquina superior izquierda
        //fondo.setScale(2);

        // Calcula el centro de la pantalla
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;


        // Crea el botón "Iniciar juego"
        let boton = this.add.image(centerX, centerY, 'boton');
        boton.setScale(0.2);
        boton.setInteractive(); // Permite que el botón sea interactivo

        // Define una función para manejar el evento de clic en el botón
        boton.on('pointerdown', function () {
            this.cambiarEscena(); // Llama a la función cambiarEscena
            //  iniciar juego/cambiar escena aquí
            console.log("¡El juego ha comenzado!");
        }, this); // 'this' para hacer referencia a la escena actual sino no permite acceder a la wea de escena 

        // Haz que el cursor cambie al pasar sobre el botón osea que la flechita se convierta en la manito xd
        boton.on('pointerover', function () {
            document.body.style.cursor = 'pointer';
        });

        boton.on('pointerout', function () {
            document.body.style.cursor = 'default';
        });
        }
        
    cambiarEscena() {
        //cambiar a la siguiente escena
        this.scene.start('Escena1');
    }
}

export default InicioJuego;
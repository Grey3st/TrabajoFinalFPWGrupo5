import Phaser from "phaser";
class FinDelJuego extends Phaser.Scene {

    constructor() {
        super({ key: 'FinDelJuego' })
    }
    preload() {
        this.load.image('fondo', "/img/JuegoNave/fondoInicio.png")
        this.load.image('fin', "/img/JuegoNave/finJuego.png")
        this.load.audio('gameOver', '/sound/JuegoNave/gameOverMusic.mp3');
    }

    create() {
        this.gameOver = this.sound.add('gameOver');
        this.gameOver.play();
        let fondo = this.add.image(0, 0, 'fondo');
        fondo.setOrigin(0, 0);
        //--------//
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        //---//
        let fin = this.add.image(centerX, centerY, 'fin');
        fin.setScale(0.2)
        fin.setInteractive();

        /*fin.on('pointerdown', function () {
            this.cambiarEscena(); // Llama a la función cambiarEscena
            console.log("¡El juego ha comenzado!");
        }, this); 

        fin.on('pointerover', function () {
            document.body.style.cursor = 'pointer';
        });

        fin.on('pointerout', function () {
            document.body.style.cursor = 'default';
        }); */


    }
     /*cambiarEscena() {
        //cambiar a la siguiente escena
        this.scene.start('InicioJuego');

    } */

}
export default FinDelJuego;
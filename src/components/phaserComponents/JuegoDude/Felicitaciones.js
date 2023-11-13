import Phaser from "phaser";
class Felicitaciones extends Phaser.Scene{
    
    constructor(){
        super({key:'Felicitaciones'})
    }
    preload(){
     this.load.image('fondo',"/img/JuegoDude/fondoInicio.png")
     this.load.image('youWin',"/img/JuegoDude/youWin.png")
    }
    
    create(){
        let fondo = this.add.image(0,0,'fondo');
        fondo.setOrigin(0,0);
   //--------//
   let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        //---//
       let youWin = this.add.image(centerX,centerY,'youWin');
       //fin.setScale(0.2)
    }

}
export default Felicitaciones;
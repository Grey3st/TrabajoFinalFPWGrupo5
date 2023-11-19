import Phaser from "phaser";

class Escena1 extends Phaser.Scene {

    constructor() {
        super({key:"Escena1"});
        this.platforms = null;
        this.scoreText = "";
        this.score = 0;

    }

    preload() {
        this.load.image('sky', '/img/JuegoDude/sky.png');
        this.load.image('ground', '/img/JuegoDude/platform.png');
        this.load.image('star', '/img/JuegoDude/star.png');
        this.load.image('bomb', '/img/JuegoDude/bomb.png');
        this.load.spritesheet('dude', '/img/JuegoDude/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.audio('gameMusic', '../sound/JuegoDude/gamePlay.mp3');
    }

    create() {

        this.gameMusic = this.sound.add('gameMusic', {volume: 0.05});
        this.gameMusic.play();

        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');


        //--------------------------------------------//
        // this.add.image(400, 300, 'star');    crea una estrella estatica en el escenario 
        this.player = this.physics.add.sprite(100, 100, 'dude');
        //-------------------------//
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //----/
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // el jugador tiene colision con las plataformas 
        this.physics.add.collider(this.player, this.platforms);
        // se mueve con el teclado  el jugador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Se agregan las estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 4, // cantidad de estrellas
            setXY: { x: 12, y: 0, stepX: 70 } // empieza en la posición x e y, se repite cada 70 en x
        });

        //Se agrega el rebote entre el grupo de estrelas
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //Habilita las colisiones de las entrellas con la plataforma
        this.physics.add.collider(this.stars, this.platforms);

        //Choque entre las estrellas y el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.textTime = this.add.text(40, 40, 'Las estrellas te dan fuerza, recógelas!', { fontSize: '32px', fill: '#FFF' });

    }

    //------------------------//
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.score==100){
            this.gameMusic.destroy();
            //this.scene.start('Escena2');
            this.scene.start('Escena2',{score:this.score}); 
        }
    }

    //Colisión entre el jugador y las estrellas
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        //Para las bombas
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
        
    }
    


    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.start('FinDelJuego')   // llama a otra escena 

    }

}
export default Escena1;
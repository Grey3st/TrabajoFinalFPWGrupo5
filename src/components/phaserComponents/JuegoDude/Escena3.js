import Phaser from "phaser";
class Escena3 extends Phaser.Scene{
    
    constructor(){
        super({key:"Escena3"});
        this.platforms = null;
        this.scoreText = "";
        this.textTime = "";
        this.score = 0;
        
    }
    //Se pasa el puntaje de escena1 a escena2
    init(data){
        this.score = data.score;
    }
    preload(){
        

        this.load.image('sky3', '/img/JuegoDude/sky3.png');
        this.load.image('ground', '/img/JuegoDude/platform.png');
        this.load.image('star', '/img/JuegoDude/star.png');
        this.load.image('bomb', '/img/JuegoDude/bomb.png');
        this.load.spritesheet('dude', '/img/JuegoDude/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.audio('lost', '/sound/JuegoDude/gameOverMusic.mp3');
        this.load.audio('level3', '/sound/JuegoDude/level3.mp3');
    }


    create(){
        
        this.level3 = this.sound.add('level3', {volume: 0.05});
        this.level3.play();
        this.musicaLost = this.sound.add('lost', {volume: 0.05});
        
        this.add.image(400, 300, 'sky3');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.plataforma1=this.platforms.create(600, 400, 'ground');
        this.plataforma2=this.platforms.create(50, 300, 'ground');
        this.plataforma3=this.platforms.create(750, 220, 'ground');
        
        
        //--------------------------------------------//
        //this.add.image(400, 300, 'star');    crea una estrella estatica en el escenario 
        this.player = this.physics.add.sprite(100, 100, 'dude');
        //-------------------------//
        this.player.setBounce(0);
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
            repeat: 4, // Cantidad de estrellas
            setXY: { x: 0, y: 0, stepX:Phaser.Math.RND.between(70,150) } // Inicialmente, las posiciones X e Y no importan
        });

        // Luego, configuramos las posiciones aleatorias solo en el eje X
        this.stars.children.iterate(function (star) {
            star.x = Phaser.Math.RND.between(0, 600); // Posición X aleatoria
            star.y = 0; // Mantenemos la misma posición Y en 0
            star.stepX = Phaser.Math.RND.between(70, 150); // Espaciado X aleatorio
        });

        //Se agrega el rebote entre el grupo de estrelas
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
        });

        //Habilita las colisiones de las entrellas con la plataforma
        this.physics.add.collider(this.stars, this.platforms);

        //Choque entre las estrellas y el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'score: '+ this.score, { fontSize: '32px', fill: '#000' });

        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.textTime = this.add.text(40, 40, 'Te estás ahogando!', { fontSize: '32px', fill: '#FFF' });
        this.textTime = this.add.text(50, 80, 'Consigue 500 puntos en 15 segundos para salir del agua!', { fontSize: '22px', fill: '#FFF' });


        setTimeout(() => {
            this.level3.destroy();
            this.musicaLost.play();
            this.scene.start('FinDelJuego') 
        }, 15000);
    }
    update(){
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


        if (this.score==500){
            this.level3.destroy();
            this.scene.start('Felicitaciones'); 
            this.level3.destroy();
            this.musicaLost.play();
        }
        this.plataforma1.x-=2;
        this.plataforma1.body.x-=2;
        if (this.plataforma1.body.x<=-250 && this.plataforma1.x <=-250) {
            this.plataforma1=this.platforms.create(900, 400, 'ground');
        }

        this.plataforma2.x+=5;
        this.plataforma2.body.x+=5;
        if (this.plataforma2.body.x>=800) {
            this.plataforma2=this.platforms.create(-150, 300, 'ground');
        }

        this.plataforma3.x-=2;
        this.plataforma3.body.x-=2;
        if (this.plataforma3.body.x<=-400) {
            this.plataforma3=this.platforms.create(1000, 220, 'ground');
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
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.setBounce(1);
            // Se agregan minas terrestres para agregar dificultad
            let bomb2 = this.bombs.create(x, 0, 'bomb');
            bomb2.setCollideWorldBounds(true);
            bomb2.setVelocity(0, 100);
        }
        
    }


    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.level3.destroy();
        this.musicaLost.play();
        this.scene.start('FinDelJuego')   // llama a otra escena 
    }


}

export default Escena3;

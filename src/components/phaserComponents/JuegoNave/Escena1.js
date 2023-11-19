import Phaser from "phaser";
class Escena1 extends Phaser.Scene {

    constructor() {
        super({ key: "Escena1" });
        this.platforms = null;
        this.scoreText = "";
        this.score = 0;

        this.vidaText = "";
        this.vida = 100;

    }

    preload() {
        this.load.image('sky', '/img/JuegoNave/sky.jpg');
        this.load.image('enemy', '/img/JuegoNave/enemy.png');
        this.load.image('red', '/img/JuegoNave/red.png');
        this.load.image('shoot', '/img/JuegoNave/shoot.png');
        this.load.image('disparo', '/img/JuegoNave/disparo.png');
        this.load.spritesheet('nave', '/img/JuegoNave/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.audio('gameMusic','/sound/JuegoNave/gameplay.mp3');
        this.load.image('shootEnemy', '/img/JuegoNave/shootEnemy.png');
       

    }

    create() {

        // crea el disparo 
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.shoot();  // llama al disparo al apretar la barra espaciadora 
            }
        });



        this.gameMusic = this.sound.add('gameMusic');
        this.gameMusic.play();

        this.add.image(400, 300, 'sky');
        //--------------------------------------------//
        // this.add.image(400, 300, 'star');    crea una estrella estatica en el escenario 
        this.player = this.physics.add.sprite(100, 100, 'nave');
        this.player.body.allowGravity = false;
        //-------------------------//

        //this.enemy=this.physics.add.staticGroup();
        //this.enemy.create(258,250,'enemy')
        //this.enemy=this.physics.add.image(600,300,"enemy");

        this.time.addEvent({
            delay: 3000,
            callback: this.crearEnemigos,
            callbackScope: this,
            repeat: -1
        });

        this.time.addEvent({
            delay: 3000,
            callback: this.crearBalas,
            callbackScope: this,
            repeat: -1
        });


        this.createParticulas();



        this.player.setCollideWorldBounds(true);
        //----/
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        // el jugador tiene colision con las plataformas 
        this.physics.add.collider(this.player, this.platforms);
        // se mueve con el teclado  el jugador
        this.cursors = this.input.keyboard.createCursorKeys();


        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        //se crea el puntaje 
        this.vidaText = this.add.text(16, 50, 'Vida: 100', { fontSize: '32px', fill: '#000' });

    }

    //------------------------//
    update() {

        //si llega a puntaje 1000 pasa de nivel
        if (this.score == 200) {
            this.gameMusic.destroy();
            this.scene.start('Escena2', { score: this.score });
            console.log("cambio escena");
        }

        //si pierde todas las vidas
        if (this.vida == 0) {

            this.scene.start('FinDelJuego');
            this.gameMusic.destroy();
            console.log("game over");
            //this.scene.start('End',{puntaje:this.puntaje}); PARA LLEVAR EL PUNTAJE
        }


        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);
            this.player.anims.play('down', true);
        } else {              //evita que se mueva al dejar de presionar la tecla correspondiente 

            this.player.setVelocityY(1);
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0)

        }
        //4 diagonales de la nave
        if (this.cursors.up.isDown && (this.cursors.right.isDown || this.cursors.left.isDown)) {
            this.player.setVelocityY(-160);
            this.player.anims.play('up', true);
        }
        if (this.cursors.down.isDown && (this.cursors.right.isDown || this.cursors.left.isDown)) {
            this.player.setVelocityY(160);
            this.player.anims.play('down', true);
        }


    }

    crearEnemigos() {
        let enemy;
        if (!this.enemiesGroup) {
            this.enemiesGroup = this.physics.add.group();
        }

        // Creamos enemigos
        for (let i = 0; i < 10; i++) {
            let enemyX = Phaser.Math.Between(900, 1100);
            let enemyY = Phaser.Math.Between(25, 550);

            enemy = this.enemiesGroup.create(enemyX, enemyY, 'enemy');
            enemy.setVelocityX(-100);

            // Establecemos las colisiones y eventos para cada enemigo
            this.physics.add.overlap(this.player, enemy, this.ColisionEnemy, null, this);

            enemy.checkWorldBounds = true;
            // Hace que el enemigo se destruya cuando sale de la pantalla
            enemy.outOfBoundsKill = true;
        }


    }

    //Colisión entre el jugador y las estrellas
    ColisionEnemy(player, enemy) {

        console.log("colision");
        /*al detectar colision entre player y enemy, desaparecen enemy */
        enemy.disableBody(true, true);
        this.vida -= 10;
        this.vidaText.setText('Vida: ' + this.vida);
        /*star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);*/

    }

    crearBalas() {
        let enemyShoot;
        if (!this.enemiesShootGroup) {
            this.enemiesShootGroup = this.physics.add.group();
        }

        // Creamos enemigos
        for (let i = 0; i < 10; i++) {
            let enemyShootX = Phaser.Math.Between(900, 1100);
            let enemyShootY = Phaser.Math.Between(25, 550);

            enemyShoot = this.enemiesShootGroup.create(enemyShootX, enemyShootY, 'shootEnemy');
            enemyShoot.setVelocityX(-200);

            // Establecemos las colisiones y eventos para cada enemigo
            this.physics.add.overlap(this.player, enemyShoot, this.ColisionEnemyShoot, null, this);

            enemyShoot.checkWorldBounds = true;
            // Hace que el enemigo se destruya cuando sale de la pantalla
            enemyShoot.outOfBoundsKill = true;
        }


    }

    //Colisión entre el jugador y las estrellas
    ColisionEnemyShoot(player, enemyShoot) {

        console.log("colision");
        /*al detectar colision entre player y enemy, desaparecen enemy */
        enemyShoot.disableBody(true, true);
        this.vida -= 10;
        this.vidaText.setText('Vida: ' + this.vida);

    }

    // funcion de disparo 
    //faltaria agregar la funcion de colision entre bala y enemigo
    shoot() {
        if (!this.balaGroup) {
            this.balaGroup = this.physics.add.group();
        }
    
        // Crea la primera bala
        let bala = this.balaGroup.create(this.player.x, this.player.y, 'disparo');
        let velocidadBala = 300;
        bala.setScale(0.05);
        bala.setVelocity(velocidadBala, 0);

        // Configura la detección de colisiones para la primera bala
        this.physics.add.overlap(bala, this.enemiesGroup, this.ColisionEnemyBala, null, this);
    }
    
    //Colisión entre la bala y el enemigo
    ColisionEnemyBala(bala, enemy) {

        // detecta colision bala enemigo y elimina bala
        bala.disableBody(true, true);

        // detecta colision bala enemigo y elimina enemy
        enemy.disableBody(true, true);

        // elimina un enemigo de enemiesGroup
        this.enemiesGroup.remove(enemy);
        console.log("colision2");



        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

    }

    createParticulas() {
        let particles = this.add.particles(-10, 0, 'red', {

            speed: 100,
            angle: { min: 50, max: 280 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            callback: this.createParticulas,
            callbackScope: this,
            /*speed: 100,
            angle: { min: 150, max: 210 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'*/
        });

        particles.startFollow(this.player);
    }

}
export default Escena1;
import Phaser from "phaser";
class Escena2 extends Phaser.Scene {

    constructor() {
        super({ key: "Escena2" });
        this.platforms = null;
        this.scoreText = "";
        this.score = 200;
        this.vidaText = "";
        this.vida = 300;
    }
    init(data) {
        this.score = data.score;
    }
    preload() {
        this.load.image('sky2', '/img/JuegoNave/sky2.png');
        this.load.image('enemy', '/img/JuegoNave/enemy.png');
        this.load.image('red', '/img/JuegoNave/red.png');
        this.load.image('shoot', '/img/JuegoNave/shoot.png');
        this.load.image('disparo', '/img/JuegoNave/disparo.png')
        this.load.spritesheet('nave', '/img/JuegoNave/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.audio('gameMusic2', '/sound/JuegoNave/gamePlay2.mp3');
        this.load.image('power1', '/img/JuegoNave/power1.png');
    }

    create() {

        // crea el disparo 
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.shoot();  // llama al disparo al apretar la barra espaciadora 
            }
        });


        this.gameMusic2 = this.sound.add('gameMusic2');
        this.gameMusic2.play();

        this.add.image(400, 300, 'sky2');
        //--------------------------------------------//
        // this.add.image(400, 300, 'star');    crea una estrella estatica en el escenario 
        this.player = this.physics.add.sprite(100, 100, 'nave');
        this.player.body.allowGravity = false;
        //-------------------------//

        //this.enemy=this.physics.add.staticGroup();
        //this.enemy.create(258,250,'enemy')
        //this.enemy=this.physics.add.image(600,300,"enemy");

        /*Metodo para repetir eventos */
        //this.crearEnemigos();
        this.time.addEvent({
            delay: 2000,
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

        // se llama al powerUp 


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
        this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#FFF' });
        //se crea el puntaje 
        this.vidaText = this.add.text(16, 50, 'Vida:', { fontSize: '32px', fill: '#FFF' });

        this.createPowerUp = function () {
            this.power1 = this.physics.add.group({
                key: 'power1',
                repeat: 1,
                setXY: { x: 800, y: Phaser.Math.Between(0, 600), stepX: Phaser.Math.Between(70, 150) },
                velocityX :-200
            });
        
            this.physics.add.overlap(this.player, this.power1, this.collectPower, null, this);
        };
        
        // Configurar el evento
        this.time.addEvent({
            delay: 5000,
            callback: this.createPowerUp,
            callbackScope: this,
            repeat: -1
        });

    }

    //------------------------//
    update() {

        //si llega a puntaje 1000 pasa de nivel
        if (this.score == 500) {
            this.scene.start('Ganador');
            this.scene.start('Ganador', { score: this.score });
            this.gameMusic2.destroy();
            console.log("cambio escena");
        }

        //si pierde todas las vidas
        if (this.vida == 0) {

            this.scene.start('FinDelJuego');
            this.gameMusic2.destroy();
            console.log("game over");
            //this.scene.start('End',{puntaje:this.puntaje}); PARA LLEVAR EL PUNTAJE
        }


        //4 direcciones de la nave

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

            this.player.setVelocityY(0);
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

        //----------------------------- POWER-UP--------------------------------//
        if (this.power1) {
            this.power1.children.iterate(function (child) {
                child.setScale(0.15);
        
                // Verifica si el objeto ha salido de la pantalla en el lado izquierdo y vuelve a colocarlo en el lado derecho
                if (child.x < 0) {
                    child.x = 800; // Ancho de la pantalla
                    child.y = Phaser.Math.Between(0, 600 - child.height * 0.15); // Altura de la pantalla
                    console.log("Salio de la pantalla");
                }
            });
        
            // Verifica si no hay power ups en la escena y vuelve a crearlos en el lado derecho
            if (this.power1.countActive() === 0) {
                this.createPowerUp();  // Vuelve a llamar a la función createPowerUp para recrear los Power-Up en el lado derecho
            }
        }
    }

    collectPower(player, power1) {
        power1.disableBody(true, true);
        console.log("Power-Up recogido");
        this.activoPowerUp();
    }




    crearEnemigos() {
        let enemy;
        if (!this.enemiesGroup) {
            this.enemiesGroup = this.physics.add.group();
        }
        let velocidad = -200;
        // Creamos enemigos
        for (let i = 0; i < 15; i++) {
            let enemyX = Phaser.Math.Between(800, 1100);
            let enemyY = Phaser.Math.Between(25, 550);

            /**variables para dar efecto que se mueven los enemigos */
            let velocidadX = Phaser.Math.Between(-50, -200);//-200; 
            let velocidadY = Phaser.Math.Between(-50, 50);

            enemy = this.enemiesGroup.create(enemyX, enemyY, 'enemy');

            /**le damos a enemy la velocidad con las variables anteriores */
            enemy.setVelocity(velocidadX, velocidadY);

            for (let j = 0; j < 3; j++) {
                enemy.setVelocityX(velocidad);
                velocidad -= 10;
            }


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
        //this.enemiesGroup.disableBody(true, true);




        /*al detectar colision entre la bala y el enemigo, desaparecen enemy */
        //enemy.disableBody(true,true);


        //enemy.checkWorldBounds = true;
        // Hace que el enemigo se destruya cuando sale de la pantalla
        //enemy.outOfBoundsKill = true; 

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

    }

    crearBalas() {
        let enemyShoot;
        if (!this.enemiesShootGroup) {
            this.enemiesShootGroup = this.physics.add.group();
        }

        // Creamos balas
        for (let i = 0; i < 15; i++) {
            let enemyShootX = Phaser.Math.Between(900, 1100);
            let enemyShootY = Phaser.Math.Between(25, 550);

            enemyShoot = this.enemiesShootGroup.create(enemyShootX, enemyShootY, 'shootEnemy');
            enemyShoot.setVelocityX(-300);

            // Establecemos las colisiones y eventos para cada enemigo
            this.physics.add.overlap(this.player, enemyShoot, this.ColisionEnemyShoot, null, this);

            enemyShoot.checkWorldBounds = true;
            // Hace que el enemigo se destruya cuando sale de la pantalla
            enemyShoot.outOfBoundsKill = true;
        }


    }

    activoPowerUp() {
        this.disparoDoble = true;
        this.powerUpTime = this.time.delayedCall(10000, this.desactivoPowerUp, [], this);
        // Activa el grupo de balas
    }

    desactivoPowerUp() {
        this.disparoDoble = false;
        if (this.powerUpTime) {
            this.powerUpTime.remove();
        }
        // Desactiva el grupo de balas al desactivar el power-up
        this.balaGroup.setActive(false).setVisible(false);
    }

    // funcion de disparo 
    shoot() {
        if (!this.balaGroup) {
            this.balaGroup = this.physics.add.group();
        }

        // Crea la primera bala
        let bala = this.balaGroup.create(this.player.x, this.player.y, 'disparo');
        let velocidadBala = 300;
        bala.setScale(0.05);
        bala.setVelocity(velocidadBala, 0);

        // Ajusta la posición inicial de la primera bala
        bala.y -= 10;

        // Crea la segunda bala solo si el disparo doble está activo
        if (this.disparoDoble) {
            let bala1 = this.balaGroup.create(this.player.x, this.player.y, 'disparo');
            bala1.setScale(0.05);
            let velocidadBala1 = 300; // Utiliza una variable diferente para la velocidad de la segunda bala
            bala1.setVelocity(velocidadBala1, 0);

            // Ajusta la posición inicial de la segunda bala
            bala1.y += 10;

            // Configura la detección de colisiones para la segunda bala
            this.physics.add.overlap(bala1, this.enemiesGroup, this.ColisionEnemyBala, null, this);
        }

        // Configura la detección de colisiones para la primera bala
        this.physics.add.overlap(bala, this.enemiesGroup, this.ColisionEnemyBala, null, this);
    }

    //Colisión entre el jugador y las estrellas
    ColisionEnemyShoot(player, enemyShoot) {

        console.log("colision");
        /*al detectar colision entre player y enemy, desaparecen enemy */
        enemyShoot.disableBody(true, true);
        this.vida -= 10;
        this.vidaText.setText('Vida: ' + this.vida);
        /*star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);*/

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
export default Escena2;

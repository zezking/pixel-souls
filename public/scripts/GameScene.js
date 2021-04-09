class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
    this.score = 0;
  }


  create() {
    this.createMap();
    // this.createAudio();
    // this.createWalls();
    this.createPlayer();
<<<<<<< HEAD

    // this.addCollisions();
=======
    this.createEnemy();
    this.addCollisions();
>>>>>>> 8ab4c9713e3fe7d936cc359cb7a4f1f455d8d3fd
    this.createInput();

  }

  update() {

    this.player.update(this.cursors);


  }

  // createAudio() {

  // }

  createPlayer() {
<<<<<<< HEAD
    // this.player = new Player(this, 32, 50, 'player', 32);
    this.player = new Player({scene:this, x:32, y:50,texture:'player2', frame:'player_0'} );

  }

  createPlayerAnimation(){


=======
    this.player = new Player(this, 50, 50, 'player', 32);
  }

  createEnemy() {
    this.enemy = new Enemy(this, 100, 100, 'skele', 32);
>>>>>>> 8ab4c9713e3fe7d936cc359cb7a4f1f455d8d3fd
  }

  // createWalls() {
  //   this.wall = this.physics.add.image(500, 100, 'button1');
  //   this.wall.setImmovable();
  // }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addCollisions() {
    // check for collisions between player and wall objects
    this.physics.add.collider(this.player, this.enemy, touchEnemy, null, this);
    this.physics.add.collider(this.enemy);
    // this.physics.add.overlap(this.player, this.enemy);

    
    
    function touchEnemy(player, enemy) {
      // enemy bounces off walls
      enemy.body.bounce.x = 1;
      enemy.body.bounce.y = 1;
      //player velocity -> enemy collision -> enemy drag/friction
      enemy.body.drag.x = 250;
      enemy.body.drag.y = 250;
      // can add other code - damage player, etc.
      }

    // // check for overlaps between player and chest game objects
    // this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  createMap() {
<<<<<<< HEAD

    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = this.map.createStaticLayer('bottom', this.tiles, 0, 0);
=======
    let map = this.make.tilemap({ key: 'map' });
    this.tiles = map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = map.createStaticLayer('bottom', this.tiles, 0, 0);


    // character camera bounds
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
>>>>>>> 8ab4c9713e3fe7d936cc359cb7a4f1f455d8d3fd
  }
}

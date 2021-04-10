class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
    this.score = 0;
  }

  preload() {
    // console.log("preload")
    Player.preload(this);
    Enemy.preload(this)
  }

  
  create() {
    this.createMap();
    // this.createAudio();
    // this.createWalls();
    this.createPlayer();
    this.createEnemy();
    this.addCollisions();
    this.createInput();

  }

  update() {
    this.player.update(this.inputKeys);
    this.enemy.update();
  }

  // createAudio() {

  // }

  createPlayer() {
    this.player = new Player({scene:this,x:0,y:0,key:'ashen_one',frame:'player_0'});
  }

  createEnemy() {
    this.enemy = new Enemy({scene:this,x:100,y:100,key:'skeleton',frame:'skele_idle0'});
  }

  // createWalls() {
  //   this.wall = this.physics.add.image(500, 100, 'button1');
  //   this.wall.setImmovable();
  // }

  createInput() {

    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    let camera = this.cameras.main;
    camera.zoom = 3;
    camera.startFollow(this.player);
    camera.setLerp(0.1,0.1);

  }

  addCollisions() {
    // grab the physics map from FULLMAP_collision.json
    let shapes = this.cache.json.get("shapes");

    let collisionLayer = this.matter.add.sprite (0, 0, 'sheet', 'FULLMAP_collision', {shape: shapes.FULLMAP_collision});
    collisionLayer.setPosition (0 + 785, 0 + 1325); //manual offset for center of mass. Will have to find a better way to calculate this.
    
    // check for collisions between player and wall objects
    // this.physics.add.collider(this.player, this.enemy, touchEnemy, null, this);
    // this.physics.add.collider(this.enemy);
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

  }

  createMap() {
    let map = this.make.tilemap({ key: 'map' });
    this.tiles = map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = map.createStaticLayer('bottom', this.tiles, 0, 0);


    // character camera bounds
    this.matter.world.width = map.widthInPixels;
    this.matter.world.height = map.heightInPixels;
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  }
}

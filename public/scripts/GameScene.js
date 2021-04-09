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
    this.createEnemy();
    this.addCollisions();
    this.createInput();

  }

  update() {
    this.player.update(this.cursors);
  }

  // createAudio() {

  // }

  createPlayer() {
    this.player = new Player(this, 32, 50, 'player', 32);
  }

  createEnemy() {
    this.enemy = new Enemy(this, 32, 32, 'skele', 32);
  }

  // createWalls() {
  //   this.wall = this.physics.add.image(500, 100, 'button1');
  //   this.wall.setImmovable();
  // }

  createInput() {

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    let camera = this.cameras.main;
    camera.zoom = 2;
    camera.startFollow(this.player);
    camera.setLerp(0.1,0.1);

  }

  addCollisions() {
    // check for collisions between player and wall objects
    this.physics.add.collider(this.player, this.enemy);
    // // check for overlaps between player and chest game objects
    // this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  createMap() {
    let map = this.make.tilemap({ key: 'map' });
    this.tiles = map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = map.createStaticLayer('bottom', this.tiles, 0, 0);


    // character camera bounds
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }
}

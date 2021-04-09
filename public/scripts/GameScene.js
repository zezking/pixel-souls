class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  // init() {
  //   // this.scene.launch('Ui');
  //   // this.score = 0;
  // }

  create() {
    this.createMap();
    // this.createAudio();
    // this.createWalls();
    this.createPlayer();
    // this.addCollisions();
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
    camera.zoom = 1.5;
    camera.startFollow(this.player);
    camera.setLerp(0.1,0.1);
    camera.setBounds(0,0, this.player);
  }

  // addCollisions() {
  //   // check for collisions between player and wall objects
  //   this.physics.add.collider(this.player, this.wall);
  //   // check for overlaps between player and chest game objects
  //   this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  // }

  createMap() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = this.map.createStaticLayer('bottom', this.tiles, 0, 0);
  }
}

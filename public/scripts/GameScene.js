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
    this.addCollisions();
    this.createInput();
  }

  update() {
    this.player.update(this.inputKeys);
  }

  // createAudio() {

  // }

  createPlayer() {
    this.player = new Player(this.matter.world);
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
    camera.zoom = 2;
    camera.startFollow(this.player);
    camera.setLerp(0.1,0.1);

  }

  addCollisions() {
    // grab the physics map from FULLMAP_collision.json
    let shapes = this.cache.json.get("shapes");

    let collisionLayer = this.matter.add.sprite (0, 0, 'sheet', 'FULLMAP_collision', {shape: shapes.FULLMAP_collision});
    collisionLayer.setPosition (0 + 785, 0 + 1325); //manual offset for center of mass. Will have to find a better way to calculate this.
  }

  createMap() {
    let map = this.make.tilemap({ key: 'map' });
    this.tiles = map.addTilesetImage('FULLMAP_bottom', 'bottom', 32, 32, 0, 0);
    this.bottomLayer = map.createStaticLayer('bottom', this.tiles, 0, 0);

    // character camera bounds
    // this.physics.world.bounds.width = map.widthInPixels;
    // this.physics.world.bounds.height = map.heightInPixels;
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }
}

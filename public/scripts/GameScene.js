let enemy_speed = 20;
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.scene.launch("Ui");
    this.score = 0;
  }

  preload() {
    // console.log("preload")
    Player.preload(this);
    Enemy.preload(this);
  }

  create() {
    // this.createMap();
    // this.createAudio();
    // this.createWalls();
    this.createPlayer();
    this.createEnemy();
    this.addCollisions();
    this.createInput();
    this.createNPC();
    // this.createBattle();
    // this.createConversation();
    this.createOverlay();
    this.OverlayLayer.setDepth(2240); //MUST ALWAYS BE LAST ON THIS LIST!!
  }

  update() {
    this.player.update(this.inputKeys);
    this.enemy.update();

    this.children.each((c) => {
      const child = c;
      if (child.type !== "TilemapLayer") {
        child.setDepth(child.y);
      }
    });
  }

  // createAudio() {

  // }

  createPlayer() {
    this.player = new Player({
      scene: this,
      x: 480.5,
      y: 1774,
      key: "ashen_one",
      frame: "player_0",
    });
  }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 860,
      y: 1700,
      key: "skele_sprite",
      frame: "skele_idling0",
    });
  }

  createNPC() {
    this.bird = new NPC({ scene: this, x: 400, y: 898, key: "bird" });
    this.reah = new NPC({ scene: this, x: 755.75, y: 783, key: "reah" });
    this.laurentius = new NPC({
      scene: this,
      x: 388.75,
      y: 1471.75,
      key: "laurentius",
    });
    this.fireKeeper = new NPC({
      scene: this,
      x: 496,
      y: 1962.97,
      key: "fireKeeper",
    });
    this.crestfallenWarrior = new NPC({
      scene: this,
      x: 500,
      y: 1665,
      key: "crestfallenWarrior",
    });
    this.lautrec = new NPC({ scene: this, x: 581.99, y: 2161, key: "lautrec" });
    this.petrus = new NPC({ scene: this, x: 672, y: 1102.5, key: "petrus" });
    this.bigHatLogan = new NPC({
      scene: this,
      x: 865.75,
      y: 1550,
      key: "bigHatLogan",
    });
    this.griggs = new NPC({ scene: this, x: 825.64, y: 1640, key: "griggs" });
    // this.boxGroup = this.physics.add.staticGroup()

    let npcs = [
      this.bird,
      this.reah,
      this.laurentius,
      this.fireKeeper,
      this.crestfallenWarrior,
      this.lautrecm,
      this.petrus,
      this.bigHatLogan,
      this.griggs,
    ];

    for (let npc of npcs) {
      this.createDialogs(npc);
    }
  }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 100,
      y: 100,
      key: "skeleton",
      frame: "skele_idle",
    });
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
    });
    let camera = this.cameras.main;
    camera.zoom = 3;
    camera.startFollow(this.player);
    camera.setLerp(0.1, 0.1);
  }

  addCollisions() {
    // grab the physics map from FULLMAP_collision.json
    let shapes = this.cache.json.get("shapes");

    let collisionLayer = this.matter.add.sprite(
      0,
      0,
      "sheet",
      "FULLMAP_collision",
      { shape: shapes.FULLMAP_collision }
    );
    collisionLayer.setPosition(0 + 783, 0 + 1325); //manual offset for center of mass. Will have to find a better way to calculate this.
    collisionLayer.visible = false;
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
    let map = this.make.tilemap({ key: "map" });
    this.tilesBottom = map.addTilesetImage(
      "FULLMAP_bottom",
      "bottom",
      32,
      32,
      0,
      0
    );
    this.bottomLayer = map.createStaticLayer("bottom", this.tilesBottom, 0, 0);

    // character camera bounds

    this.matter.world.width = map.widthInPixels;
    this.matter.world.height = map.heightInPixels;
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  createOverlay() {
    let map = this.make.tilemap({ key: "map" });
    this.tilesOverlay = map.addTilesetImage(
      "FULLMAP_overlay",
      "overlay",
      32,
      32,
      0,
      0
    );
    this.OverlayLayer = map.createStaticLayer(
      "overlay",
      this.tilesOverlay,
      0,
      0
    );
  }

  createBattle() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.enemy,
      callback: (eventData) => this.scene.start("Battle"),
    });
  }
  createDialogs(npc) {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: npc,
      callback: (eventData) => {
        if (npc) {
        }
      },
    });
  }

  createDialogsBox() {}
}

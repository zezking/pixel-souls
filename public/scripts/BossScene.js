class BossScene extends Phaser.Scene {
  constructor() {
    super("Boss");
  }

  init(data) {
    let { player } = data;
    this.player = player;

    //references to other scenes for event listening
    this.uiScene = this.scene.get("Ui");
    this.combatScene = this.scene.get("Combat");
    this.AudioScene = this.scene.get("Audio");
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.createMap();
    this.createOverlay();
    // this.addCollisions();  //function not set up properly
    this.playerStartPoint();
    this.createInput();
    // this.createBoss();  //New class for Andy?
    this.createCombat();
  }

  update() {
    this.player.update();
  }

  //----------------------------

  playerStartPoint() {
    //This is probably not correct. Change the player's x/y coordinates so that they are moved to the elevator upon scene change.
    this.player.x = 200;  
    this.player.y = 200;
  }

  createBoss() {
    this.boss = new Enemy({
      scene: this,
      x: 200,
      y: 200,
      key: "andy",
      id: 1
    })
  }

  createMap() {
    let map = this.make.tilemap({ key: "bossmap" });
    this.tilesBottom = map.addTilesetImage(
      "BOSSMAP_bottom",
      "boss_bottom",
      32,
      32,
      0,
      0
    );
    this.bottomLayer = map.createLayer("boss_bottom", this.tilesBottom, 0, 0);

    // character camera bounds
    // world bounded to map size
    this.matter.world.width = map.widthInPixels;
    this.matter.world.height = map.heightInPixels;
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  createOverlay() {
    let map = this.make.tilemap({ key: "bossmap" });
    this.tilesOverlay = map.addTilesetImage(
      "BOSSMAP_overlay",
      "boss_overlay",
      32,
      32,
      0,
      0
    );
    this.OverlayLayer = map.createLayer("boss_overlay", this.tilesOverlay, 0, 0);
  }

  // addCollisions() {
  //   // grab the physics map from FULLMAP_collision.json
  //   let shapes = this.cache.json.get("shapes");

  //   let collisionLayer = this.matter.add.sprite(
  //     0,
  //     0,
  //     "sheet",
  //     "FULLMAP_collision",
  //     { shape: shapes.FULLMAP_collision }
  //   );
  //   collisionLayer.setPosition(0 + 684, 0 + 1136); //manual offset for center of mass. Will have to find a better way to calculate this.
  //   collisionLayer.visible = false;
  // }

  createInput() {
    // capture so that spacebar doesn't scroll downwards in window
    this.input.keyboard.addCapture("SPACE");
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      drink: Phaser.Input.Keyboard.KeyCodes.R,
    });

    let camera = this.cameras.main;

    // Zoom in and out of Player
    camera.zoom = 3;

    camera.startFollow(this.player);
    // Camera to center leeway, the higher, the tighter
    camera.setLerp(0.1, 0.1);

    // //spawn flash
    // camera.flash(1000);
    camera.fadeIn(1000);
  }

  createCombat() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.boss,
      callback: (eventData) => {
        this.combatScene.playerPosition(this.player.x, this.player.y);
        this.boss.enemyKilled();
        this.boss.setStatic(true);
        this.AudioScene.stopMainBgm();
        this.scene.sleep();
        this.scene.add("Loading", LoadingScene, true);
        this.scene.launch("Combat", {
          health: this.player.health,
          enemyGroup: [this.boss],
        });
      },
      context: this,
    });
  }
}
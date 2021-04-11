let enemy_speed = 20;
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: true });
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
    this.createMap();
    // this.createAudio();
    this.createPlayer();
    this.createEnemy();
    this.addCollisions();
    this.createInput();
    this.createEntity();
    this.createNPC();
    //this.createBattle();
    this.createOverlay();
    this.OverlayLayer.setDepth(2239); //MUST ALWAYS BE LAST ON THIS LIST!!
  }

  update() {
    this.player.update(this.inputKeys);
    this.enemy.update();

    //Sprite depth-sorting
    this.children.each((c) => {
      const child = c;
      if (child.depthSorting) {
        child.setDepth(child.y);
      }
    });
  }

  // createAudio() {

  // }

  createPlayer() {
    this.player = new Player({
      scene: this,
      x: 400,
      y: 1390,
      key: "ashen_one",
      frame: "player_0",
    });
  }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 100,
      y: 100,
      key: "skeleton_sprite",
      frame: "skele_idling0",
    });
    this.enemy = new Enemy({
      scene: this,
      x: 700,
      y: 1774,
      key: "skeleton_sprite",
      frame: "skele_idling0",
    });
  }

  createNPC() {
    this.bird = new NPC({ scene: this, x: 330, y: 865, key: "bird" }).setOrigin(
      0,
      0.7
    );
    this.reah = new NPC({ scene: this, x: 766, y: 766, key: "reah" });
    this.laurentius = new NPC({
      scene: this,
      x: 400,
      y: 1440,
      key: "laurentius",
    });
    this.fireKeeper = new NPC({
      scene: this,
      x: 496,
      y: 1961,
      key: "fireKeeper",
    });
    this.crestfallenWarrior = new NPC({
      scene: this,
      x: 495,
      y: 1667,
      key: "crestfallenWarrior",
    });
    this.lautrec = new NPC({
      scene: this,
      x: 584,
      y: 2138,
      key: "lautrec",
    }).setOrigin(0.5, 0.3);
    this.petrus = new NPC({ scene: this, x: 688, y: 1082, key: "petrus" });
    this.bigHatLogan = new NPC({
      scene: this,
      x: 872,
      y: 1545,
      key: "bigHatLogan",
    });
    this.griggs = new NPC({ scene: this, x: 825.64, y: 1640, key: "griggs" });

    //here's a stupid step to get the bird on top of the wall
    this.children.each((c) => {
      const child = c;
      if (child.depthSorting && child.texture.key === "bird") {
        child.depthSorting = false;
        child.setDepth(2240);
      }
    });

    let npcs = [
      this.bird,
      this.reah,
      this.laurentius,
      this.fireKeeper,
      this.crestfallenWarrior,
      this.lautrec,
      this.petrus,
      this.bigHatLogan,
      this.griggs,
    ];
    for (let npc of npcs) {
      this.createDialogs(npc);
    }
  }

  createEntity() {
    this.entity = new Entity({ scene: this, x: 735, y: 1770, key: "well" });
    this.entity = new Entity({
      scene: this,
      x: 769,
      y: 1303,
      key: "pillar01",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 404,
      y: 1169,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 404,
      y: 1010,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 404,
      y: 850,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 556,
      y: 1169,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 556,
      y: 1010,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
    this.entity = new Entity({
      scene: this,
      x: 556,
      y: 850,
      key: "pillar02",
    }).setOrigin(0.5, 0.9);
  }

  createInput() {
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
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
    collisionLayer.setPosition(0 + 736, 0 + 1211); //manual offset for center of mass. Will have to find a better way to calculate this.
    collisionLayer.visible = false;
    // check for collisions between player and wall objects
    // this.physics.add.collider(this.player, this.enemy, touchEnemy, null, this);
    // this.physics.add.collider(this.enemy);
    // this.physics.add.overlap(this.player, this.enemy);

    // OLD arcade physics collision logic for enemy
    // function touchEnemy(player, enemy) {
    //   // enemy bounces off walls
    //   enemy.body.bounce.x = 1;
    //   enemy.body.bounce.y = 1;
    //   //player velocity -> enemy collision -> enemy drag/friction
    //   enemy.body.drag.x = 250;
    //   enemy.body.drag.y = 250;
    //   // can add other code - damage player, etc.
    //   }
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
          let sceneKeyArray = [];
          console.log(this);
          for (let key in this.scene.manager.keys) {
            sceneKeyArray.push(key);
          }

          if (!sceneKeyArray.includes("Dialog")) {
            this.scene.add("Dialog", DialogScene, true, { npc });
          }
        }
      },
    });
  }

  createDialogsBox() {}
}

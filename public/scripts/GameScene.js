let enemy_speed = 20;
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.scene.launch("Ui");
    this.events.emit("deathClear");
  }

  preload() {
    Player.preload(this);
    Enemy.preload(this);
    Bonfire.preload(this);
    NPC.preload(this);
  }

  create() {
    this.createMap();
    // this.createAudio();
    this.createPlayer();
    console.log(this.player);
    this.createEnemy();
    this.addCollisions();
    this.createInput();
    this.createEntity();
    this.createItem();
    this.createNPC();
    this.createBonfire();
    this.createDeath();
    this.createOverlay();
    this.createEventsManager();

    this.OverlayLayer.setDepth(2239); //MUST ALWAYS BE LAST ON THIS LIST!!
  }

  update() {
    this.player.update(this.inputKeys);

    // enemies list
    this.enemy.update();
    this.enemy2.update();
    this.enemy3.update();

    this.crestfallenWarrior.update();
    this.bonfire.update();

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
      x: 530,
      y: 1700,
      key: "ashen_one",
    });
  }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 688,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
    });
    this.enemy2 = new Enemy({
      scene: this,
      x: 688,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
    });
    this.enemy3 = new Enemy({
      scene: this,
      x: 688,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
    });
  }

  createNPC() {
    this.bird = new NPC({
      scene: this,
      x: 330,
      y: 865,
      key: "bird",
    }).setOrigin(0, 0.7);
    this.reah = new NPC({
      scene: this,
      x: 766,
      y: 766,
      key: "reah",
    });
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
      frame: "crestfallenWarrior0",
    });
    this.lautrec = new NPC({
      scene: this,
      x: 584,
      y: 2138,
      key: "lautrec",
    }).setOrigin(0.5, 0.3);
    this.petrus = new NPC({
      scene: this,
      x: 688,
      y: 1082,
      key: "petrus",
    });
    this.bigHatLogan = new NPC({
      scene: this,
      x: 872,
      y: 1545,
      key: "bigHatLogan",
    });
    this.griggs = new NPC({
      scene: this,
      x: 825.64,
      y: 1640,
      key: "griggs",
    });

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
    this.entity = new Entity({
      scene: this,
      x: 735,
      y: 1770,
      key: "well",
    });
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

  createItem() {
    this.item = new Item({
      scene: this,
      x: 700,
      y: 1740,
      key: "soul",
      id: 1,
    });
    this.item.depthSorting = false;
    this.item.setDepth(1771);

    console.log("how many items??? ", this.item);
    //item collision detection
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.item,
      callback: (eventData) => {
        this.events.emit("pickupItem", this.item.id);
      },
    });
  }

  createBonfire() {
    this.bonfire = new Bonfire({
      scene: this,
      x: 525,
      y: 1760,
      key: "bonfire",
      frame: "bonfire0",
    });
  }

  createInput() {
    // capture so that spacebar doesn't scroll downwards in window
    this.input.keyboard.addCapture('SPACE')
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
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
    collisionLayer.setPosition(0 + 684, 0 + 1136); //manual offset for center of mass. Will have to find a better way to calculate this.
    collisionLayer.visible = false;
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
    this.bottomLayer = map.createLayer("bottom", this.tilesBottom, 0, 0);

    // character camera bounds
    // world bounded to map size
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
    this.OverlayLayer = map.createLayer("overlay", this.tilesOverlay, 0, 0);
  }

  createDeath() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.enemy,
      callback: (eventData) => this.scene.start("Combat"),
    });
  }

  createDialogs(npc) {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: npc,
      callback: () => {
        if (npc) {
          let sceneKeyArray = [];
          for (let key in this.scene.manager.keys) {
            //push all the scenes keys as string to the array
            sceneKeyArray.push(key);
          }
          if (!sceneKeyArray.includes("Dialog")) {
            //if there is no dialog scene in the array
            this.scene.add("Dialog", DialogScene, true, { npc }); //add Dialogue scene
          }
        }
      },
    });
  }

  createDialogsBox() {}

  createEventsManager() {
    this.eventsManager = new EventsManager(this, this.children);
    this.eventsManager.setup();
  }
}

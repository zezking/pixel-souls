let enemy_speed = 20;
let timedEvent;
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.scene.launch("Ui");
  }

  preload() {
    Enemy.preload(this);
    Bonfire.preload(this);
    NPC.preload(this);
    Player.preload(this);
  }

  create() {
    this.createMap();
    // this.createAudio();
    this.createPlayer();
    this.createEnemy();
    this.addCollisions();
    this.createInput();
    this.createEntity();
    this.createItem();
    this.createNPC();
    this.createBonfire();
    // Near Bonfire for light up on player?
    this.createNearBonfire();
    this.createCombat();

    // Spawn Effect
    this.createDelay();
    this.onEvent();

    this.createOverlay();
    this.setupEventListener();

    this.freeEnemy(this.enemies);
    //Background Music
    this.createMusic();
    this.mainBGM.play();

    this.OverlayLayer.setDepth(2239); //MUST ALWAYS BE LAST ON THIS LIST!!
  }

  update() {
    this.player.update();

    // enemies list
    this.enemies.forEach((enemy) => {
      enemy.update();
    });

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
      y: 1740,
      key: "ashen_one",
      frame: "player_00",
    });
  }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 288,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 1,
    });
    this.enemy2 = new Enemy({
      scene: this,
      x: 688,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 2,
    });
    this.enemy3 = new Enemy({
      scene: this,
      x: 688,
      y: 1022,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 3,
    });
    this.enemies = [this.enemy, this.enemy2, this.enemy3];
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
    this.item2 = new Item({
      scene: this,
      x: 750,
      y: 1740,
      key: "soul",
      id: 2,
    });

    this.item.depthSorting = false;
    this.item.setDepth(1771);

    //item collision detection
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: [this.item, this.item2],
      callback: (eventData) => {
        this.events.emit("pickupItem", eventData.gameObjectB);
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
    this.input.keyboard.addCapture("SPACE");
    this.player.inputKeys = this.input.keyboard.addKeys({
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

    // this.player.update(this.player.anims.play("player_down"));
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

  createCombat() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.enemies,
      callback: (eventData) => {
        console.log("Event Data inside createCombat: ", eventData);

        this.events.emit("enemyDeath", eventData.gameObjectB);
        this.enemies.forEach((enemy) => {
          console.log(enemy);
          enemy.setStatic(true);
        });
        this.scene.sleep();
        this.mainBGM.stop();
        this.scene.add("Loading", LoadingScene, true);
        this.scene.launch("Combat", {
          health: this.player.health,
          enemyGroup: this.enemies,
        });
      },
      callbackScope: this,
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

  createNearBonfire() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.bonfire,
      callback: () => {
        this.events.emit("characterLit");
      },
    });
  }

  //Delay and activation for
  createDelay() {
    timedEvent = this.time.delayedCall(600, this.onEvent, [], this);
  }
  onEvent() {
    this.events.emit("characterNotLit");
    this.events.emit("deathClear");
  }

  setupEventListener() {
    this.events.on("pickupItem", (item) => {
      //update Soul Counter
      let prevSouls = this.player.souls;
      this.player.updateSouls(300); //currently all soulItems give a hard-coded 300 souls.
      console.log("picked up item!");
      this.events.emit("updateSouls", prevSouls, this.player.souls);
      //remove item
      item.makeInactive();
    });

    this.events.on("enemyDeath", (enemy) => {
      console.log("Inside enemyDeath? Enemy: ", enemy);
      this.enemies = this.enemies.filter((e) => e.id !== enemy.id);
      console.log("this.enemies: ", this.enemies);
      enemy.enemyKilled();
      // this.events.off("enemyDeath");
    });

    this.events.once("deathClear", () => {
      this.player.souls = 0;
      this.player.health = 5;
      this.events.off("deathClear");
    });

    // to start Light Effect
    this.events.once("characterLit", () => {
      this.player.atBonfire = true;
    });
    // to stop Light Effect
    this.events.once("characterNotLit", () => {
      this.player.atBonfire = false;
    });
  }

  createAreaText() {
    this.areaText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Firelink Shrine", {
        fontFamily: "titleFont",
        fill: "#ffffff",
        fontSize: "120px",
      })
      .setAlpha(1);

    this.tweens.add({
      targets: this.areaText,
      alpha: { start: 1, from: 1, to: 0, duration: 2000, ease: "Linear" },
      yoyo: true,
      loop: -1,
    });
  }

  freeEnemy(enemyGroup) {
    if (enemyGroup) {
      this.events.on("wake", function (sys, data) {
        let { gameOver } = data;
        if (gameOver) {
          this.enemyTimer = sys.time.addEvent({
            delay: 1000,
            callback: () => {
              enemyGroup.forEach((enemy) => {
                if (enemy.active) {
                  enemy.setStatic(false); //set it's static to false if enemy is still active (not killed)
                }
              });
            },
            callbackScope: sys,
          });
        }
      });
    }
  }

  createMusic() {
    this.mainBGM = this.sound.add("bg-music", {
      volume: 0.04,
    });
  }
}

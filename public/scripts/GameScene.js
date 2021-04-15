let enemy_speed = 20;
let timedEvent;

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.scene.launch("Ui");
    this.scene.moveAbove("Title");
    //references to other scenes for event listening
    this.uiScene = this.scene.get("Ui");
    this.combatScene = this.scene.get("Combat");
    this.AudioScene = this.scene.get("Audio");
  }

  preload() {
    Enemy.preload(this);
    Bonfire.preload(this);
    NPC.preload(this);
    Item.preload(this);
    Player.preload(this);
  }

  create() {
    this.createMap();
    this.createPlayer();
    this.createEnemy();

    this.createAreaText();

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
    this.AudioScene.playMainBgm();
    this.AudioScene.playAreaSFX();

    this.OverlayLayer.setDepth(2239); //MUST ALWAYS BE LAST ON THIS LIST!!
  }

  update() {
    this.playerWalking();
    this.player.update();
    //this.AudioScene.stepSFX(this);
    // enemies list
    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    // this.crestfallenWarrior.update();
    // this.griggs.update();
    // this.bigHatLogan.update();
    // this.laurentius.update();
    this.npcs.forEach((npc) => {
      npc.update();
    });
    this.bonfire.update();

    //items list
    this.items.forEach((item) => {
      item.update();
    });

    //Sprite depth-sorting
    this.children.each((c) => {
      const child = c;
      if (child.depthSorting) {
        child.setDepth(child.y);
      }
    });
  }
  //--------------SPAWN ENTITIES IN GAME------------------
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
      x: 708,
      y: 922,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 3,
    });
    this.enemy4 = new Enemy({
      scene: this,
      x: 100,
      y: 100,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 4,
    });
    this.enemies = [this.enemy, this.enemy2, this.enemy3, this.enemy4];
  }

  createNPC() {
    this.bird = new NPC({
      scene: this,
      x: 330,
      y: 865,
      key: "bird",
      name: "bird",
    }).setOrigin(0, 0.7);
    this.reah = new NPC({
      scene: this,
      x: 766,
      y: 766,
      key: "reah",
      name: "reah",
    });
    this.laurentius = new NPC({
      scene: this,
      x: 400,
      y: 1440,
      key: "laurentius",
      frame: "laurentius_0",
      name: "laurentius",
    });
    this.fireKeeper = new NPC({
      scene: this,
      x: 496,
      y: 1961,
      key: "fireKeeper",
      frame: "fireKeeper_0",
      name: "fireKeeper",
    });
    this.crestfallenWarrior = new NPC({
      scene: this,
      x: 495,
      y: 1667,
      key: "crestfallenWarrior",
      frame: "crestfallenWarrior0",
      name: "crestfallenWarrior",
    });
    this.lautrec = new NPC({
      scene: this,
      x: 584,
      y: 2138,
      key: "lautrec",
      frame: "lautrec_0",
      name: "lautrec",
    }).setOrigin(0.5, 0.3);
    this.petrus = new NPC({
      scene: this,
      x: 688,
      y: 1082,
      key: "petrus",
      frame: "petrus_0",
      name: "petrus",
    });
    this.bigHatLogan = new NPC({
      scene: this,
      x: 872,
      y: 1545,
      key: "bigHatLogan",
      frame: "bighat_0",
      name: "bigHatLogan",
    });
    this.griggs = new NPC({
      scene: this,
      x: 825.64,
      y: 1640,
      key: "griggs",
      frame: "griggs_1",
      name: "griggs",
    });
    this.npcs = [
      this.laurentius,
      this.crestfallenWarrior,
      this.bigHatLogan,
      this.griggs,
      this.petrus,
      this.fireKeeper,
      this.lautrec,
      // this.bird,
      // this.reah,
    ];

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
      frame: "soul_0",
      id: 1,
    });
    this.item2 = new Item({
      scene: this,
      x: 750,
      y: 1740,
      key: "soul",
      frame: "soul_0",
      id: 2,
    });
    this.items = [this.item, this.item2];

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
  //--------------------------------
  //--------------------------------

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
    camera.zoom = 1;

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

  createCombat() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.enemies,
      callback: (eventData) => {
        this.events.emit("enemyDeath", eventData.gameObjectB);
        this.enemies.forEach((enemy) => {
          enemy.setStatic(true);
        });
        this.combatScene.combatBackgroundGenerator(
          this.player.x,
          this.player.y
        );
        this.AudioScene.stopMainBgm();
        this.scene.sleep();
        this.scene.add("Loading", LoadingScene, true);
        this.scene.launch("Combat", {
          health: this.player.health,
          enemyGroup: this.enemies,
        });
      },
      context: this,
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
    this.matterCollision.addOnCollideActive({
      objectA: this.player,
      objectB: this.bonfire,
      callback: () => {
        if (this.player.inputKeys.interact.isDown) {
          this.events.emit("useBonfire");
          this.player.inputKeys.interact.reset();
        }
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
      this.items = this.items.filter((e) => e.id !== item.id);
      item.makeInactive();
      //update Soul Counter
      let prevSouls = this.player.souls;
      this.player.updateSouls(300); //currently all soulItems give a hard-coded 300 souls.
      console.log("picked up item!");
      this.events.emit("updateSouls", prevSouls, this.player.souls);
      //remove item
    });

    this.events.on("enemyDeath", (enemy) => {
      this.enemies = this.enemies.filter((e) => e.id !== enemy.id);
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

    this.uiScene.events.on("healthUpdated", (health) => {
      this.player.health = health;
    });

    //Use bonfire, reset spawns/heal/restore estus
    this.events.on("useBonfire", () => {
      console.log("Bonfire used!!");
      this.player.health = 5;
      this.player.estus = 3;
      this.events.emit("updateHealth", this.player.health, this.player.estus);
      this.enemies.forEach((enemy) => {
        enemy.enemyKilled();
      });
      this.createEnemy();
      this.createCombat();
      this.freeEnemy(this.enemies);

      // this.events.off("useBonfire");
    });
  }

  createAreaText() {
    this.areaText = this.add
      .text(525, 1700, "Firelink Shrine", {
        fontFamily: "titleFont",
        fill: "#ffffff",
        fontSize: "30px",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: this.areaText,
      alpha: { start: 0, from: 0, to: 1, duration: 2000, ease: "Linear" },
      yoyo: true,
      // loop: -1,
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

  playerWalking() {
    if (
      this.player.inputKeys.up.isDown ||
      this.player.inputKeys.down.isDown ||
      this.player.inputKeys.left.isDown ||
      this.player.inputKeys.right.isDown
    ) {
      this.player.isWalking = true;
    } else {
      this.player.isWalking = false;
    }
  }
}

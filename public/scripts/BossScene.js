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
    Enemy.preload(this);
  }

  create() {
    this.uiScene.scene.bringToTop();
    this.createMap();
    this.createOverlay();
    // this.addCollisions();  //function not set up properly
    this.playerStartPoint();
    this.createInput();
    this.createEnemy();  //New class for Andy?
    this.createCombat();
    this.setupEventListener()
    this.AudioScene.playMainBgm();
  }

  update() {
    this.player.update();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    // this.enemy.update();
  }

  //----------------------------

  playerStartPoint() {
      this.player = new Player({
        scene: this,
        x: 65,
        y: 155,
        key: "ashen_one",
        frame: "player_00",
      });
    }

  createEnemy() {
    this.enemy = new Enemy({
      scene: this,
      x: 400,
      y: 200,
      key: "skeleton_sprite",
      frame: "skele_idling0",
      id: 1,
    });
    this.enemy.setStatic(true);
    this.enemies = [this.enemy]
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

  addCollisions() {
    // grab the physics map from FULLMAP_collision.json
    let shapes = this.cache.json.get("shapes");

    let collisionLayer = this.matter.add.sprite(
      0,
      0,
      "sheet",
      "BOSSMAP_collision",
      { shape: shapes.FULLMAP_collision }
    );
    collisionLayer.setPosition(0 + 684, 0 + 1136); //manual offset for center of mass. Will have to find a better way to calculate this.
    collisionLayer.visible = false;
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
    this.player.update(this.player.anims.play("player_down"));
  }

  createCombat() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.enemies,
      callback: (eventData) => {
        this.combatScene.playerPosition(this.player.x, this.player.y);
        this.events.emit("enemyDeath", eventData.gameObjectB);
        this.enemies.forEach((enemy) => {
          enemy.setStatic(true);
        });
        this.AudioScene.stopMainBgm();
        this.scene.sleep();
        this.scene.add("Loading", LoadingScene, true);
        this.scene.launch("Combat", {
          playerHP: this.player.health, 
          enemyGroup: this.enemies,
          enemyHP: this.enemy.health,
        });
      },
      context: this,
    });
  }

  // freeEnemy(enemiesGroup) {
  //   if (enemiesGroup) {
  //     this.events.on("wake", function (sys, data) {
  //       let { gameOver } = data;
  //       if (gameOver) {
  //         this.enemyTimer = sys.time.addEvent({
  //           delay: 1000,
  //           callback: () => {
  //             enemiesGroup.forEach((enemy) => {
  //               if (enemy.active) {
  //                 enemy.setStatic(false); //set it's static to false if enemy is still active (not killed)
  //               }
  //             });
  //           },
  //           callbackScope: sys,
  //         });
  //       }
  //     });
  //   }
  // }

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

    this.combatScene.events.on("enemySoulGet", () => {
      let prevSouls = this.player.souls;
      this.player.updateSouls(100); //all enemies are hardcoded 100 souls
      this.events.emit("updateSouls", prevSouls, this.player.souls);
    })

    this.events.on("enemyDeath", (enemy) => {
      this.enemies = this.enemies.filter((e) => e.id !== enemy.id);
      enemy.enemyKilled();
      this.cameras.main.flash(300).shake(300);
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
      this.bonfireFX();
      this.AudioScene.playBonfire();
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

    this.events.on("useWell", () => {
      this.AudioScene.playHeavenly();
      this.wellEasterEgg();
    });

    this.events.on("bossTrigger", () => {
      if (this.player.souls >= 1000) {
        let prevSouls = this.player.souls;
        this.player.souls -= 1000;
        this.events.emit("updateSouls", prevSouls, this.player.souls);
        this.AudioScene.stopMainBgm();
        this.scene.sleep();
        this.scene.add("Loading", LoadingScene, true);
        this.scene.launch("Boss", {
          player: this.player,
        });
      } else {
        console.log("Not enough souls?")
      }
    })
  }
}
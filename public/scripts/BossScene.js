class BossScene extends Phaser.Scene {
  constructor() {
    super("Boss");
  }

  init(data) {
    let { player } = data;
    this.oldPlayer = player;
    this.scene.moveAbove("Game");
    //references to other scenes for event listening
    this.uiScene = this.scene.get("Ui");
    this.combatScene = this.scene.get("Combat");
    this.AudioScene = this.scene.get("Audio");
    this.BossLoadingScene = this.scene.get("BossLoading");
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.createMap();
    this.createOverlay();
    //Collision sprite does not work for this map
    this.playerStartPoint();
    this.createInput();
    
    this.createBoss();
    this.createCombat();

    this.OverlayLayer.setDepth(2239);
  }

  update() {
    this.player.update();
    this.boss.update();
  }

  //--------------SPRITE CREATION----------------------

  playerStartPoint() {
    this.player = new Player({
      scene: this,
      x: 65,
      y: 155,
      key: "ashen_one",
      frame: "player_00",
    });
    this.player.health = this.oldPlayer.health;
    this.player.souls = this.oldPlayer.souls;
    this.player.estus = this.oldPlayer.estus;
    this.player.setDepth(3);
  }

  createBoss() {
    this.boss = new Boss({
      scene: this,
      x: 375,
      y: 75,
      key: "andy",
      id: 1,
    });
    this.boss.setStatic(true);
    this.boss.setDepth(2);
  }
//---------------------------------------------------
//---------------------------------------------------


//---------------------MAP CREATION-------------------
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
    this.OverlayLayer = map.createLayer(
      "boss_overlay",
      this.tilesOverlay,
      0,
      0
    );
  }
//---------------------------------------------------
//---------------------------------------------------

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

    camera.fadeIn(1000);
    this.player.update(this.player.anims.play("player_down"));
  }
//---------------------------------------------------
//---------------------------------------------------

  //Collision detection for Andy
  createCombat() {
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.boss,
      callback: () => {
        this.combatScene.playerPosition(this.player.x, this.player.y);
        this.boss.bossKilled();
        this.AudioScene.stopBossRoom();
        this.scene.sleep();
        //loads Boss cutscene
        this.scene.add("BossLoading", BossLoadingScene, true);
        //Loads boss combat
        this.scene.launch("BossCombat", {
          playerHP: this.player.health,
          enemiesGroup: [this.boss],
          enemyHP: this.boss.health,
        });
      },
      context: this,
    });
  }
}

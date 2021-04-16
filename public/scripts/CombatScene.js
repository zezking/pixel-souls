class CombatScene extends Phaser.Scene {
  constructor() {
    super("Combat");
  }

  init(data) {
    let { health } = data;
    this.playerHealth = health;
    this.enemyHealth = 3;
    this.input.enabled = false;
    this.AudioScene = this.scene.get("Audio");

    console.log("(inside combat)Health from player: ", this.playerHealth);
    console.log("(inside combat)Health of enemy: ", this.enemyHealth);
  }

  preload() {
    Enemy.preload(this);
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.setupCombatUi();
    this.resultListener();
    this.createCombatPlayer();
    // this.bothHurt();
    // this.enemyHurt();
    // this.playerHurt();
    this.drawCombatUIBackground();
    this.createCombatSkeleton();
    this.disableClickTimer();
    this.createCombatPlayer();
    this.generateCombatMap();

    this.combatBackgroundGenerator();

    this.AudioScene.playBattleBgm();
  }
  setupCombatUi() {
    this.sword = this.make
      .image({ x: 200, y: 640, key: "sword", add: true })
      .setDepth(100);
    this.sword.setInteractive();
    this.magic = this.make
      .image({ x: 400, y: 640, key: "magic", add: true })
      .setDepth(100);
    this.magic.setInteractive();
    this.shield = this.make
      .image({ x: 600, y: 640, key: "shield", add: true })
      .setDepth(100);
    this.shield.setInteractive();

    const aiResult = () => {
      let aiLogic = Math.random();
      if (aiLogic < 0.34) {
        return "sword";
      } else if (aiLogic <= 0.67) {
        return "magic";
      } else {
        return "shield";
      }
    };

    this.sword.on("pointerdown", () => {
      this.result = this.checkWinner("sword", aiResult());
      this.events.emit("results", this.result);
    });
    this.magic.on("pointerdown", () => {
      this.result = this.checkWinner("magic", aiResult());
      this.events.emit("results", this.result);
    });
    this.shield.on("pointerdown", () => {
      this.result = this.checkWinner("shield", aiResult());
      this.events.emit("results", this.result);
    });

    //enemy hearts
    this.enemyHearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    this.enemyHearts.createMultiple({
      key: "ui-heart-full",
      setXY: { x: 615, y: 325, stepX: 40 },
      quantity: 3,
    });
  }

  //Sword > Magic > Shield > Sword...  :)
  checkWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
      return ["draw", "same"];
    }

    if (playerChoice === "sword") {
      if (aiChoice === "magic") {
        return ["player", "magic"];
      } else {
        return ["enemy", "magic"];
      }
    }

    if (playerChoice === "magic") {
      if (aiChoice === "shield") {
        return ["player", "shield"];
      } else {
        return ["enemy", "shield"];
      }
    }
    if (playerChoice === "shield") {
      if (aiChoice === "sword") {
        return ["player", "sword"];
      } else {
        return ["enemy", "sword"];
      }
    }
  }

  resultListener() {
    this.events.on("results", () => {
      let winner = this.result[0];
      let enemyChoice = this.result[1];

      switch (winner) {
        case "draw":
          console.log("winner: ", winner, "Enemy chose: ", enemyChoice);
          this.playerHealth -= 1;
          this.enemyHealth -= 1;
          this.playerHurt();
          this.enemyHurt();
          this.cameras.main.flash(300).shake(300);
          this.healthChecker();
          break;
        case "enemy":
          console.log("winner: ", winner, "Enemy chose: ", enemyChoice);
          this.playerHealth -= 1;
          this.playerHurt();
          this.cameras.main.flash(300).shake(300);
          this.healthChecker();
          break;
        case "player":
          console.log("winner: ", winner, "Enemy chose: ", enemyChoice);
          this.enemyHealth -= 1;
          this.enemyHurt();
          this.cameras.main.flash(300).shake(300);
          this.healthChecker();
          break;
      }
    });
  }

  healthChecker() {
    console.log("new player health: ", this.playerHealth);
    console.log("Enemy health remaining: ", this.enemyHealth);

    if (this.playerHealth <= 0) {
      this.AudioScene.stopBattleBgm();
      this.AudioScene.stopMainBgm();
      this.events.off("pointerdown");
      this.events.off("results");
      this.scene.start("Death");

      // added this incase both Player and Enemy die on a draw
    } else if (this.playerHealth <= 0 && this.enemyHealth <= 0) {
      this.AudioScene.stopBattleBgm();
      this.AudioScene.playMainBgm();
      this.events.off("pointerdown");
      this.events.off("results");

      this.scene.start("Death");
    } else if (this.enemyHealth <= 0) {
      this.AudioScene.stopBattleBgm();
      this.AudioScene.playMainBgm();
      this.events.emit("updateHealth", this.playerHealth);
      this.events.off("results");
      this.scene.stop("Combat");
      this.scene.wake("Game", { gameOver: true, playback: this.mainBGM }); //pass a game status to the Game Scene

    }

    this.events.emit("updateHealth", this.playerHealth);

    //Update enemy's health
    this.enemyHearts.children.each((gameObj, index) => {
      const heart = gameObj;
      if (index < this.enemyHealth) {
        heart.setTexture("ui-heart-full");
      } else {
        heart.setTexture("ui-heart-empty");
      }
    });
  }

  update() {
    this.enemyCombat.update();
  }

  createCombatPlayer() {
    this.combatPlayer = this.make
      .image({
        x: 200,
        y: 500,
        key: "PLAYERBACK",
        scale: {
          x: 12,
          y: 12,
        },
        add: true,
      })
      .setDepth(1);
  }
  createCombatSkeleton() {
    this.enemyCombat = new Enemy({
      scene: this,
      x: 650,
      y: 150,
      key: "skeleton_sprite",
      frame: "skele_idling8",
      id: 5,
    })
      .setDepth(400)
      .setScale(8);
  }

  playerHurt() {
    this.player_hurt = this.make
      .image({
        x: 200,
        y: 400,
        key: "player_hurt",
        scale: {
          x: 5,
          y: 5,
        },
        add: true,
      })
      .setDepth(1)
      .setAlpha(0);
    this.tweens.add({
      targets: this.player_hurt,
      alpha: { start: 0, from: 0, to: 1, duration: 600, ease: "Linear" },
      yoyo: true,
    });
  }

  enemyHurt() {
    this.enemy_hurt = this.make
      .image({
        x: 600,
        y: 100,
        key: "enemy_hurt",
        scale: {
          x: 5,
          y: 5,
        },
        add: true,
      })
      .setDepth(401)
      .setAlpha(0);
    this.tweens.add({
      targets: this.enemy_hurt,
      alpha: { start: 0, from: 0, to: 1, duration: 600, ease: "Linear" },
      yoyo: true,
    });
  }

  drawCombatUIBackground() {
    this.combatPlayer = this.make
      .image({
        x: 400,
        y: 640,
        key: "ui_background",
        scale: {
          x: 0.6,
          y: 0.5,
        },
        add: true,
      })
      .setDepth(2);
  }

  disableClickTimer() {
    this.disableClick = this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.input.enabled = true;
      },
    });
  }

  combatBackgroundGenerator() {
    this.mapCombat = this.make
      .image({
        key: "combat_background",
        x: this.combatMapX,
        y: this.combatMapY,
      })
      .setDepth(0)
      .setScale(4);
  }

  generateCombatMap() {
    //tiles combatMap
    if (
      this.playerX >= 665 &&
      this.playerX <= 1110 &&
      this.playerY >= 760 &&
      this.playerY <= 1257
    ) {
      this.combatMapX = this.scale.width - 865;
      this.combatMapY = this.scale.height;
      return;
    }
    //carpet combatMap
    if (
      this.playerX >= 361 &&
      this.playerX <= 597 &&
      this.playerY >= 650 &&
      this.playerY <= 1221
    ) {
      this.combatMapX = this.scale.width + 260;
      this.combatMapY = this.scale.height;
      return;
    }
    //cementary combatMap
    if (
      this.playerX >= 60 &&
      this.playerX <= 488 &&
      this.playerY >= 278 &&
      this.playerY <= 517
    ) {
      this.combatMapX = this.scale.width + 1600;
      this.combatMapY = this.scale.height + 1800;
      return;
    }

    this.combatMapX = this.scale.width;
    this.combatMapY = this.scale.height - 1700;
    return;
  }

  playerPosition(playerX, playerY) {
    this.playerX = playerX;
    this.playerY = playerY;
  }
}

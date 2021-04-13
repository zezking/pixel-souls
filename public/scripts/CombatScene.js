class CombatScene extends Phaser.Scene {
  constructor() {
    super("Combat");
    this.enemyHealth = 1;
  }

  /** Big problem. Can't update the enemy that's on GameScene, because its asleep. Enemy initiates combat with player immediately after combat ends, Event listened to destroy enemy is not being read by GameScene from this scene. brain turning to mush. it time to sleep and try again tomorrow. */

  init(data) {
    let { health, enemy } = data;
    this.playerHealth = health;
    this.enemyid = enemy;
    console.log("Carried-over data?: ", this.playerHealth, this.enemyid);
    console.log("THIS: ", this);
  }

  create() {
    this.setupCombatUi();
    this.resultListener();
  }

  setupCombatUi() {
    this.sword = this.add.image(200, 600, "sword");
    this.sword.setInteractive();
    this.magic = this.add.image(400, 600, "magic");
    this.magic.setInteractive();
    this.shield = this.add.image(600, 600, "shield");
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
          this.healthChecker();
          break;
        case "enemy":
          console.log("winner: ", winner, "Enemy chose: ", enemyChoice);
          this.playerHealth -= 1;
          this.healthChecker();
          break;
        case "player":
          console.log("winner: ", winner, "Enemy chose: ", enemyChoice);
          this.enemyHealth -= 1;
          this.healthChecker();
          break;
      }
    });
  }

  healthChecker() {
    console.log("new player health: ", this.playerHealth);

    if (this.playerHealth <= 0) {
      this.events.off("pointerdown");
      this.events.off("results");
      this.events.off("pickupItem");
      this.scene.stop("Game");
      this.scene.start("Death");
    }
    if (this.enemyHealth <= 0) {
      this.events.off("results");
      this.events.emit("enemyDeath", this.enemyid);
      this.scene.wake("Game");
      this.scene.stop("Combat");
    }
  }

  // update() {

  // }
}

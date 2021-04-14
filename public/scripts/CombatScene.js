class CombatScene extends Phaser.Scene {
  constructor() {
    super("Combat");
  }

  init(data) {
    let { health } = data;
    this.playerHealth = health;
    this.enemyHealth = 2;
    console.log("(inside combat)Health from player: ", this.playerHealth);
    console.log("(inside combat)Health of enemy: ", this.enemyHealth);
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.setupCombatUi();
    this.resultListener();

    this.mainBGM = this.sound.add("bg-music", {
      volume: 0.04,
    });
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
    console.log("Enemy health remaining: ", this.enemyHealth);

    if (this.playerHealth <= 0) {
      this.events.removeAllListeners();
      // this.events.off("pointerdown");
      // this.events.off("results");
      // this.events.off("pickupItem");
      // this.scene.stop("Game");
      this.scene.start("Death");
    }

    if (this.enemyHealth <= 0) {
      console.log(this.mainBGM);
      this.events.emit("updateHealth", this.playerHealth);
      this.events.off("results");
      this.scene.stop("Combat");
      this.scene.wake("Game", { gameOver: true, playback: this.mainBGM }); //pass a game status to the Game Scene
    }

    this.events.emit("updateHealth", this.playerHealth);
  }

  // update() {

  // }
}

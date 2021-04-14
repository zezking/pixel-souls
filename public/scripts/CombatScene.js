class CombatScene extends Phaser.Scene {
  constructor() {
    super("Combat");
  }

  init(data) {
    let { health } = data;
    this.playerHealth = health;
    this.enemyHealth = 3;

    console.log("(inside combat)Health from player: ", this.playerHealth);
    console.log("(inside combat)Health of enemy: ", this.enemyHealth);
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.setupCombatUi();
    this.resultListener();
    this.createCombatPlayer();
    this.drawCombatUIBackground();
    this.createCombatSkeleton();
    this.mainBGM = this.sound.add("bg-music", {
      volume: 0.04,
    });
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
      this.events.off("pointerdown");
      this.events.off("results");
      this.scene.start("Death");
      // added this incase both Player and Enemy die on a draw
    } else if (this.playerHealth <= 0 && this.enemyHealth <= 0){
      this.events.off("pointerdown");
      this.events.off("results");
      this.scene.start("Death");
    } else if (this.enemyHealth <= 0) {
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
      .setDepth(0);
  }
  createCombatSkeleton() {
    this.CombatSkeleton = this.make
      .image({
        x: 650,
        y: 150,
        key: "skeleton_battle",
        scale: {
          x: 7,
          y: 7,
        },
        add: true,
      })
      .setDepth(3);
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
      .setDepth(1);
  }
}

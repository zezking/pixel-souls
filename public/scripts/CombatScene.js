class CombatScene extends Phaser.Scene {

  constructor(data) {
    super("Combat");
    this.playerHealth = data;
    this.enemyHealth = 1; 
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
      if (aiLogic < .34) {
        return "sword";
      } else if (aiLogic <= .67) {
        return "magic";
      } else {
        return "shield";
      }
    };

    this.sword.on('pointerdown', () => {
      this.result = this.checkWinner("sword", aiResult());
      this.events.emit("results", this.result);
    });
    this.magic.on('pointerdown', () => {
      this.result = this.checkWinner("magic", aiResult());
      this.events.emit("results", this.result);
    });
    this.shield.on('pointerdown', () => {
      this.result = this.checkWinner("shield", aiResult());
      this.events.emit("results", this.result);
    });
  }

  //Sword > Magic > Shield > Sword...  :)
  checkWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
      return ["draw"];
    };

    if (playerChoice === "sword") {
      if (aiChoice === "magic") {
        return ["player", "magic"];
      } else {
        return ["enemy", "magic"];
      };
    };

    if (playerChoice === "magic") {
      if (aiChoice === "shield") {
        return ["player", "shield"];
      } else {
        return ["enemy", "shield"];
      };
    };
    if (playerChoice === "shield") {
      if (aiChoice === "sword") {
        return ["player", "sword"];
      } else {
        return ["enemy", "sword"];
      };
    };
  }
  
  resultListener() {
    this.events.on("results", () => {
      let winner = this.result[0];
      let enemyChoice = this.result[1];

      switch (winner) {
        case "draw":
          console.log("Enemy chose: ", enemyChoice);
          break;
        case "enemy":
          console.log("Enemy chose: ", enemyChoice);
          break;
        case "player":
          console.log("Enemy chose: ", enemyChoice);
          break;
      }
    })
  }

  // update() {

  // }

}
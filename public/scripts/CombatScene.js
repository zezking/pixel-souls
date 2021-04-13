class CombatScene extends Phaser.Scene {

  constructor(data) {
    super("Combat");
    // let { playerHealth } = data;
    this.enemyHealth = 1; 
  }
  create() {
    this.setupCombatUi();
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
      let result = this.checkWinner("sword", aiResult());
      console.log(result);
    });
    this.magic.on('pointerdown', () => {
      let result = this.checkWinner("magic", aiResult());
      console.log(result);
    });
    this.shield.on('pointerdown', () => {
      let result = this.checkWinner("shield", aiResult());
      console.log(result);
    });
  }

  //Sword > Magic > Shield > Sword...  :)
  checkWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
      return "draw";
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
  

  update() {

  }

}
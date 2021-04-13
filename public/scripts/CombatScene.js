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
      this.checkWinner("sword", aiResult());
    });
    this.magic.on('pointerdown', () => {
      this.checkWinner("magic", aiResult());
    });
    this.shield.on('pointerdown', () => {
      this.checkWinner("shield", aiResult());
    });
  }

  //Sword > Magic > Shield > Sword...  :)
  checkWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
      return "draw";
    };

    if (playerChoice === "sword") {
      if (aiChoice === "magic") {
        return "player";
      } else {
        return "enemy";
      };
    };

    if (playerChoice === "magic") {
      if (aiChoice === "shield") {
        return "player";
      } else {
        return "enemy";
      };
    };
    if (playerChoice === "shield") {
      if (aiChoice === "sword") {
        return "player";
      } else {
        return "enemy";
      };
    };
  }
  

  update() {

  }

}
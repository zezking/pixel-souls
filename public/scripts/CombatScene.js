class CombatScene extends Phaser.Scene {

  constructor() {
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

    this.sword.on('pointerdown', () => {
      console.log("Sword!");
    });
    this.magic.on('pointerdown', () => {
      console.log("Magic!");
    });
    this.shield.on('pointerdown', () => {
      console.log("shield!");
    });
  }

  
  

  update() {

  }

}
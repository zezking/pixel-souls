class Combat {

  constructor(data) {
    let { playerHealth } = data;
    this.enemyHealth = 1; 
  }
  create() {

  }

  setupCombatUi() {
    this.sword = this.add.image('');
    this.sword.setInteractive();
    this.magic = this.add.image('');
    this.magic.setInteractive();
    this.shield = this.add.image('');
    this.shield.setInteractive();

    
  }


  update() {

  }

}
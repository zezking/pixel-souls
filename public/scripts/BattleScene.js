class BattleScene extends Phaser.Scene {
    constructor() {
      super('Battle');
    }
    
    prelaod(){

  
    }
    create() {

        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'BattleScene', { fontSize: '64px', fill: '#fff' });
        this.titleText.setOrigin(0.5);
 
    }

  }
  
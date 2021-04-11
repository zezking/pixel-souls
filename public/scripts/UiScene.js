class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference to the game scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    // this.setupUiElements();
    // this.setupEvents();
  }

  setupUiElements() {
    // create the soul text game object
    this.soulText = this.add.text(35, 8, '0 Souls', { fontSize: '16px', fill: '#fff' });
  //   // creaet coin icon
  //   this.coinIcon = this.add.image(15, 15, 'items', 3);
  }

  setupEvents() {
    // listen for the updateScore event from the game scene
    // this.gameScene.events.on('updateScore', (score) => {
    //   this.scoreText.setText(`Coins: ${score}`);
    // });
  }
}
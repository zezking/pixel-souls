class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference to the game scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    // this.setupEvents();
  }

  setupUiElements() {
    //Health hearts
    const hearts = this.add.group({
      classType: Phaser.GameObjects.Image
    });
    hearts.createMultiple({
      key: "ui-heart-full",
      setXY: { x: 20, y: 20, stepX: 40 },
      quantity: 5
    })
    //Soul counter
    this.soulCounter = this.add.image(725, 770, "soul-counter");
    this.soulText = this.add.text(725, 762, '0', { fontSize: '16px', fill: '#fff' });
  //   // creaet coin icon
  //   this.coinIcon = this.add.image(15, 15, 'items', 3);
  }

  setupEvents() {
    // listen for the updateScore event from the game scene
    this.gameScene.events.on('updateSouls', (score) => {
      this.soulText.setText(`${score}`);
    });
  }
}
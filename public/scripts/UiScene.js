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
    this.setupEvents();
  }

  setupUiElements() {
    //Health Hearts
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image
    });
    this.hearts.createMultiple({
      key: "ui-heart-full",
      setXY: { x: 20, y: 20, stepX: 40 },
      quantity: 5
    });

    //Soul Counter
    this.soulCounter = this.add.image(725, 770, "soul-counter");
    this.soulText = this.add.text(0, 0, '0', { fontSize: '16px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.soulText, this.soulCounter);

    // Estus Count
    // --goes here--
  }

  setupEvents() {
    // listen for the updateSouls event from the game scene
    this.gameScene.events.on('updateSouls', (prevSouls, newSouls) => {
      this.soulText.setText(`${newSouls}`);
    });
    // listen for healthCount event?
    // this.gameScene.events.on('updateHealth', (count) => {
    //   this.hearts.children.each((gameObj, index) => {
    //     const heart = gameObj;
    //     if (index < health) {
    //       heart.setTexture("ui-heart-full")
    //     } else {
    //       heart.setTexture("ui-heart-empty")
    //     };
    //   })
    // })
  }
}
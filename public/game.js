const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
  ],
  // zoom: 3,
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin,
      key: "matterCollision",
      mapping: "matterCollision",
    }]
  }
};


const game = new Phaser.Game(config);
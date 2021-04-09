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
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
};


const game = new Phaser.Game(config);
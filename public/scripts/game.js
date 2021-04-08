const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 2240,
  scene: {
    TitleScene,
    BootScene,
    GameScene,
    // UiScene,
  },
  // zoom: 3,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
    },
  },
};
const game = new Phaser.Game(config);

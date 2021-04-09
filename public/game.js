
const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    // UiScene,
  ],
  // zoom: 3,
  // pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: {y: 0},

    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision'
      }
    ]
  }

};

// new Phaser.Game(config);
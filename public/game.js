
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

<<<<<<< HEAD
// new Phaser.Game(config);
=======

const game = new Phaser.Game(config);
>>>>>>> 8ab4c9713e3fe7d936cc359cb7a4f1f455d8d3fd

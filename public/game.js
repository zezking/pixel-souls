const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
    LogoScene,
    CombatScene,
    DeathScene,
  ],
  // zoom: 2,
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
      plugins: {
        attractors: true,
      },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};

const game = new Phaser.Game(config);

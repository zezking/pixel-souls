const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  scene: [
    BootScene,
    TitleScene,
    // GameScene,   //Disabled, but here as a reminder to where it needs to sit on this list.
    BossScene,
    UiScene,
    LogoScene,
    CombatScene,
    DeathScene,
    AudioScene,
  ],
  // zoom: 2,
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
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

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  scene: [
    BootScene,
    TitleScene,
    //These ones are disabled, but here as a reminder to where it needs to sit on this list:
    // GameScene,
    // BossScene,
    UiScene,
    LogoScene,
    CombatScene,
    BossCombatScene,
    DeathScene,
    AudioScene,
    CombatPromptScene,
  ],
  // zoom: 2,
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
      debug: true, // set to true to view collision boxes
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
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
};

const game = new Phaser.Game(config);

class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
  }

  prelaod() {}
  create() {
    this.scene.add("");
    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "YOU DIED",
      { fontSize: "64px", fill: "#fff" }
    );
  }
}

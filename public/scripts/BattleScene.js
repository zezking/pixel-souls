class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
  }

  prelaod() {}

  create() {
    let camera = this.cameras.main;
    // Transition fade effect
    camera.fade(1000);
    camera.fadeIn(1000);
    camera.flash(2000);

    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "YOU DIED",
      { fontSize: "64px", fill: "#fff" }
    );
  }


}

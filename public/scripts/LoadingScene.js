class LoadingScene extends Phaser.Scene {
  constructor() {
    super("Loading");
  }

  init() {}

  create() {
    this.cameras.main.flash(300).shake(300).fadeIn(1000);

    this.scene.bringToTop();
    this.createBonFire();
    this.createLoadingText();

    let rect = new Phaser.Geom.Rectangle(0, 0, 1000, 1000);
    var graphics = this.add
      .graphics({
        fillStyle: { color: "#000000" },
      })
      .setDepth(0);

    graphics.fillRectShape(rect);
  }

  createBonFire() {
    this.bonfire = this.make
      .image({
        x: 180,
        y: this.scale.height / 2 + 200,
        key: "bonfire",
        scale: { x: 3, y: 3 },
        add: true,
      })
      .setDepth(300);
    this.tweens.add({
      targets: this.bonfire,
      completeDelay: 3000,
      onComplete: () => {
        this.scene.remove("Loading");
      },
    });
  }

  createLoadingText() {
    this.LoadingText = this.add
      .text(125, 680, "Loading", {
        fontFamily: "titleFont",
        fontSize: "30px",
        fill: "#ffffff",
      })
      .setAlpha(0)
      .setDepth(300);

    this.tweens.add({
      targets: this.LoadingText,
      alpha: { value: 1, duration: 500, ease: "Linear" },
      yoyo: true,
      loop: -1,
    });
  }
}

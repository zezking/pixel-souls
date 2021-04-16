class LogoScene extends Phaser.Scene {
  constructor() {
    super("");
  }

  create() {
    this.logoEffects();
    this.productionTextEffects();
  }

  logoEffects() {
    this.logo = this.add.image(380, 400, "logo");
    this.tweens.add({
      targets: this.logo,
      alpha: {
        start: 1,
        from: 1,
        to: 0,
        delay: 3000,
        duration: 3000,
        ease: "Linear",
      },
    });
  }

  productionTextEffects() {
    this.productionText = this.add
      .text(210, 470, "two and a half asians presents", {
        fontFamily: "titleFont",
        fontSize: "26px",
        fill: "#ffffff",
      })
      .setAlpha(0);

    this.tweens.add({
      targets: this.productionText,
      alpha: {
        start: 1,
        from: 1,
        to: 0,
        delay: 3000,
        duration: 3000,
        ease: "Linear",
      },
      onComplete: () => {
        this.scene.start("Title");
      },
    });
  }
}

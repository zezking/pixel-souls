class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    //change the volume between 0 and 1
    this.menuBGM = this.sound.add("menu-music", {
      volume: 0.04,
    });
    //change the startMenue sond between 0 and 1
    this.startMenuSound = this.sound.add("start-menu", {
      volume: 0.04,
    });
    this.logoDetail = this.make
      .image({
        x: 413,
        y: 398,
        key: "logoDetail",
        scale: {
          x: 1.1,
          y: 1.1,
        },
        add: true,
      })
      .setDepth(2);
    this.titleStrokeThickness = 40;
    this.titleFontSize = 150;
    this.titleText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "PIXEL  SOULS", {
        fontFamily: "titleFont",
        fill: "#ffffff",
      })
      .setStroke("#fff", this.titleStrokeThickness)
      .setFontSize(this.titleFontSize);
    this.tweens.add({
      targets: this.logoDetail,
      alpha: {
        start: 0,
        from: 0,
        to: 1,
        delay: 1000,
        duration: 1000,
        ease: "Linear",
      },
    });
    this.titleText.setOrigin(0.5);
    this.startText = this.add
      .text(250, this.scale.height / 2 + 200, "Press any key to start", {
        fontFamily: "titleFont",
        fontSize: "30px",
        fill: "#ffffff",
      })
      .setAlpha(0);
    this.tweens.add({
      targets: this.startText,
      alpha: { value: 1, duration: 1100, ease: "Linear" },
      yoyo: true,
      loop: -1,
    });

    this.tweens.add({
      targets: this.titleText.style,
      strokeThickness: { value: 1, duration: 1100, ease: "Linear" },
    });

    this.input.keyboard.on("keydown", () => {
      // this.menuBGM.stop();
      // this.startMenuSound.play();
      this.scene.start("Game");
    });

    // this.menuBGM.play();
  }
  update() {
    if (this.titleStrokeThickness > -1) {
      this.titleText
        .setStroke("#ffffff", this.titleStrokeThickness--)
        .setFontSize(this.titleFontSize--)
        .setDepth(0);
    }
  }
}

class LogoScene extends Phaser.Scene {
  constructor() {
    super("Logo");
  }

  create() {
    this.logo = this.add.image(380, 400, "logo");

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

    this.callbacks = { onComplete: true };
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
}

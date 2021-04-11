class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    // create title text

    // this.logo=this.add.image()
    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "Pixel Souls",
      { fontFamily: "titleFont", fontSize: "150px", fill: "#ffffff" }
    );
    this.titleText.setOrigin(0.5);
    // this.titleText.alpha = 0;
    // this.add
    //   .tween(this.titleText)
    //   .to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    // create the Play game button

    this.startText = this.add
      .text(250, this.scale.height / 2 + 200, "Press any key to start", {
        fontFamily: "titleFont",
        fontSize: "30px",
        fill: "#ffffff",
      })
      .setAlpha(0);

    this.tweens.add({
      targets: this.startText,
      alpha: { value: 2, duration: 1100, ease: "Power1" },
      yoyo: true,
      loop: -1,
    });

    this.input.keyboard.on("keydown", () => {
      this.scene.start("Game");
    });
    //   this.startGameButton = new UiButton(
    //     this,
    //     this.scale.width / 2,
    //     this.scale.height * 0.65,
    //     "button1",
    //     "button2",
    //     "Start",
    //     this.startScene.bind(this, "Game")
    //   );
  }
  update() {
    // this.add.tween(this.startText).to({ alpha: 1 }, 2000, "Linear", true);
    // this.add.tween(this.startText).to({ alpha: 0 }, 2000, "Linear", true);
  }
  startScene(targetScene) {
    // this.scene.start(targetScene);
  }
}

class LogoScene extends Phaser.Scene {
  constructor() {
    super("Logo");
  }
}

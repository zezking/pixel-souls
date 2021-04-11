let titleStrokeThickness = 40;
let titleFontSize = 200;
class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    // create title text

    // this.logo=this.add.image()
    this.titleText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Pixel Souls", {
        fontFamily: "titleFont",
        fontSize: 150,
        fill: "#ffffff",
      })
      .setStroke("#fff", titleStrokeThickness)
      .setFontSize(200);

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
    if (titleStrokeThickness > -1) {
      this.titleText
        .setStroke("#ffffff", titleStrokeThickness--)
        .setFontSize(titleFontSize--);
    }
  }
  startScene(targetScene) {
    // this.scene.start(targetScene);
  }
}

// class LogoScene extends Phaser.Scene {
//   constructor() {
//     super("Logo");
//   }

//   create() {}
// }

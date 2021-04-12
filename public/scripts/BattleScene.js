let deathStrokeThickness = 50;
let deathFontSize = 40;

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
    camera.flash(1000);

    // create title text

    // this.logo=this.add.image()
    this.deathText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "YOU DIED", {
        fontFamily: "titleFont",
        fill: "#ff0000",
      })
      .setFontSize(deathFontSize);
    this.deathText.setOrigin(0.5);

    this.tweens.add({
      targets: this.deathText,
      alpha: {
        start: 1,
        from: 1,
        to: 0,
        delay: 2000,
        duration: 2000,
        ease: "Linear",
      },
      completeDelay: 5000, //it will only fire after animation is completed AND after this number of seconds
      onComplete: () => {
        //This is a callback function that will only fire after the animation is completed

        this.scene.sleep("Ui");
        this.scene.start("Title");
      },
    });

    // time to end and return to Title
    // this.dialogsTimer = this.time.addEvent({
    //   delay: 5000,
    //   callback: () => {
    //     // this.scene.remove("Battle");
    //     this.scene.start("Title");
    //   },
    // });

    // Title frozen if Pressing directly to title, and too soon
    this.input.keyboard.on("keydown", () => {
      this.scene.sleep("Ui");
      this.scene.start("Title");
    });
  }

  update() {
    if (deathFontSize < 120) {
      this.deathText.setFontSize(deathFontSize++);
    }
  }
}

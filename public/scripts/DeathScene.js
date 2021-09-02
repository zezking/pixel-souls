class DeathScene extends Phaser.Scene {
  constructor() {
    super("Death");
  }

  preload() {}

  create() {
    // let ee = this.scene.events;
    this.UIScene = this.scene.get("Ui");
    this.deathStrokeThickness = 50;
    this.deathFontSize = 40;
    let rect = new Phaser.Geom.Rectangle(0, 0, 1000, 1000);
    var graphics = this.add
      .graphics({
        fillStyle: { color: "#000000" },
      })
      .setDepth(0);

    graphics.fillRectShape(rect);
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
      .setFontSize(this.deathFontSize);
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
      completeDelay: 4000, //it will only fire after animation is completed AND after this number of seconds
      onComplete: () => {
        //This is a callback function that will only fire after the animation is completed

        this.scene.stop("Ui");
        this.scene.start("Title");
      },
    });

    this.startText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 200,
        "Press E to restart",
        {
          fontFamily: "titleFont",
          fontSize: "30px",
          fill: "#ffffff",
        }
      )
      .setAlpha(0);
    this.tweens.add({
      targets: this.startText,
      alpha: { value: 1, duration: 1100, ease: "Linear" },
      yoyo: true,
      loop: -1,
    });
    this.startText.setOrigin(0.5);

    // Title frozen if Pressing directly to title, and too soon

    this.input.keyboard.on("keydown-E", () => {
      this.scene.stop("Ui");
      this.scene.start("Title");
    });

    this.deathAudio();
    this.deathBGM.play();
  }

  deathAudio() {
    this.deathBGM = this.sound.add("died-audio", {
      volume: 0.05,
    });
  }

  update() {
    if (this.deathFontSize < 120) {
      this.deathText.setFontSize(this.deathFontSize++);
    }
  }
}

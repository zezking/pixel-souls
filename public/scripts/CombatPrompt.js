class CombatPromptScene extends Phaser.Scene {
  constructor() {
    super("Prompt");
  }

  displayWinLoseDraw(scene, msg) {
    //create player damage text
    if (msg === "enemy") {
      scene.damageText = scene.add
        .text(this.scale.width / 2 - 220, this.scale.width / 2 - 250, "HP -1", {
          fontFamily: "HonokaMincho",
          fontSize: "40px",
        })
        .setDepth(501);
      //create player damage heart
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 - 220,
          y: this.scale.width / 2 - 340,
          add: true,
        })
        .setDepth(500);
      //show player damage text
      scene.tweens.add({
        targets: scene.damageText,
        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 3000,
          ease: "Cubic",
        },
      });
      //show player damage heart
      scene.tweens.add({
        targets: scene.damageHeart,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 2300,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,
        y: {
          from: this.scale.height / 2 - 90,
          to: this.scale.height / 2 - 120,
        },
        duration: 2500,
      });
      return;
    }
    //display enemy damange
    if (msg === "player") {
      scene.damageText = scene.add
        .text(this.scale.width / 2 + 70, this.scale.height / 2 - 300, "HP -1", {
          fontFamily: "HonokaMincho",
          fontSize: "40px",
        })
        .setDepth(501);
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 + 250,
          y: this.scale.height / 2 - 300,
          add: true,
        })
        .setDepth(500);

      scene.tweens.add({
        targets: scene.damageText,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 3000,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 2300,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,
        y: {
          from: this.scale.height / 2 - 300,
          to: this.scale.height / 2 - 340,
        },
        duration: 2500,
      });
      return;
    }

    scene.damageHeart1 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 - 220,
        y: this.scale.height / 2 - 0,
        add: true,
      })
      .setDepth(500);

    scene.damageText1 = scene.add
      .text(this.scale.width / 2 - 220, this.scale.width / 2 - 250, "HP -1", {
        fontFamily: "HonokaMincho",
        fontSize: "40px",
      })
      .setDepth(501);

    scene.damageHeart2 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 + 250,
        y: this.scale.height / 2 - 240,
        add: true,
      })
      .setDepth(500);
    scene.damageText2 = scene.add
      .text(this.scale.width / 2 + 70, this.scale.height / 2 - 300, "HP -1", {
        fontFamily: "HonokaMincho",
        fontSize: "40px",
      })
      .setDepth(501);

    scene.tweens.add({
      targets: scene.damageHeart1,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageText1,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageHeart1,
      y: {
        from: this.scale.height / 2 - 100,
        to: this.scale.height / 2 - 130,
      },
      duration: 2500,
    });

    scene.tweens.add({
      targets: scene.damageHeart2,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageText2,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageHeart2,
      y: {
        from: this.scale.height / 2 - 240,
        to: this.scale.height / 2 - 280,
      },
      duration: 2500,
    });
    return;
  }

  healthDecreaseEffect() {
    this.damageText = this.add.text();
  }
}

class CombatPromptScene extends Phaser.Scene {
  constructor() {
    super("Prompt");
  }

  displayWinLoseDraw(scene, msg) {
    //show player damage heart
    if (msg === "enemy") {
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 - 220,
          y: this.scale.height / 2 - 90,
          add: true,
        })
        .setDepth(500);

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
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 + 250,
          y: this.scale.height / 2 - 240,
          add: true,
        })
        .setDepth(500);

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
          from: this.scale.height / 2 - 240,
          to: this.scale.height / 2 - 280,
        },
        duration: 2500,
      });
      return;
    }

    scene.damageHeart1 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 - 220,
        y: this.scale.height / 2 - 90,
        add: true,
      })
      .setDepth(500);

    scene.damageHeart2 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 + 250,
        y: this.scale.height / 2 - 240,
        add: true,
      })
      .setDepth(500);

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
      targets: scene.damageHeart1,
      y: {
        from: this.scale.height / 2,
        to: this.scale.height / 2 - 30,
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

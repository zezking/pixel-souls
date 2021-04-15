class AudioScene extends Phaser.Scene {
  constructor() {
    super("Audio");
  }
  init() {
    this.playing = false;
  }

  playMainBgm() {
    this.mainBGM = this.sound.add("bg-music", {
      volume: 0.04,
      loop: true,
    });
    this.mainBGM.play();
  }
  stopMainBgm() {
    this.mainBGM.stop();
  }

  playBattleBgm() {
    this.battleBGM = this.sound.add("battle-audio", {
      volume: 0.04,
    });
    this.battleBGM.play();
  }
  stopBattleBgm() {
    this.battleBGM.stop();
  }

  playMenuBgm() {
    this.menuBGM = this.sound.add("menu-music", {
      volume: 0.07,
    });
    this.menuBGM.play();
    //change the startMenue sond between 0 and 1
  }
  stopMenuBgm() {
    this.menuBGM.stop();
    //change the startMenue sond between 0 and 1
  }

  playStartSFX() {
    this.startMenuSFX = this.sound.add("start-menu", {
      volume: 0.06,
    });

    this.startMenuSFX.play();
  }

  playAreaSFX() {
    this.areaSFX = this.sound.add("new-area", {
      volume: 0.04,
    });
    this.areaSFX.play();
  }

  stepSFX(scene, walking) {
    this.armorSFX = this.sound.add("armor", {
      volume: 0.04,
    });

    console.log(walking);

    scene.footsteps = scene.time.addEvent({
      duration: 500,
      repeat: -1,
      callbackScope: this,
      callback: function () {
        console.log(walking);
        if (walking) {
          console.log("here");
          this.armorSFX.play();
        }
      },
    });

    //       this.armorSFX.play();
    // scene.time.addEvent({
    //   delay: 1000,
    //   repeat: -1,
    //   callbackScope: this,
    //   callback: function () {
    //     if (keyW.isDown || keyS.isDown || keyA.isDown || keyD.isDown) {
    //       this.armorSFX.play();
    //     }
    //   },
    // });
  }
}

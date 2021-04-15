class AudioScene extends Phaser.Scene {
  constructor() {
    super("Audio");
  }
  create() {}

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
}

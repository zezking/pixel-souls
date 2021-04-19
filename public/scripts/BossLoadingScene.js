class BossLoadingScene extends Phaser.Scene {
  constructor() {
    super("BossLoading");
  }
  init() {
    this.AudioScene = this.scene.get("Audio");
  }

  create() {
    this.createBackground();
    this.playVideo();
    this.loadingTimer();
  }

  playVideo() {
    this.cameras.main.shake(300);
    this.AudioScene.playRumble();
    this.bossLoadingVideo = this.add
      .video(this.scale.width / 2 + 20, this.scale.height / 2, "boss-loading")
      .setScale(0.7)
      .setMute(true);
    this.bossLoadingVideo.play();
  }

  createBackground() {
    let rect = new Phaser.Geom.Rectangle(0, 0, 1000, 1000);
    var graphics = this.add
      .graphics({
        fillStyle: { color: "#000000" },
      })
      .setDepth(0);

    graphics.fillRectShape(rect);
  }

  loadingTimer() {
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.AudioScene.stopRumble();
        this.scene.remove("BossLoading");
      },
    });
  }
}

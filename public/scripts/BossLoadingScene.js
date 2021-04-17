class BossLoadingScene extends Phaser.Scene {
  constructor() {
    super("BossLoading");
  }
  init() {}

  create() {
    this.bossLoadingVideo = this.add
      .video(this.scale.width / 2, this.scale.height / 2, "boss-loading")
      .setScale(0.5);

    this.playVideo();
  }

  playVideo() {
    this.bossLoadingVideo.play();
  }
}

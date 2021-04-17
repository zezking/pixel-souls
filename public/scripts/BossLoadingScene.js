class BossLoadingScene extends Phaser.Scene {
  init() {}

  create() {
    this.bossLoadingVideo = this.add.video(0, 0, "boss-loading");
  }

  playVideo() {
    this.bossLoadingVideo.play();
  }
}

class BossLoadingScene extends Phaser.Scene {
  constructor() {
    super("BossLoading");
  }
  init() {}

  create() {
    this.bossLoadingVideo = this.add.video(0, 0, "boss-loading");
  }

  playVideo() {
    console.log("here");
    this.bossLoadingVideo = this.add.video(0, 0, "boss-loading");
  }
}

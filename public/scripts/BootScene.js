
class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    // this.loadAudio();
    //load tilemap
    this.loadTilemap();
  }

  loadImages() {
    this.load.image('button1', '/assets/entities/blue_button01.png');
    this.load.image('button2', '/assets/entities/blue_button02.png');
    this.load.image('bottom', '/assets/map/FULLMAP_bottom.png');
    this.load.image('overlay', '/assets/map/FULLMAP_overlay.png');
    this.load.image('collision', '/assets/map/FULLMAP_collision.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('player', '/assets/sprites/PLAYER.png', { frameWidth: 32, frameHeight: 50 });
  }

  // loadAudio() {

  // }

  loadTilemap() {
    //map JSON file
    this.load.tilemapTiledJSON('map','/assets/map/Firelink_Shrine.json');
  }

  create() {
    this.scene.start('Game');
  }
}
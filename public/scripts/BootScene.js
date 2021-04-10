class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    // this.loadAudio();
    this.loadTilemap();
  }

  loadImages() {
    this.load.image('bottom', 'public/assets/map/FULLMAP_bottom.png');
    this.load.image('overlay', 'public/assets/map/FULLMAP_overlay.png');
    // this.load.image('collision', 'public/assets/map/FULLMAP_collision.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('player', 'public/assets/sprites/PLAYER.png', { frameWidth: 32, frameHeight: 50 });
    this.load.atlas('sheet', 'public/assets/map/fullmap-collision-atlas.png', 'public/assets/map/fullmap-collision-atlas_atlas.json');
    this.load.spritesheet('skele', 'public/assets/skele_sprites/skele_idle.png', { frameWidth: 32, frameHeight: 32 });
  }

  // loadAudio() {

  // }

  loadTilemap() {
    //bottom/overlay map JSON file
    this.load.tilemapTiledJSON('map','public/assets/map/Firelink_Shrine.json');
    //collision map JSON file
    this.load.json('shapes', 'public/assets/map/FULLMAP_collision.json');
  }

  create() {
    this.scene.start('Game');
  }
}
class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadConversations();
    this.loadTilemap();
    this.loadFont();
    this.loadVideo();
  }

  loadImages() {
    //Map elements
    this.load.image("bottom", "public/assets/map/FULLMAP_bottom.png");
    this.load.image("overlay", "public/assets/map/FULLMAP_overlay.png");
    this.load.image("bonfireFX", "public/assets/map/bonfireEffect.png");

    this.load.image(
      "saintTravis",
      "public/assets/entities/easter_eggs/saint travis.png"
    );

    this.load.image("andyHighRes", "public/assets/sprites/andy high res.png");

    this.load.image("boss_bottom", "public/assets/map/BOSSMAP_bottom.png");
    this.load.image("boss_overlay", "public/assets/map/BOSSMAP_overlay.png");

    //UI elements
    this.load.image("ui-heart-empty", "public/assets/ui/heart_empty.png");
    this.load.image("ui-heart-full", "public/assets/ui/heart_full.png");
    this.load.image("soul-counter", "public/assets/ui/soul_counter.png");
    this.load.image("estus-full", "public/assets/ui/estus_full.png");
    this.load.image("estus-half", "public/assets/ui/estus_half.png");
    this.load.image("estus-quarter", "public/assets/ui/estus_quarter.png");
    this.load.image("estus-empty", "public/assets/ui/estus_empty.png");
    this.load.image("logo", "public/assets/ui/logo.png");
    this.load.image("logoDetail", "public/assets/ui/LogoDetail.png");

    //Battle UI elements
    this.load.image("sword", "public/assets/ui/battle/sword.png");
    this.load.image("magic", "public/assets/ui/battle/magic.png");
    this.load.image("shield", "public/assets/ui/battle/shield.png");
    this.load.image("PLAYERBACK", "public/assets/sprites/PLAYERBACK.png");
    this.load.image("ui_background", "public/assets/ui/ui_background.png");
    this.load.image(
      "combat_background",
      "public/assets/map/FULLMAP_bottom.png"
    );
    this.load.image("boss_background", "public/assets/map/boss_bg.png");
    this.load.image(
      "enemy_hurt",
      "public/assets/ui/battle/hurt/enemy_hurt.png"
    );
    this.load.image(
      "player_hurt",
      "public/assets/ui/battle/hurt/player_hurt.png"
    );
    this.load.image("damage", "public/assets/ui/battle/hurt/damage.png");
    this.load.image("sword_cursor", "public/assets/ui/battle/sword_cursor.png");
    this.load.image("kana", "public/assets/ui/battle/hurt/kana.png");
    this.load.image("enemy-name", "public/assets/ui/battle/enemy-name.png");
    this.load.image(
      "skeleton-name",
      "public/assets/ui/battle/skeleton-name.png"
    );
    this.load.image("sword_chosen", "public/assets/ui/battle/sword_chosen.png");
    this.load.image(
      "shield_chosen",
      "public/assets/ui/battle/shield_chosen.png"
    );
    this.load.image("magic_chosen", "public/assets/ui/battle/magic_chosen.png");
  }

  loadSpriteSheets() {
    this.load.atlas(
      "sheet",
      "public/assets/map/fullmap-collision-atlas.png",
      "public/assets/map/fullmap-collision-atlas_atlas.json"
    );
    this.load.atlas(
      "sheet2",
      "public/assets/map/BOSSMAP_collision.png",
      "public/assets/map/BOSSMAP-collision-atlas.json"
    );

    this.load.spritesheet("bird", "public/assets/sprites/bird.png", {
      frameWidth: 128,
      frameHeight: 109,
    });

    this.load.spritesheet("reah", "public/assets/sprites/reah.png", {
      frameWidth: 23,
      frameHeight: 39,
    });

    this.load.spritesheet("andy", "public/assets/sprites/andy.png", {
      frameWidth: 48,
      frameHeight: 70,
    });

    // this.load.spritesheet("well", "public/assets/entities/well.png", {
    //   frameWidth: 88,
    //   frameHeight: 56,
    // });

    this.load.spritesheet("pillar01", "public/assets/entities/pillar01.png", {
      frameWidth: 24,
      frameHeight: 118,
    });

    this.load.spritesheet("pillar02", "public/assets/entities/pillar02.png", {
      frameWidth: 24,
      frameHeight: 148,
    });
    this.load.spritesheet(
      "eventTrigger",
      "public/assets/sprites/eventTrigger.png",
      {
        frameWidth: 5,
        frameHeight: 5,
      }
    );
  }

  loadAudio() {
    this.load.audio("menu-music", "public/assets/audio/menu_theme.mp3");
    this.load.audio("bg-music", "public/assets/audio/firelink_shrine.mp3");
    this.load.audio("start-menu", "public/assets/audio/start_menu.mp3");
    this.load.audio("died-audio", "public/assets/audio/You_Died.mp3");
    this.load.audio("battle-audio", "public/assets/audio/battle_theme.mp3");
    this.load.audio("new-area", "public/assets/audio/new_area.mp3");
    this.load.audio("soul-get", "public/assets/audio/soul-get.wav.mp3");
    this.load.audio("hit", "public/assets/audio/hitsfx.mp3");
    this.load.audio("atk", "public/assets/audio/attacksfx.mp3");
    this.load.audio("bonfireSFX", "public/assets/audio/bonfire_lit.mp3");
    this.load.audio("estusSFX", "public/assets/audio/estusSFX.mp3");
    this.load.audio("soul-suck", "public/assets/audio/soul-suck.wav.mp3");
    this.load.audio("heavenlySFX", "public/assets/audio/Heavens Choir SFX.mp3");
    this.load.audio("bossRoom", "public/assets/audio/boss_andy.mp3");
    this.load.audio(
      "bossReveal",
      "public/assets/audio/fine_della_vento_aureo_cut.mp3"
    );
    this.load.audio("rumbleSFX", "public/assets/audio/RumbleSFX.mp3");
    this.load.audio("select", "public/assets/audio/select.wav.mp3");
    this.load.audio("ok", "public/assets/audio/ok.wav.mp3");
  }

  loadVideo() {
    this.load.video(
      "boss-loading",
      "public/assets/video/andy_unrevealed.mp4",
      true
    );
  }

  loadTilemap() {
    //main map JSON files
    this.load.tilemapTiledJSON("map", "public/assets/map/Firelink_Shrine.json");
    this.load.json("shapes", "public/assets/map/FULLMAP_collision.json");

    //boss room JSON files
    this.load.tilemapTiledJSON("bossmap", "public/assets/map/Boss_Arena.json");
    this.load.json("shapes2", "public/assets/map/BOSSMAP_collision.json");
  }

  loadConversations() {
    this.load.json("dialogs", "public/assets/sprites/dialogs.json");
  }
  loadFont() {
    this.add.text(-100, -100, "preload-font", {
      fontFamily: "HonokaMincho",
      fill: "#ffffff",
    });
    this.add.text(-100, -100, "preload-font", {
      fontFamily: "titleFont",
      fill: "#ffffff",
    });
  }

  create() {
    this.scene.launch("Logo");
  }
}

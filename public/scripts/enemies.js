  
  
  // test spook skele sprite
    this.load.spritesheet("skele", "assets/character_sprites/spook_skele.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.animation('skele_anim', "assets/character_sprites/skele_idle_anim.json")

    this.skele = this.physics.add.sprite(100, 100, "skele", 5);

    this.skele.anims.play('spook_idle',true)
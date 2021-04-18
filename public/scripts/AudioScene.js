class AudioScene extends Phaser.Scene {
  constructor() {
    super("Audio");
  }
  init() {
    this.playing = false;
  }

  playMainBgm() {
    this.mainBGM = this.sound.add("bg-music", {
      volume: 0.08,
      loop: true,
    });
    this.mainBGM.play();
  }
  stopMainBgm() {
    this.mainBGM.stop();
  }

  playBattleBgm() {
    this.battleBGM = this.sound.add("battle-audio", {
      volume: 0.08,
    });
    this.battleBGM.play();
  }
  stopBattleBgm() {
    this.battleBGM.stop();
  }

  playMenuBgm() {
    this.menuBGM = this.sound.add("menu-music", {
      volume: 0.3,
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
      volume: 0.4,
    });

    this.startMenuSFX.play();
  }

  playAreaSFX() {
    this.areaSFX = this.sound.add("new-area", {
      volume: 0.09,
    });
    this.areaSFX.play();
  }

  playPlayerDmgSFX() {
    this.damagedHit = this.sound.add("hit", {
      volume: 0.08,
    });
    this.damagedHit.play();
  }

  playEnemyDmgSFX() {
    this.damagedHit = this.sound.add("atk", {
      volume: 0.08,
    });
    this.damagedHit.play();
  }

  playBonfire() {
    this.bonfireLit = this.sound.add("bonfireSFX", {
      volume: 0.04,
    });
    this.bonfireLit.play();
  }

  playEstus() {
    this.estusDrink = this.sound.add("estusSFX", {
      volume: 0.06,
    });
    this.estusDrink.play();
  }

  playSoulSucking() {
    this.soulSucking = this.sound.add("soul-suck", {
      volume: 0.04,
    });
    this.soulSucking.play();
  }

  playHeavenly() {
    this.heavenly = this.sound.add("heavenlySFX", {
      volume: 0.06,
    });
    this.heavenly.play();
  }

  playBossRoom() {
    this.bossRoomBGM = this.sound.add("bossRoom", {
      volume: 0.06,
    });
    this.bossRoomBGM.play();
  }

  stopBossRoom() {
    this.bossRoomBGM.stop();
  }

  playBossReveal() {
    this.bossRevealBGM = this.sound.add("bossReveal", {
      volume: 0.07,
      loop: true,
    });
    this.bossRevealBGM.play();
  }
  stopBossReveal() {
    this.bossRevealBGM.stop();
  }

  playRumble() {
    this.rumbleSFX = this.sound.add("rumbleSFX", {
      volume: 0.8,
      loop: true,
    });
    this.rumbleSFX.play();
  }
  stopRumble() {
    this.rumbleSFX.stop();
  }

  battleSFX() {}
}

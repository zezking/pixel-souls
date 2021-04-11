class DialogScene extends Phaser.Scene {
  constructor() {
    super("Dialog");
  }
  init(data) {
    if (Object.keys(data).length !== 0) {
      this.npcName = data.npc.texture.key;
    }
  }
  create() {
    let rect = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 200,
      this.scale.height / 2 + 200,
      500,
      300
    );
    var graphics = this.add.graphics({ fillStyle: { color: "#FFFFFF" } });

    graphics.fillRectShape(rect);
    let dialogs = this.cache.json.get("dialogs");
    if (dialogs[this.npcName]) {
      let dialogsArr = dialogs[this.npcName];
      this.add.text(
        this.scale.width / 2 - 200,
        this.scale.height / 2 + 200,
        dialogsArr[Math.floor(Math.random() * dialogsArr.length)],
        {
          fontFamily: "HonokaMincho",
          fill: "#FFFFFF",
          fontSize: "18px",
          wordWrap: { width: 400, useAdvancedWrap: true },
        }
      );
      this.input.once(
        "pointerdown",
        function () {
          this.scene.remove("Dialog");
        },
        this
      );
    }
  }

  update() {}

  updateText() {}
}

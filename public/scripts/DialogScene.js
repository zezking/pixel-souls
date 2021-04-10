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
    let dialogs = this.cache.json.get("dialogs");
    if (dialogs[this.npcName]) {
      let dialogsArr = dialogs[this.npcName];
      this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 200,
        dialogsArr[Math.floor(Math.random() * dialogsArr.length)],
        {
          font: "48px Arial",
          fill: "#FFFFFF",
          fontSize: "12px",
        }
      );
    }
  }

  update() {}

  updateText() {}
}

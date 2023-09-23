import Phaser from "../lib/phaser.js";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    preload() {
        this.load.image("bg_red", "assets/background/bg_red.png");
        this.load.image("overText", "assets/items/text_gameover.png");
    }
    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add
          .tileSprite(0, 0, 1024, 640, "bg_red")
          .setOrigin(0, 0)
          

        this.add.image(width/2, height/2,"overText");

        this.input.keyboard.once("keydown-SPACE", () => {
          this.scene.start("game");
        });

    }
}
import Phaser from "../lib/phaser.js";

const imageList = [
  { key: "background", url: "assets/background/bg_wood.png" },
  { key: "tree1", url: "assets/background/tree_oak.png" },
  { key: "targetback", url: "assets/target/target_back_outline.png" },
  { key: "target", url: "assets/target/target_red1_outline.png" },
  { key: "grass1", url: "assets/background/grass1.png" },
  { key: "grass2", url: "assets/background/grass2.png" },
  { key: "tree2", url: "assets/background/tree_pine.png" },
  { key: "water1", url: "assets/background/water1.png" },
  { key: "water2", url: "assets/background/water2.png" },
  { key: "duck", url: "assets/duck/duck_outline_target_white.png" },
  { key: "duckback", url: "assets/duck/duck_outline_back.png" },
  { key: "curtop", url: "assets/background/curtain_top.png" },
  { key: "cur", url: "assets/background/curtain.png" },
  { key: "curstraight", url: "assets/background/curtain_straight.png" },
  { key: "currope", url: "assets/background/curtain_rope.png" },
  { key: "shotL", url: "assets/gun/shot_grey_large.png" },
  { key: "gun", url: "assets/gun/rifle_red.png" },
  { key: "scope", url: "assets/gun/crosshair_outline_small.png" },
  { key: "cloud1", url: "assets/background/cloud1.png" },
  { key: "cloud2", url: "assets/background/cloud2.png" },
  { key: "icon", url: "assets/duck/icon_duck.png" },
];

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    for (const image of imageList) {
      this.load.image(image.key, image.url);
    }

    this.load.audio("gunSound", "sfx/gunsound.ogg");
    this.load.audio("lostSound", "sfx/lostSound.ogg");
  }

  create() {
    this.duckLost = 3;

    this.add
      .tileSprite(0, 0, 1024, 640, "background")
      .setOrigin(0, 0)
      .setDepth(1);

    this.cloud1 = this.add.image(300, 100, "cloud1").setDepth(2);

    this.cloud2 = this.add.image(600, 120, "cloud2").setDepth(2);

    this.tree1 = this.add.image(130, 245, "tree1").setDepth(2);

    // this.target = this.physics.add.sprite(100, 100, "target");
    //create target

    this.grass1 = this.add
      .tileSprite(0, 340, 1024, 180, "grass1")
      .setOrigin(0, 0)
      .setDepth(3);

    this.tree2 = this.add.image(900, 340, "tree2").setDepth(4);

    this.water1 = this.add
      .tileSprite(0, 400, 1024, 180, "water1")
      .setOrigin(0, 0)
      .setDepth(5);

    this.water2 = this.add
      .tileSprite(0, 440, 1024, 180, "water2")
      .setOrigin(0, 0)
      .setDepth(6);

    this.curstraight = this.add
      .tileSprite(0, 560, 1024, 250, "curstraight")
      .setOrigin(0, 0)
      .setDepth(7);

    this.cur = this.add.image(100, 360, "cur").setDepth(8).setScale(1.7);
    this.cur2 = this.add.image(924, 360, "cur").setDepth(8).setScale(-1.7, 1.7);

    this.curtop2 = this.add
      .tileSprite(100, 0, 1024, 63, "curtop")
      .setOrigin(0, 0)
      .setDepth(9);

    this.curtop = this.add
      .tileSprite(0, 0, 1024, 63, "curtop")
      .setOrigin(0, 0)
      .setDepth(9);

    this.gun = this.add
      .image(100, 360, "gun")
      .setOrigin(-0.5, -0.3)
      .setDepth(10);
    this.scope = this.add.image(200, 150, "scope").setDepth(10).setScale(0.7);

    const slowDownFactor = 0.5;
    this.input.on("pointermove", (pointer) => {
      this.scope.x = pointer.x;
      this.scope.y = pointer.y;
      this.gun.x = pointer.x;
    });

    //create target
    this.targets = this.physics.add.group();

    this.createTarget();

    this.input.on("pointerdown", this.handleShot, this);
  }

  createTarget() {
    let distanceBetweenTargets = 0;

    for (let i = 0; i < 4; i++) {
      /**  @type {Phaser.Physics.Arcade.Group} */
      const target = this.targets.create(
        distanceBetweenTargets,
        Phaser.Math.Between(300, 400),
        "duck"
      );
      target.setDepth(4);
      target.setVelocity(200, 0, 10);

      distanceBetweenTargets += Phaser.Math.Between(100, 200);
    }
  }

  handleShot(pointer) {
    this.targets.getChildren().forEach((target) => {
      if (
        Phaser.Geom.Rectangle.ContainsPoint(
          target.getBounds(),
          pointer.position
        )
      ) {
        target.destroy();
        this.sound.play("gunSound");
      }
    });
  }

  checkTarget() {
    const currentTargets = this.targets.getChildren();

    if (currentTargets.length === 0) {
      this.createTarget();
    }
  }

  update() {
    const speedX = 0.5;

    this.grass1.tilePositionX -= speedX;
    this.water1.tilePositionX += speedX;
    this.water2.tilePositionX -= speedX;

    this.targets.children.iterate((target) => {
      if (target.x > this.scale.width) {
        target.destroy();
        this.duckLost -= 1;
        this.sound.play("lostSound");
      }
    });

    this.checkTarget();

    if (this.duckLost === 0) {
      this.scene.start("game-over");
    }
  }
}

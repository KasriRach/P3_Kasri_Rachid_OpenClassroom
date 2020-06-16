class Canvas {
  constructor() {
    //console.log("Canvas");
    this.canvas = document.querySelector("canvas");
    this.cleanCanvas = document.getElementById("nettoyer");
    this.ctx = this.canvas.getContext("2d");
    this.controlMouse();
    this.btnCleaning();
    this.cleaning();
  }

  startPosition() {
    this.drawing = true;
  }

  finishedPosition() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  draw(e) {
    if (!this.drawing) return;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
  }

  cleaning() {
    this.ctx.clearRect(0, 0, 350, 300);
  }

  controlMouse() {
    this.canvas.addEventListener("mousedown", function () {
      canvas.startPosition();
    });

    this.canvas.addEventListener("mousemove", function (e) {
      canvas.draw(e);
    });

    this.canvas.addEventListener("mouseup", function () {
      canvas.finishedPosition();
    });
  }

  btnCleaning() {
    let nettoyer = document.getElementById("nettoyer");
    nettoyer.addEventListener("click", function () {
      canvas.cleaning();
    });
  }
}

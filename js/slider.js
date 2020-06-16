/*ce constructeur aura besoin de 2 paramêtre de départ pour que l'objet puisse fonctionner :
 l'Id de l'élement html mais aussi la liste des images du slider.*/
class Slider {
  constructor(id, imgs) {
    //console.log("Slider");
    this.idslide = id;
    this.imgs = imgs;

    this.slide = document.getElementById(this.idslide);
    this.img = this.slide.querySelector("img");
    this.prev = this.slide.querySelector("div #prevBtn");
    this.next = this.slide.querySelector("div #nextBtn");
    this.pause = this.slide.querySelector("div #pauseBtn");

    this.timer = null;

    this.imgnumber = 0;

    this.gestionEvenement();
    this.playPause();
  }

  /* Fonction bouton prev */
  prevImage() {
    this.imgnumber--;
    if (this.imgnumber < 0) {
      this.imgnumber = this.imgs.length - 1;
    }
    this.img.src = this.imgs[this.imgnumber];
  }

  /* fonction bouton next */
  nextImage() {
    this.imgnumber++;
    if (this.imgnumber > this.imgs.length - 1) {
      this.imgnumber = 0;
    }
    this.img.src = this.imgs[this.imgnumber];
  }

  /* Fonction clavier */
  keyboard(e) {
    switch (e.keyCode) {
      case 37: // left
        this.nextImage();
        break;
      case 39: // right
        this.prevImage();
        break;
      case 32: // space (or any key)
        this.playPause();
        break;
    }
  }
  // Gestionnaires d'événements et Action !
  gestionEvenement() {
    this.slide.addEventListener("keydown", (e) => {
      this.keyboard(e);
    });

    this.prev.addEventListener("click", () => {
      this.prevImage();
    });

    this.next.addEventListener("click", () => {
      this.nextImage();
    });

    this.pause.addEventListener("click", () => {
      this.playPause();
    });
  }
  /* Fonction slider auto + bouton play / pause */
  playPause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.pause.className = "fas fa-play";
    } else {
      this.timer = setInterval(() => {
        this.nextImage();
      }, 2000);
      this.pause.className = "fas fa-pause-circle";
    }
  }
}

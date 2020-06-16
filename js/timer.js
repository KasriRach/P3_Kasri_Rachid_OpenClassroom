class Timer {
  constructor(minutes, seconds) {
    this.boutValider = document.getElementById("valid");
    this.annuler = document.getElementById("annuler");
    this.timer = document.getElementById("timer");
    this.nettoyer = document.getElementById("nettoyer");
    this.container = document.getElementById("container-canvas");
    this.click(minutes, seconds);

    this.compteur = 0;
  }

  countdown(minutes, seconds = 60) {
    this.seconds = seconds;
    this.mins = minutes;
  }
  temps() {
    this.seconds--;

    let current_minutes = this.mins - 1;
    sessionStorage.setItem("seconds", this.seconds);
    sessionStorage.setItem("mins", this.mins);

    document.getElementById("timer").innerHTML =
      "Vélo disponible à cette adresse : " +
      "<br> " +
      sessionStorage.getItem("station", info.address) +
      "<br> " +
      " Il vous reste " +
      current_minutes +
      " min " +
      ": " +
      (this.seconds < 10 ? "0" : "") +
      this.seconds +
      " s";

    if (this.seconds > 0) {
      this.compteur = setTimeout(() => {
        this.temps();
      }, 1000);
    } else {
      if (this.mins > 1) {
        this.countdown(this.mins - 1);
        setTimeout(() => {
          this.temps();
        }, 1000);
      }
    }
    if (this.seconds === 0) {
      clearTimeout(this.temps);
      timer.innerHTML = "temps écoulé";
      console.log("temps écoulé");
      sessionStorage.clear();
    }
  }
  click(minutes, seconds) {
    this.boutValider.addEventListener("click", () => {
      document.getElementById("container-canvas").style.display = "block";
      document.getElementById("nettoyer").style.display = "none";
      document.getElementById("annuler").style.display = "block";

      clearInterval(this.compteur);
      this.mins = minutes = 20;
      this.seconds = seconds = 60;
      this.countdown(minutes, seconds);
      this.temps();
    });

    this.annuler.addEventListener("click", () => {
      let nomPrenom = localStorage.getItem("nom");
      clearTimeout(this.countdown);
      clearTimeout(this.compteur);
      sessionStorage.clear();
      this.mins = minutes;
      this.seconds = 10;

      document.getElementById("container-canvas").style.display = "block";
      alert("Votre réservation est annulée.");

      document.getElementById("timer").style.display = "none";
      document.getElementById("resannulee").style.display = "block";
    });
  }
}

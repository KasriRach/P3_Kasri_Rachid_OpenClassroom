let slide = new Slider("slider", ["1a.jpg", "2a.jpg", "3a.jpg", "4a.jpg"]);
let maCarte = new MyMap();

let canvas = new Canvas();

let minutes = sessionStorage.getItem("mins");
let seconds = sessionStorage.getItem("seconds");

nom.value = localStorage.getItem("nom");
nom.oninput = () => {
  localStorage.setItem("nom", nom.value);
};
prenom.value = localStorage.getItem("prenom");
prenom.oninput = () => {
  localStorage.setItem("prenom", prenom.value);
};

if (minutes && seconds) {
  let timer = new Timer(minutes, seconds);
  timer.countdown(minutes, seconds);
  timer.temps();
} else {
  let timer = new Timer(20, 60);
}

class MyMap {
  constructor() {
    //console.log("Mymap");
    this.maCarte;
    this.afficherCarte();
    this.chargerApi();
    this.marker;
    this.info;
  }
  afficherCarte() {
    this.maCarte = L.map("maCarte").setView([47.218371, -1.553621], 15);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 20,
    }).addTo(this.maCarte);
  }

  chargerApi() {
    let url =
      "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=796897ce14b432e0862624913abb17a0d1ca130c";
    ajaxGet(url, (resp) => {
      // On récupère les éléments du fichier JSON sous forme de tableau.
      let stations = JSON.parse(resp);
      // Création d'une boucle permettant la récupération de certains éléments du fichier JSON

      stations.forEach((info) => {
        let marker = L.marker([info.position.lat, info.position.lng], {
          jcdecauxInfo: info,
        }); //on stocke ici toutes les infos
        //on ajoute une option au marker ici "jcdecauxInfo"
        //console.log(marker);

        marker
          .addEventListener("click", this.detailStation) //fonction d'appel sur le clikc
          .bindPopup(
            "<b>" +
              info.name +
              "</b><br>" +
              info.address +
              "<br>" +
              info.available_bikes +
              " vélos disponinbles"
          );
        marker.addTo(this.maCarte);
      });
    });
  }
  detailStation(e) {
    // récupération  du marker concerné
    let marker = e.target;
    // récupération  des infos
    let info = marker.options.jcdecauxInfo;

    const nom = document.getElementById("name-data");
    nom.innerHTML = info.name;

    const adresse = document.getElementById("address-data");
    adresse.innerHTML = info.address;
    //console.log('info.address:', info.address)

    const statut = document.getElementById("statut-data");
    statut.innerHTML = info.status;

    const veloDispo = document.getElementById("velo-data");
    veloDispo.innerHTML = info.available_bikes;

    let reserver = document.getElementById("reserver");
    let canvas = document.getElementById("canvas");
    let canvasbtn = document.getElementById("canvasbtn");
    let signer = document.getElementById("signer");

    this.info = info;

    //Gestion du click sur "reserver"
    reserver.addEventListener("click", () => {
      //si la disponibilité est >= 1 et le statut ouvert.
      if (this.info.available_bikes >= 1 && this.info.status === "OPEN") {
        document.getElementById("canvas").style.display = "block";
        document.getElementById("canvasbtn").style.display = "block";
        document.getElementById("signer").style.display = "block";

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");

        if (!nom.value) {
          //Si l'utilisateur n'a pas rempli le champ
          alert("Entrez un nom");
          document.getElementById("canvas").style.display = "none";
          document.getElementById("canvasbtn").style.display = "none";
          document.getElementById("signer").style.display = "none";
          return;
        }
        if (!prenom.value) {
          //Si l'utilisateur n'a pas rempli le champ
          alert("Entrez un prénom");
          document.getElementById("canvas").style.display = "none";
          document.getElementById("canvasbtn").style.display = "none";
          document.getElementById("signer").style.display = "none";
          return;
        }

        // stocke le nom entré dans le stockage Web

        localStorage.setItem("prenom", document.getElementById("prenom").value);
        localStorage.setItem("nom", document.getElementById("nom").value);
        console.log(localStorage.getItem("nom"));
        console.log(localStorage.getItem("prenom"));

        // On enregistre la station dans le session Storage
        sessionStorage.setItem("station", info.address);
        console.log(sessionStorage.getItem("station"));
        //console.log('info.address:', info.address)
      }
    });
  }
}

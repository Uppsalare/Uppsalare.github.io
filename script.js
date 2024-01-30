// --------------------------- Placeringar poäng ------------------------------
var scoreSystem;
var listScore = [];

// Funktion för att läsa JSON-data från en fil
function loadJSONToScoreSystem(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "json_files/scoreSystem.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Konvertera JSON-strängen till ett JavaScript-objekt
      var data = JSON.parse(xobj.responseText);
      // Anropa callback-funktionen och skicka med datan
      callback(data);
    }
  };
  xobj.send(null);
}

// Funktion för att skapa tabell från JSON-data
function createScoreSystem(data) {
  var table = document
    .getElementById("scoreSystem")
    .getElementsByTagName("tbody")[0];

  // Skapa en rad i tabellen för varje objekt i JSON-data
  for (var i = 0; i < data.length; i++) {
    var newRow = table.insertRow(table.rows.length);

    // Loopa igenom varje egenskap i objektet och lägg till i tabellen
    for (var prop in data[i]) {
      var cell = newRow.insertCell();
      cell.textContent = data[i][prop];
    }
  }

  for (let index = 0; index < data.length; index++) {
    listScore.push(data[index].Poäng);
  }
}

function getScore(placering) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].Placering === placering) {
      return data[i].Poäng;
    }
  }
  return null;
}

function openJsonEditor() {
  // Skicka JSON-data till den andra sidan via URL-parametrar
  window.location.href = 'jsonEditor.html';
}

// Skapa en tom lista för spelare
const playerList = [];

// Funktion för att läsa in och behandla JSON-data
async function loadPlayersFromJson() {
  try {

    const storedList = localStorage.getItem('editedJsonData');
    const parsedList = JSON.parse(storedList);

    if (parsedList) {
      // Gör något med listan, t.ex. logga den
      console.log(parsedList);
    } else {
      console.log('Listan är tom eller finns inte i localStorage.');
    }

    // Hämta JSON-filen med fetch
    const response = await fetch("json_files/listPlayers.json");

    // Kontrollera att förfrågan lyckades (status 200)
    if (!response.ok) {
      console.log("Filen kunde inte hämtas.")
      throw new Error("Filen kunde inte hämtas.");
    }

    // Konvertera JSON till objekt
    const data = await response.json();

    // Loopa igenom varje objekt i JSON-data och skapa spelare
    data.forEach((playerData) => {
      const player = new Player(
        playerData["Namn"],
        playerData["pdgaRating"],
        playerData["antalPdga"],
        playerData["sm2022"],
        playerData["sm2023"]
      );

      // Lägg till spelaren i listan
      playerList.push(player);
    });
  } catch (error) {
    console.error("Ett fel inträffade:", error.message);
  }

  // Ful läsning att lägga in poängsystem
  playerList.sort(function (a, b) {
    var numberA =
      typeof a.getplacementSM2022() === "number"
        ? a.getplacementSM2022()
        : Number.MAX_VALUE;
    var numberB =
      typeof b.getplacementSM2022() === "number"
        ? b.getplacementSM2022()
        : Number.MAX_VALUE;

    if (numberA < numberB) {
      return -1;
    }
    if (numberA > numberB) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < playerList.length; i++) {
    if (typeof playerList[i].getplacementSM2022() === "string") {
      playerList[i].setScoreSM2022(0);
    } else {
      playerList[i].setScoreSM2022(listScore[i]);
    }
  }

  for (let i = 0; i < playerList.length; i++) {
    const newList = playerList.filter(
      (player) => player.getplacementSM2022() === i
    );

    if (newList.length > 1) {
      const total = newList.reduce(
        (sum, player) => sum + player.getScoreSM2022(),
        0
      );
      const newScore = total / newList.length;

      newList.forEach((player) => {
        player.setScoreSM2022(parseFloat(newScore.toFixed(1)));
      });
    }
  }

  playerList.sort(function (a, b) {
    var numberA =
      typeof a.getplacementSM2023() === "number"
        ? a.getplacementSM2023()
        : Number.MAX_VALUE;
    var numberB =
      typeof b.getplacementSM2023() === "number"
        ? b.getplacementSM2023()
        : Number.MAX_VALUE;

    if (numberA < numberB) {
      return -1;
    }
    if (numberA > numberB) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < playerList.length; i++) {
    if (typeof playerList[i].getplacementSM2023() === "string") {
      playerList[i].setScoreSM2023(0);
    } else {
      playerList[i].setScoreSM2023(listScore[i]);
    }
  }

  for (let i = 0; i < playerList.length; i++) {
    const newList = playerList.filter(
      (player) => player.getplacementSM2023() === i
    );

    if (newList.length > 1) {
      const total = newList.reduce(
        (sum, player) => sum + player.getScoreSM2023(),
        0
      );
      const newScore = total / newList.length;

      newList.forEach((player) => {
        player.setScoreSM2023(parseFloat(newScore.toFixed(1)));
      });
    }
  }

  playerList.forEach((player) => {
    const totalScore =
      Math.max(player.getPdgaRating() - 750,0) +
      player.getnumberOfPDGAComp() * 5 +
      player.getScoreSM2022() +
      player.getScoreSM2023();
    player.setTotalScore(totalScore);
    });

//-----------------Sortera efter total rank---------------------
playerList.sort(function (a, b) {
    var numberA =
      typeof a.getTotalScore() === "number"
        ? a.getTotalScore()
        : Number.MIN_VALUE;
    var numberB =
      typeof b.getTotalScore() === "number"
        ? b.getTotalScore()
        : Number.MIN_VALUE;

    if (numberA < numberB) {
      return 1;
    }
    if (numberA > numberB) {
      return -1;
    }
    return 0;
  });

// Hämta referensen till tabellen med id "mytable"
const table = document.getElementById("myTable");

// Loopa genom varje spelare och skapa en rad för varje spelare i tabellen
for (let i = 0; i < playerList.length; i++) {
    const player = playerList[i];

    // Skapa en ny rad (tr)
    const row = table.insertRow();

    // Skapa celler och lägg till data för varje attribut i varje cell
    const cell1 = row.insertCell(0);
    cell1.textContent = player.getName();

    const cell2 = row.insertCell(1);
    cell2.textContent = player.getPdgaRating() + " (" + (player.getPdgaRating() - 750) + ")";

    const cell4 = row.insertCell(2);
    cell4.textContent =  player.getnumberOfPDGAComp()+" " + " (" + player.getnumberOfPDGAComp()* 5 + ")";

    const cell5 = row.insertCell(3);
    cell5.textContent = player.getplacementSM2022();

    const cell6 = row.insertCell(4);
    cell6.textContent = player.getScoreSM2022();

    const cell7 = row.insertCell(5);
    cell7.textContent = player.getplacementSM2023();

    const cell8 = row.insertCell(6);
    cell8.textContent = player.getScoreSM2023();

    const cell9 = row.insertCell(7);
    cell9.textContent = player.getTotalScore();
}
}

function filterPlayersByPlacement(players, placement) {
  return players.filter((player) => player.placement === placement);
}

function printoutAllPlayers(playerList) {
  playerList.forEach((player) => {
    console.log(player.getInfoAboutPlayer());
  });
}

// Anropa funktionen för att läsa in spelare från JSON
loadPlayersFromJson();

// Läs in JSON-filen och skapa tabell
loadJSONToScoreSystem(function (response) {
  createScoreSystem(response);
});

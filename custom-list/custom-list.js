let playerList = [];

  // Ladda tidigare sparad lista när sidan startar
  window.onload = () => {
    const saved = localStorage.getItem('pdgaPlayerList');
    if (saved) {
      playerList = JSON.parse(saved);
      renderPlayerList();
    }
  };

  async function getPlayerData() {
    const playerId = document.getElementById('playerId').value.trim();
    const resultDiv = document.getElementById('result');

    if (!playerId) {
      resultDiv.textContent = '❗ Skriv in ett spelarnummer först.';
      return;
    }

    resultDiv.textContent = '🔄 Hämtar data...';

    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = `https://www.pdga.com/player/${playerId}`;

    try {
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const data = await response.json();

      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      const nameElement = doc.querySelector('h1.page-title, h1.title');
      const ratingElement = doc.querySelector('li.current-rating');

      const name = nameElement?.textContent.trim().replace(/\s+/g, ' ');
      const ratingText = ratingElement?.textContent.trim();
      const cleanWords = ratingText.split(" ");
      const rating = cleanWords[2];

      if (name && ratingText) {
        resultDiv.textContent = `👤 Namn: ${name}\n🎯 Rating: ${ratingText}`;

        // Kolla om spelaren redan finns i listan
        const exists = playerList.find(player => player.name === name);
        if (!exists) {
          playerList.push({ name, rating });
          playerList.sort((a, b) => b.rating - a.rating);
          saveList();
          renderPlayerList();
        } else {
          resultDiv.textContent += `\n✅ Redan i listan.`;
        }
      } else if (name) {
        resultDiv.textContent = `👤 Namn: ${name}\n⚠️ Ingen rating hittad.`;
      } else {
        resultDiv.textContent = '❌ Spelare hittades inte eller sidan är ändrad.';
      }
    } catch (error) {
      resultDiv.textContent = '🚫 Fel vid hämtning av data eller rating saknas.';
      console.error(error);
    }
  }

  function renderPlayerList() {
    const listDiv = document.getElementById('playerList');
  
    if (playerList.length === 0) {
      listDiv.innerHTML = '';
      return;
    }
  
    // Sortera innan rendering, säkerställer rätt ordning även efter laddning
    playerList.sort((a, b) => b.rating - a.rating);
  
    let tableHTML = `
      <h2>📝 Din lista</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Namn</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          ${playerList.map((player, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${player.name}</td>
              <td>${player.rating}</td>
              <td>
              <button onclick="removePlayer(${index})" style="font-size: 0.9rem; padding: 0.25rem 0.5rem; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Ta bort
              </button>
            </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <button onclick="clearList()" style="margin-top: 1rem; background: darkred; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
        Rensa hela listan
      </button>
    `;
  
    listDiv.innerHTML = tableHTML;
  }

  function removePlayer(index) {
    playerList.splice(index, 1);
    saveList();
    renderPlayerList();
  }

  function clearList() {
    if (confirm('Är du säker på att du vill rensa hela listan?')) {
      playerList = [];
      saveList();
      renderPlayerList();
    }
  }

  function saveList() {
    localStorage.setItem('pdgaPlayerList', JSON.stringify(playerList));
  }
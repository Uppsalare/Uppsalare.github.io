class Player {
    constructor(name, pdgaRating, numberOfPDGAComp,placementSM2024,placementSM2025) {
      this.name = name;
      this.pdgaRating = pdgaRating;
      this.numberOfPDGAComp = numberOfPDGAComp;
      this.placementSM2024 = placementSM2024;
      this.scoreSM2024 = 0;
      this.placementSM2025 = placementSM2025;
      this.scoreSM2025 = 0;
      this.totalScore=0;
    }

    // Metoder för att hämta och sätta värden för attributen
    getTotalScore() {
        return this.totalScore || 0;
      }

    setTotalScore(totalScore) {
        this.totalScore=totalScore;
    }

    getScoreSM2024() {
      return this.scoreSM2024 || 0;
    }
  
    setScoreSM2024(scoreSM2024) {
      this.scoreSM2024 = scoreSM2024;
    }

    getScoreSM2025() {
        return this.scoreSM2025 || 0;
      }
    
    setScoreSM2025(scoreSM2025) {
        this.scoreSM2025 = scoreSM2025;
      }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getPdgaRating() {
      return this.pdgaRating || 0;
    }
  
    setPdgaRating(pdgaRating) {
      this.pdgaRating = pdgaRating;
    }

    getnumberOfPDGAComp() {
        return this.numberOfPDGAComp || 0;
      }
    
    setnumberOfPDGAComp(numberOfPDGAComp) {
        this.numberOfPDGAComp = numberOfPDGAComp;
      }
  
    getplacementSM2024() {
      return this.placementSM2024 || 0;
    }
  
    setplacementSM2024(placementSM2024) {
      this.placementSM2024 = placementSM2024;
    }
    
    getplacementSM2025() {
        return this.placementSM2025 || 0;
      }
    
    setplacementSM2025(placementSM2025) {
        this.placementSM2025 = placementSM2025;
      }
    getInfoAboutPlayer() {
      return `Namn: ${this.getName()}, PDGA Rating: ${this.getPdgaRating()}, Antal Pdga tävlingar:${this.getnumberOfPDGAComp()}, placering SM 2024: ${this.getplacementSM2024()}, Poäng SM 2024: ${this.getScoreSM2024()}, placering SM 2025: ${this.getplacementSM2025()}, Poäng SM 2025: ${this.getScoreSM2025()}, Total poäng: ${this.getTotalScore()}`;
    }
  }

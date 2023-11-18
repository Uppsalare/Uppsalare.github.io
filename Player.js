class Player {
    constructor(name, pdgaRating, numberOfPDGAComp,placementSM2022,placementSM2023) {
      this.name = name;
      this.pdgaRating = pdgaRating;
      this.numberOfPDGAComp = numberOfPDGAComp;
      this.placementSM2022 = placementSM2022;
      this.scoreSM2022 = 0;
      this.placementSM2023 = placementSM2023;
      this.scoreSM2023 = 0;
      this.totalScore=0;
    }

    // Metoder för att hämta och sätta värden för attributen
    getTotalScore() {
        return this.totalScore || 0;
      }

    setTotalScore(totalScore) {
        this.totalScore=totalScore;
    }

    getScoreSM2022() {
      return this.scoreSM2022 || 0;
    }
  
    setScoreSM2022(scoreSM2022) {
      this.scoreSM2022 = scoreSM2022;
    }

    getScoreSM2023() {
        return this.scoreSM2023 || 0;
      }
    
    setScoreSM2023(scoreSM2023) {
        this.scoreSM2023 = scoreSM2023;
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
  
    getplacementSM2022() {
      return this.placementSM2022 || Number.MAX_VALUE;
    }
  
    setplacementSM2022(placementSM2022) {
      this.placementSM2022 = placementSM2022;
    }
    
    getplacementSM2023() {
        return this.placementSM2023 || Number.MAX_VALUE;
      }
    
    setplacementSM2023(placementSM2023) {
        this.placementSM2023 = placementSM2023;
      }
    getInfoAboutPlayer() {
      return `Namn: ${this.getName()}, PDGA Rating: ${this.getPdgaRating()}, Antal Pdga tävlingar:${this.getnumberOfPDGAComp()}, placering SM 2022: ${this.getplacementSM2022()}, Poäng SM 2022: ${this.getScoreSM2022()}, placering SM 2023: ${this.getplacementSM2023()}, Poäng SM 2023: ${this.getScoreSM2023()}, Total poäng: ${this.getTotalScore()}`;
    }
  }
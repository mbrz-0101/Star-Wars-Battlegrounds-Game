function playStarWarsBattlegrounds() {

  class Fighter {
    constructor(name, imgSrc, health = 100, attack = 10, defense = 15) {
      this.name = name;
      this.imgSrc = imgSrc;
      this.health = health;
      this.attack = attack;
      this.defense = defense;
    }
  }

  const windu = new Fighter("Mace Windu", "assets/images/mace-windu.png");
  const luke = new Fighter("Luke Skywalker", "assets/images/luke-skywalker.jpg");
  const obiwan = new Fighter("Obi-wan Kinobi", "assets/images/obi-wan.jpg");
  const solo = new Fighter("Han Solo", "assets/images/han-solo.jpg");
  const rey = new Fighter("Rey", "assets/images/rey.jpg");
  const finn = new Fighter("Finn", "assets/images/finn.jpg");
  const maul = new Fighter("Darth Maul", "assets/images/darth-maul.jpg");
  const vader = new Fighter("Darth Vader", "assets/images/darth-vader.jpg");
  const palpatine = new Fighter("Emperor Palpatine", "assets/images/emperor-palpatine.jpg");
  const snoke = new Fighter("Dark Lord Snoke", "assets/images/snoke.jpg");
  const kylo = new Fighter("Kylo Ren", "assets/images/kylo-ren.jpg");
  const dooku = new Fighter("Count Dooku", "assets/images/count-dooku.jpg");

  let charactersObject = {
    "windu": windu,
    "luke": luke,
    "obiwan": obiwan,
    "solo": solo,
    "rey": rey,
    "finn": finn,
    "maul": maul,
    "vader": vader,
    "palpatine": palpatine,
    "snoke": snoke,
    "kylo": kylo,
    "dooku": dooku
  };
  console.log(charactersObject);

  let attacker, defender;

  // Set fighter imamges and names to null
  $("#jedi-fighter-image").attr("src", "https://placehold.it/600x600");
  $("#jedi-fighter-name").text("");
  $("#sith-fighter-image").attr("src", "https://placehold.it/600x600");
  $("#sith-fighter-name").text("");

  // Set background hover on character selection images
  $("#character-selection-section").find("img").on('mouseenter', highlightImage);
  $("#character-selection-section").find("img").on('mouseleave', removeImageHighlight);

  // Set fighter image on character selection
  $("#character-selection-section").find("img").on('click', moveCharacterImgToFighterSpace);


  function highlightImage(event) {
    $(event.target).attr("class", "active");

  }
  function removeImageHighlight(event) {
    $(event.target).removeAttr("class");
  }
  function moveCharacterImgToFighterSpace(event) {
    let chosenCharacter = charactersObject[$(event.target)[0].id];

    console.log(chosenCharacter);


    
  }
























  
}
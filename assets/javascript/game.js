function playStarWarsBattlegrounds() {

  class Fighter {
    constructor(varName, name, imgSrc, jedi = true, health = 100, baseAttack = 10, attack = 10, counterAttack = 5) {
      this.varName = varName;
      this.name = name;
      this.imgSrc = imgSrc;
      this.jedi = jedi;
      this.health = health;
      this.baseAttack = baseAttack;
      this.attack = attack;
      this.counterAttack = counterAttack;
    }
  }

  const windu = new Fighter("windu", "Mace Windu", "assets/images/mace-windu.png", true, 50, 5, 5, 2);
  const luke = new Fighter("luke", "Luke Skywalker", "assets/images/luke-skywalker.jpg", true, 70, 15, 15, 10);
  const obiwan = new Fighter("obiwan", "Obi-wan Kinobi", "assets/images/obi-wan.jpg", true, 60, 10, 10, 7);
  const solo = new Fighter("solo", "Han Solo", "assets/images/han-solo.jpg", true, 55, 7, 7, 4);
  const rey = new Fighter("rey", "Rey", "assets/images/rey.jpg", true, 75, 15, 5, 12);
  const finn = new Fighter("finn", "Finn", "assets/images/finn.jpg");
  const maul = new Fighter("maul", "Darth Maul", "assets/images/darth-maul.jpg", false);
  const vader = new Fighter("vader", "Darth Vader", "assets/images/darth-vader.jpg", false);
  const palpatine = new Fighter("palpatine", "Emperor Palpatine", "assets/images/emperor-palpatine.jpg", false);
  const snoke = new Fighter("snoke", "Dark Lord Snoke", "assets/images/snoke.jpg", false);
  const kylo = new Fighter("kylo", "Kylo Ren", "assets/images/kylo-ren.jpg", false);
  const dooku = new Fighter("dooku", "Count Dooku", "assets/images/count-dooku.jpg", false);

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

  let attacker, defender;

  let defenderHistory = [];


  // Set fight function for Attack! button
  $("#attack-button").on('click', fight);

  // Hide battle log space until character is selected 
  $("#battle-log").hide();
  $("#attack-button").hide();

  // Set background hover on character selection images
  $("#character-selection-section").find("img").on('mouseenter', highlightImage);
  $("#character-selection-section").find("img").on('mouseleave', (removeImageHighlight));

  // Set fighter image on character selection
  $("#character-selection-section").find("img").on('click', moveCharacterToAttackerSpace);

  // Hide select button after character is picked
  $("#character-select-button").on('click', hideSelectButton);

  $("#next-opponent-button").on('click', selectNextOpponent);


  function highlightImage(event) {
    let parent = $(event.target).parent();
    if (parent[0].id === "jedi-images") {
      $(event.target).attr("class", "active-jedi");
    } else {
      $(event.target).attr("class", "active-sith");
    }
  }
  function removeImageHighlight(event) {
    $(event.target).removeAttr("class");
  }
  function moveCharacterToDefenderSpace(event) {
    defender = charactersObject[$(event.target)[0].id];
    defenderHistory.push(defender.varName);
    $("#select-opponent-message").text("");
    $("#sith-space").css("border", "none");
    $("#sith-space").css("background-color", "rgba(80, 80, 80, 0)");
    $("#sith-fighter-image").attr("src", defender.imgSrc);
    $("#sith-fighter-name").text(defender.name);
    $("#sith-health-points").text("HP: " + defender.health);
    $("#character-select-button").unbind("click");
    $("#character-select-button").on('click', () => {
      $("#character-select-button").css("display", "none");
      $("#character-selection-section").css("display", "none");
      $("#attack-button").show();
      $("#battle-log").show();
    });
  }
  function moveCharacterToAttackerSpace(event) {
    attacker = charactersObject[$(event.target)[0].id];
    $("#choose-character-message").text("");
    $("#jedi-space").css("border", "none");
    $("#jedi-space").css("background-color", "rgba(80, 80, 80, 0)");
    $("#jedi-fighter-image").attr("src", attacker.imgSrc);
    $("#character-select-button").show();
    $("#jedi-fighter-name").text(attacker.name);
    $("#jedi-health-points").text("HP: " + attacker.health);
    if (!attacker.jedi) {
      $("#jedi-space").find("img").css("box-shadow", "3px 3px 1em red, -3px -3px 1em red");
      $("#sith-space").find("img").css("box-shadow", "3px 3px 1em blue, -3px -3px 1em blue");
      $("#vs-box").css("background-image", "url('assets/images/crossed-lightsabers.png')");
      
    } else {
      $("#jedi-space").find("img").css("box-shadow", "3px 3px 1em blue, -3px -3px 1em blue");
      $("#sith-space").find("img").css("box-shadow", "3px 3px 1em red, -3px -3px 1em red");
      $("#vs-box").css("background-image", "url('assets/images/crossed-lightsabers-2.png')");
    }
  }
  function hideSelectButton(event) {
    if (attacker.jedi) {
      $("#jedi-section").css("visibility", "hidden");
      $("#sith-section").find("img").unbind('click');
      $("#sith-section").find("img").on('click', moveCharacterToDefenderSpace);
    } else if (!attacker.jedi) {
      $("#sith-section").css("visibility", "hidden");
      $("#jedi-section").find("img").unbind('click');
      $("#jedi-section").find("img").on('click', moveCharacterToDefenderSpace);
    }
    $("#select-opponent-message").css("visibility", "visible");
  }
  function fight() {
    if (attacker && defender) {    
      defender.health = defender.health - attacker.attack;
      attacker.health = attacker.health - defender.counterAttack;
      $("#jedi-health-points").text("HP: " + attacker.health);
      $("#sith-health-points").text("HP: " + defender.health);
      $("#battle-log").text("You hit " + defender.name + " for " + attacker.attack + "damage. " + defender.name + " hit you back for " + defender.counterAttack + " damage.");
      attacker.attack = attacker.attack + attacker.baseAttack;

      if (defender.health <= 0) {
        $("#attack-button").hide();
        $("#battle-log").text("You beat " + defender.name + "!!");
        $("#sith-health-points").text("HP: 0");
        $("#next-opponent-button").show();
      }
      if (attacker.health <= 0) {
        $("#attack-button").hide();
        $("#battle-log").text("You lose");
        $("#restart-button").show();
        $("#restart-button").on('click', playStarWarsBattlegrounds);
        if (defenderHistory.length === 6) {
          alert("You win! refresh the page to pick a new character and play again!");
        }
      }
    }
  }
  function selectNextOpponent() {
    $("#battle-log").text("");
    $("#battle-log").hide();
    $("#next-opponent-button").hide();
    $("character-select-button").show();
    $("#select-opponent-message").text("Choose your next opponent");
    $("#sith-space").css("border", "4px solid rgba(94, 94, 94, 0.5)");
    $("#sith-space").css("background-color", "rgba(80, 80, 80, 0.5)");
    $("#sith-fighter-image").attr("src", "");
    $("#sith-fighter-name").text("");
    $("#sith-health-points").text("");
    $("#character-select-button").show();
    $("#character-select-button").on('click', () => {
      $("#character-select-button").css("display", "none");
      $("#character-selection-section").css("display", "none");
      $("#attack-button").show();
      $("#battle-log").show();
    });
    console.log(defenderHistory);
    if (attacker.jedi) {
      $("#character-selection-section").show();
      $("#sith-section").show();
    } else if (!attacker.jedi) {
      $("#character-selection-section").show();
      $("#jedi-section").show();     
    }
    defenderHistory.forEach((element) => {
      $("#"+element).attr("class", "beaten-defenders");
    });

  }






















}

$(document).ready(function(){
	
	

  	/*message for wrong entry*/

  	var wrongEntry = "Please enter a whole number between 1 and 100."

  	/* number generator */

  	var	getNumber = function() {
  		var ranNum = Math.floor((Math.random() * 100) + 1);
  		return ranNum;
  		}

	var answer = getNumber();

	/* set guess counter to 0 */

	var numOfGuesses = 0;

	/* start new game */

	var newGame = function () {
		numOfGuesses = 0;
		$("#count").text("0");
		$(".guessBox").find("li").remove();
		getNumber();
		answer = getNumber();
		highlightGuessBox();
		$(".guess-container").hide();
		$(".hot-feedback").empty();
		$(".cold-feedback").empty();
	};

	/* focus on guess entry box */

	var highlightGuessBox = function () {
			$("#userGuess").focus().val('');
		};

	/*compare user entered number with random number */

	var runCompare = function () {
			var difference = Math.abs(userNumber - answer);
			$(".hot-feedback").empty();
			$(".cold-feedback").empty();
			if (difference == 0) {
				$(".cold-feedback").html("<p>correct!</p><img src='img/scorch-left.jpg'>");
				$(".hot-feedback").html("<img src='img/scorch-right.jpg'><p>correct!</p>");
			}
			else if (difference <= 5) {
				$(".hot-feedback").html("<img src='img/scorch-right.jpg'><p>scorching!</p>");
				highlightGuessBox();
			}
			else if (difference <= 10) {
				$(".hot-feedback").html("<img src='img/hot-right.jpg'><p>hot</p>");
				highlightGuessBox();
			}
			else if (difference <= 20) {
				$(".hot-feedback").html("<img src='img/warm-right.jpg'><p>warm</p>");
				highlightGuessBox();
			}
			else if (difference <= 50) {
				$(".cold-feedback").html("<p>cold</p><img src='img/cold-left.jpg'>");
				highlightGuessBox();
			}
			else {
				$(".cold-feedback").html("<p>frigid!</p><img src='img/frigid-left.jpg'>");
				highlightGuessBox();
			};
		};

	/*keep count of user guesses*/

	var guessCount = function () {
		numOfGuesses = numOfGuesses + 1;
		$("#count").text(numOfGuesses);
	};

	/*display numbers guessed by user*/

	var addGuess = function () {
		$(".guessBox").prepend("<li>" + userNumber + "</li>");
	};

	var userNumber;

	/*get random number to begin first game*/

	getNumber();

	/*new game handler*/

	$(".start-over").click(function(){
		newGame();
	});

	/*start game handler*/
	$(".start-button").click(function(){
  		$(".start-screen").hide();
  		$(".game-container").fadeIn(1000);
		newGame();
	});

	/*--- Display information modal box ---*/
  	$(".what-button").click(function(){
  		$(this).hide();
  		$(".start-button").hide();
    	$(".what-box").fadeIn(1000);
    	
  	});

  	/*--- Hide information modal box ---*/
  	$(".close-button").click(function(){
  		$(".what-box").hide();
  		$(".start-button").fadeIn(1000);
  		$(".what-button").fadeIn(1000);
  	});

  	/* game play on click */

	$('#guessButton').click(function(event) { 

		event.preventDefault();

		userNumber = +$('#userGuess').val();
	

		if (isNaN(userNumber)) {
			alert(wrongEntry);
			highlightGuessBox();
		}

		else if (userNumber <= 0) {
			alert(wrongEntry);
			highlightGuessBox();
		}

		else if (userNumber > 100) {
			alert(wrongEntry);
			highlightGuessBox();
		}

		else if ((userNumber%1) != 0) {
			alert(wrongEntry);
			highlightGuessBox();	
		}

		else {
			$(".guess-container").show();
			guessCount();
			addGuess();
			runCompare();
		}
	});
	
});



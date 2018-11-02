var triviaQuestions = [{
    question: "Who said the following: Nine companions. So be it. You shall be the fellowship of the ring.",
    answerList: ["Elrond", "Gandalf", "Aragorn", "Celeborn"],
    answer: 0
},
{
    question: "How many Rings of Power were forged in the second age?",
    answerList: ["1", "19", "20", "14"],
    answer: 2
},
{
    question: "What gift does Galadriel give Gimli?",
    answerList: ["Elvish rope", "Three strands of her hair", "A pint crafted from wood", "A dagger"],
    answer: 1
},
{
    question: "What was Gollum’s hobbit name?",
    answerList: ["Deagol", "Bandobras", "Smeagol", "Tobold"],
    answer: 2
},
{
    question: "Who said the following: I don't know half of you half as well as I should like, and I like less than half of you half as well as you deserve.",
    answerList: ["Gandalf", "Merry", "Pippin", "Bilbo"],
    answer: 3
},
{
    question: "Who is Shelob?",
    answerList: ["An ent that befriends Pippin and Merry", "A beastly spider that tries to eat Frodo and Sam", "An elf queen", "A Uruk-hai leader"],
    answer: 1
},
{
    question: "Why can Arwen choose a mortal life?",
    answerList: ["Her immortality is tied to her Evenstar necklace, which she gives away", "Galadriel, Arwen's grandmother, used Nenya to give Arewen mortality", "All elves can choose a mortal life", "Her family has human ancestry"],
    answer: 3
},
{
    question: "Who leads Frodo and Sam to Buckleberry Ferry?",
    answerList: ["Farmer Maggot", "Merry and Pippin", "Gandalf", "Bilbo"],
    answer: 0
},
{
    question: "Which hobbit stabs the Witch King?",
    answerList: ["Frodo", "Pippin", "Merry", "Sam"],
    answer: 2
},
{
    question: "Who said the following: I would have followed you, my brother...my captain...my king.",
    answerList: ["Legolas", "Pippin", "Aragorn", "Boromir"],
    answer: 3
},
{
    question: "What does Bilbo tell Gandalf the end of his book will be?",
    answerList: ["And he lived happily ever after 'til the end of his days", "And he ventured into the West", "One adventure ends and another begins", "There he went and back he goes"],
    answer: 0
},
{
    question: "Who rescues Gandalf atop the Tower Orthanc?",
    answerList: ["Aragorn, Gimli, and Legolas", "Frodo and Sam", "Gwaihir", "Gothmog"],
    answer: 2
},
{
    question: "Who becomes Sam’s wife?",
    answerList: ["Linda Proudfoot", "Primrose Cotton", "Belladonna Took", "Rosie Cotton"],
    answer: 3
},
{
    question: "What is Aragorn’s horse’s name?",
    answerList: ["Bill", "Brego", "Roheryn", "Asfaloth"],
    answer: 1
},
{
    question: "Who does Bilbo share his birthday with?",
    answerList: ["Pippin", "Smeagol", "Frodo", "Belladonna Took"],
    answer: 2
}];


var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}



$("#startBtn").on("click", function(){
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
    $('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	
    answered = true;
    //sets up new questions & answerList
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);//stopped here
        choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}


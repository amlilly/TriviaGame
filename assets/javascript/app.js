$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})


var questions = [{
    question: "Who was the first President of the United States?",
    answers: ["Thomas Jefferson", "Andrew Jackson", "George Washington", "Abraham Lincoln"],
    correctAnswer: "George Washington",
    image: "assets/images/George_Washington.jpg"
}, {
    question: "What city served as the nation's first capital?",
    answers: ["Washington D.C.", "New York City", "Boston", "Philidelphia"],
    correctAnswer: "New York City",
    image: "assets/images/Federal_Hall.jpg"
}, {
    question: "When was the Declaration of Independence signed?",
    answers: ["1812", "1786", "1800", "1776"],
    correctAnswer: "1776",
    image: "assets/images/Declaration_of_Independence.jpg"
}, {
    question: "Where was the Declaration of Indepence signed?",
    answers: ["Independence Hall", "Federal Hall", "the Capitol Building", "Trinity Church"],
    correctAnswer: "Independence Hall",
    image: "assets/images/Independence_Hall.jpg"
}, {
    question: "Which country gifted the Statue of Liberty to the United States?",
    answers: ["Italy", "Enlgand", "Spain", "France"],
    correctAnswer: "France",
    image: "assets/images/Statue_of_Liberty.jpg"
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 10,
    correct: 0,
    incorrect: 0,
    unaswered: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2>TIME REMAINING <span id='counter'>10</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
                currentQuestion].answers[i]+'">'+questions[game.
                currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 10;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unaswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
            currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unaswered+"</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].
        correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log('YOU GOT IT!');
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        $('#subwrapper').append('<img src="' + questions[game.currentQuestion].image + '" />');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("WRONG!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
            currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unaswered = 0;
        game.loadQuestion();
    }
}
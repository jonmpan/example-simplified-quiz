const { buildQuestionToSpeak } = require("./lib/util");

module.exports.function = function updateQuiz (quiz, answer) {
  const i = quiz.index;
  const correctAnswers = quiz.questions[i].correctAnswer.acceptedAnswers;
  quiz.questions[i].answer = answer;
  var correct = false;
  correctAnswers.map(o=>{
    if(o.toString().toLowerCase() == answer.toString().toLowerCase()){
      correct = true
    }
  })
  if(correct){
    quiz.questions[quiz.index].correct = true;
    quiz.textToDisplay = "Correct."
    quiz.textToSpeak = "Correct.";
    quiz.score++;
  } else {
    quiz.textToDisplay = "Incorrect. The correct answer is " + quiz.questions[i].correctAnswer.text + ".";
    quiz.textToSpeak = "Incorrect. The correct answer is " + quiz.questions[i].correctAnswer.text + ".";
  }
  if(quiz.index < quiz.questions.length - 1){
    quiz.textToDisplay += " " + quiz.questions[i+1].text;
    quiz.textToSpeak += " " + quiz.questions[i+1].text;
    quiz.index++;
  } else {
    quiz.textToDisplay += " You got " +quiz.score+ " out of " +quiz.questions.length+ " right!";
    quiz.textToSpeak += " You got " +quiz.score+ " out of " +quiz.questions.length+ " right!";
    quiz.completed = true;
  }
  return quiz;
}
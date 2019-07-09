var console = require("console");
const { buildQuizzes } = require("./lib/util.js");

exports.function = function(searchTerm) {
  const quizzes = buildQuizzes(searchTerm);
  if (quizzes.length) {
    return quizzes;
  } else {
    return buildQuizzes();
  }
};

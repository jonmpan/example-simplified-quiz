## To do:

- [x] Find quiz by tag
- [x] Select quiz by NL tag utterance
- [x] More training
- [ ] Test more for bugs
- [x] Error handling (noResult dialogs, etc)
- [ ] Make a real readme
- [ ] Update readme

## Example Update to the Documentation:

A quiz is located by name or keyword using the FindQuiz action. The StartQuiz action is the heart of the Quiz capsule:

```
action (StartQuiz) {
  description (Keep prompting the user for answers until quiz is completed.)
  type (Calculation)
  collect {
    input (quiz) {
      type (Quiz)
      min (Required) max (One)
      default-init {
        intent {
          goal: FindQuiz
        }
      }
      validate {
        if (!quiz.completed) {
          replan {
            intent {
              goal: UpdateQuiz
              value { $expr(quiz) }
            }
          }
        }
      }
    }
  }
  output (Quiz)
}
```

This demonstrates a technique for maintaining state (the current question and the correct/incorrect answers) as Bixby moves through questions.

The UpdateQuiz action updates the Quiz structure. The Quiz structure stores the state of the quiz. UpdatedQuiz is called if the quiz.completed boolean is not true.

If quiz.completed is true, StartQuiz will give you the completed quiz and you'll see your quiz's results.

If quiz.completed is false, the replan block executes UpdateQuiz, which takes state and a user's answer as inputs and outputs quiz again. StartQuiz will continue to check and run UpdateQuiz until quiz.completed is true.

The JavaScript code for UpdateQuiz in code/UpdateQuiz.js updates counters for the number of total questions answered, questions answered correctly, and the questions left, as well as setting the completed flag.

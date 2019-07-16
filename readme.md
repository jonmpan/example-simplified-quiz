## To do:

- [x] Find quiz by tag
- [x] Select quiz by NL tag utterance
- [x] More training
- [ ] Test more for bugs
- [x] Error handling (noResult dialogs, etc)
- [ ] Make a real readme
- [ ] Update readme

## Example Update to the Documentation:

### How the Capsule Works

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

### Customization

To make a new capsule based on this template, you'll have to start by updating the metadata in the capsule.bxb file. Change the capsule id from example.quiz to your team's namespace and a unique name for the capsule. If your namespace is my_team and you're making a quiz about delicious tropical fruits, you might use my_team.quiz_tropical_fruits.

You can edit dialog statements in the resources/en/dialogs/ folder. This could let you customize dialogue to give your quiz a more specific branding or personality. Dialog you write should match our Writing Dialog Design Guide.

Views are stored in resources/base/views/. If you'd like to update the existing views, read the Designing Your Capsule guide.

The training for this capsule is very simple: a handful of utterances that can be used to start a quiz (with and without an initial search term), and one utterance used at the answer prompt which is simply the answer concept itself. Depending on your quiz, you might want to add new training.

If you are not linking to images hosted externally, the local images must be in your assets/images folder. You can sort these images into further subfolders, if necessary.

The capsule could be designed to fetch the JSON array for the quiz questions and answers from an external web service rather than reading the quizzes.js file. To do this, you'll need to modify the code/FindQuiz.js file to call the external API.

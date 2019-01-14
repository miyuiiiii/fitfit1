(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
            `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
          `<label class="container"><div class="question"> <h2>${currentQuestion.question}</h2> </div></label>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "green";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Q1. What does 'Che schifo!' mean?",
      answers: {
        a: "How beautiful!",
        b: "How amazing!",
        c: "How disgusting!",
        d: "How spectacular!"
      },
      correctAnswer: "c"
    },
    {
      question: "Q2. What does 'Ick liebe Dir' mean?",
      answers: {
        a: "I am hungry.",
        b: "I love you.",
        c: "I don't like you.",
        d: "I am mad at you."
      },
      correctAnswer: "b"
    },
    {
      question: "Q3. What does 'Majide' mean?",
      answers: {
        a: "Omg really?",
        b: "How are you today?",
        c: "Oh crap.",
        d: "I don't like this."
      },
      correctAnswer: "a"
    },
    {
      question: "Q4. What does 'Chez-pas' mean?",
      answers: {
        a: "I want a drink.",
        b: "I am leaving.",
        c: "I am happy.",
        d: "I don't know."
      },
      correctAnswer: "d"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

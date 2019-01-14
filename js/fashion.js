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
      question: "Q1. In what country do people wear Kimonos?",
      answers: {
        a: "China",
        b: "Vietnam",
        c: "Japan",
        d: "Korea"
      },
      correctAnswer: "c"
    },
    {
      question: "Q2. Where do people wear the Conical hats?",
      answers: {
        a: "Laos",
        b: "Indonesia",
        c: "Vietnam",
        d: "Cambodia"
      },
      correctAnswer: "c"
    },
    {
      question: "Q3. In what country do people wear the Hanboks?",
      answers: {
        a: "Korea",
        b: "China",
        c: "Germany",
        d: "Vietnam"
      },
      correctAnswer: "a"
    },
    {
      question: "Q4. Are Saris worn in ______ in weddings?",
      answers: {
        a: "India, yes",
        b: "India, no",
        c: "South Africa, yes",
        d: "South Africa, no"
      },
      correctAnswer: "a"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

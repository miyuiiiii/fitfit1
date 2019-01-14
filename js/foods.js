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
      question: "Q1: Which would you say is not a national food of Korea?",
      answers: {
        a: "Kimchi",
        b: "Paella",
        c: "Bulgogi",
        d: "Bibimbap"
      },
      correctAnswer: "b"
    },
    {
      question: "Q2: Which one of the below is not a French dish? ",
      answers: {
        a: "Chicken Marengo",
        b: "Boule",
        c: "Hủ tiếu",
        d: "Bûche de Noël"
      },
      correctAnswer: "c"
    },
    {
      question: "Q3: Which one of the foods below belong to Vietnamese Traditional Dish?",
      answers: {
        a: "Popiah",
        b: "Sel'edka pod shuboy",
        c: "Nasi Lemak",
        d: "Tau Suan"
      },
      correctAnswer: "c"
    },
    {
      question: "Q4: Which country is Paella from?",
      answers: {
        a: "Brazil",
        b: "Spain",
        c: "The Democratic Republic of The Congo",
        d: "Laos"
      },
      correctAnswer: "b"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

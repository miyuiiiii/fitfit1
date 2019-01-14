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
            question: "Q1: In which country is the Harbin Ice Festival celebrated?",
            answers: {
                a: "Mongolia",
                b: "Switzerland",
                c: "China",
                d: "Norway"
            },
            correctAnswer: "c"
        },
        {
            question: "Q2: What is \"Holi\", a festival celebrated in India?",
            answers: {
                a: "Festival of Colors",
                b: "Festival of Foods",
                c: "Festival of Arts",
                d: "Festival of Water"
            },
            correctAnswer: "a"
        },
        {
            question: "Q3. Where is La Tomatina celebrated at?",
            answers: {
                a: "Italy",
                b: "Romania",
                c: "Spain",
                d: "Israel"
            },
            correctAnswer: "c"
        },
        {
            question: "Q4. Mardi Gras is a carnival from New Orleans. What is another way to call this carnival?",
            answers: {
                a: "Mad Monday",
                b: "Mad Friday",
                c: "Fat Tuesday",
                d: "Fat Wednesday"
            },
            correctAnswer: "c"
        }
    ];

    // display quiz right away
    buildQuiz();

    // on submit, show results
    submitButton.addEventListener("click", showResults);
})();

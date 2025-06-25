document.addEventListener('DOMContentLoaded', ()=>{

    const startBtn = document.getElementById("start-btn")
    const nextBtn = document.getElementById("next-btn")
    const restartBtn = document.getElementById("restart-btn")
    const queContainer = document.getElementById("question-container")
    const queText = document.getElementById("question-text")
    const optList = document.getElementById("choices-list")
    const resultContainer = document.getElementById("result-container")
    const scoreDis = document.getElementById("score")



    const questions = [
  {
    question: "Which method is used to add one or more elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "concat()"],
    answer: "push()"
  },
  {
    question: "What does the `splice()` method do to an array?",
    options: [
      "Removes the last element",
      "Adds/removes items at a specific index",
      "Creates a shallow copy",
      "Sorts the array alphabetically"
    ],
    answer: "Adds/removes items at a specific index"
  },
  {
    question: "Which array method returns the first element that passes a test function?",
    options: ["find()", "filter()", "map()", "forEach()"],
    answer: "find()"
  },
  {
    question: "What is the output of `[1, 2, 3].length`?",
    options: ["2", "3", "4", "undefined"],
    answer: "3"
  }
];

    let currQuesIndex = 0;
    let score = 0


    startBtn.addEventListener('click',startQuiz)

    nextBtn.addEventListener('click',()=>{
        currQuesIndex++;
        if(currQuesIndex<questions.length){
            showQuestion()
        }else{
            showResult()
        }
    })

    function startQuiz(){
        startBtn.classList.add('hidden')
        resultContainer.classList.add('hidden')
        queContainer.classList.remove('hidden')
        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add('hidden')
        queText.textContent = questions[currQuesIndex].question
        optList.innerHTML = ''
        questions[currQuesIndex].options.forEach(choice =>{
            const li = document.createElement('li')
            li.textContent = choice
            li.addEventListener('click',()=>selectAnswer(choice))
            optList.appendChild(li)
        });

        
    }

    restartBtn.addEventListener('click',()=>{
        currQuesIndex = 0;
        score = 0
        resultContainer.classList.add('hidden')
        showQuestion()
        queContainer.classList.remove('hidden')
    })

    function selectAnswer(choice){
        const corAns = questions[currQuesIndex].answer
        if(choice === corAns){
            score ++
        }
        nextBtn.classList.remove("hidden")
    }

    function showResult(){
        queContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')
        console.log(score)
        scoreDis.textContent = `${score} Out Of ${questions.length}`
    }

})
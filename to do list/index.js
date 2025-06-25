document.addEventListener('DOMContentLoaded',()=>{
    const textInp = document.getElementById("todo-input")
    const btnSend = document.getElementById("add-task-btn")
    const taskList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('task')) || []

    tasks.forEach(task => {
        renderTask(task)
    });

    btnSend.addEventListener('click',()=>{
        if(textInp.value === "") return;
        const text = textInp.value.trim()
        const newTask = {
            id: Date.now(),
            completed: false,
            text: text  
        }

        tasks.push(newTask)
        textInp.value = ""
        console.log(newTask)
        saveTask()
        renderTask(newTask)
    })

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        if(task.completed) li.classList.add("completed")
        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `


        li.addEventListener('click',(e)=>{
            if(e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask()
        })

        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation();
            tasks = tasks.filter( (t) => t.id!==task.id)
            li.remove()
            saveTask()

        })

        taskList.appendChild(li)
    }

    function saveTask(){
        localStorage.setItem('task', JSON.stringify(tasks))
    }


})
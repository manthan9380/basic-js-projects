document.addEventListener('DOMContentLoaded',()=>{
    const todoInp = document.getElementById("todo-input")
    const addTaskBtn = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('task')) || []
    
    tasks.forEach((task) => {
        renderTask(task)
    });

    addTaskBtn.addEventListener('click' ,()=>{
        const taskText =  todoInp.value.trim()
        if(taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed : false
        }

        renderTask(newTask)

        tasks.push(newTask)
        saveTask()
        todoInp.value = ""
         
    })

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute("data-id",task.id)
        if(task.completed) li.classList.add("completed");

        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `

        li.addEventListener('click' ,(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask()
        })

        li.querySelector("button").addEventListener('click',(e)=>{
            e.stopPropagation() // prevent toogle from firing
            tasks = tasks.filter(t => t.id !== task.id) 
            li.remove()
            saveTask();

        })

        todoList.appendChild(li)
    }

    function saveTask(){
        localStorage.setItem('task',JSON.stringify(tasks))
    }
})

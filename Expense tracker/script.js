
document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInp = document.getElementById("expense-name")
    const expenseAmtInp = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalAmmountDisplay = document.getElementById("total-amount")

    let expenses =  JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = 0;
    updateTotal()
    renderExpenses()

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name = expenseNameInp.value.trim()
        const amount = parseFloat(expenseAmtInp.value.trim())


        if(name !== "" && !isNaN(amount) && amount>0){
            const newExpense = {
                id : Date.now(),
                name: name,
                amount:amount,
            }

            expenses.push(newExpense)
            saveExpensesTolocal()
            renderExpenses()
            updateTotal()

            // clear input
           expenseNameInp.value = "" 
           expenseAmtInp.value = ""

        }

    })


    function renderExpenses(){
        expenseList.innerHTML = ""
        expenses.forEach(expense => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li)
        });
    }

    function calculateTotal(){
        return expenses.reduce((sum,expense)=>(sum+expense.amount) ,0)
    }

    function updateTotal(){
        totalAmount = calculateTotal()
        totalAmmountDisplay.textContent = totalAmount.toFixed(2)
    }

    function saveExpensesTolocal(){
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }

    expenseList.addEventListener('click', (e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            console.log(expenseId)
            expenses = expenses.filter(t => t.id !== expenseId)
            saveExpensesTolocal()
            renderExpenses()
            updateTotal()
        }
    })

})
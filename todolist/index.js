// View Tasks: Display a list of tasks.

// Initialize input elements
const addbtn = document.getElementById("addbtn")
const container2 = document.getElementById("Container2")
const date = new Date()

function addTodo(){
    // Initialize todolist elements

    const listContainer = document.createElement("div")
    const newTodo = document.createElement("div")
    const inputTodo = document.getElementById("inputTodo").value
    const editbtn = document.createElement("button")
    const Deletebtn = document.createElement("button")
    const checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    const fullDate = document.createElement("p");
    const checkboxdiv = document.createElement("div")

    // set class and name and textcontent
    checkboxdiv.id = "checkboxdiv"
    fullDate.innerHTML = ` ${day}/${month}/${year}`
    fullDate.id = "fullDate"
    Deletebtn.innerHTML = "🗑️"
    editbtn.innerText = "✏️"
    newTodo.className = "todoContent"
    listContainer.id = "todo"
    listContainer.classList = "todo"
    checkbox.className = "checkbox"
    editbtn.id = "editbtn"
    editbtn.className = "editbtn"
    Deletebtn.className = "deletebtn"

    newTodo.textContent = inputTodo
    // append to screen
    container2.appendChild(listContainer)
    listContainer.appendChild( checkboxdiv)
    checkboxdiv.appendChild(fullDate)
    checkboxdiv.appendChild(checkbox)
    listContainer.appendChild(newTodo)
    listContainer.appendChild(editbtn)
    listContainer.appendChild(Deletebtn)

// Edit a Task: Update the details of a task.
let clicked = false;
editbtn.addEventListener("click", () =>{        
        
        if(clicked){
            // save state
            newTodo.contentEditable = false
            newTodo.blur()
            editbtn.innerText = "✏️"
        }

        else{
            // edit state
            newTodo.contentEditable = true
            newTodo.focus()
            editbtn.innerText = "💾"
        }

        clicked = !clicked

    })


    // Delete a Task: Remove tasks from the list.
    Deletebtn.addEventListener("click", ()=>{
        listContainer.remove()
        newTodo.remove()
        editbtn.remove()
        Deletebtn.remove()
        checkbox.remove()

    })

    // CheckBox
    checkbox.addEventListener("click",()=>{
        if(checkbox.checked){
            newTodo.style.textDecoration = "line-through"        }

        else{
            newTodo.style.textDecoration = ""         }
    })

}


// Add a Task: Add new tasks with a description.

addbtn.addEventListener("click", () => {
    if(inputTodo.value  ===""){
        alert("Enter a Todo")
    }
    else{
         addTodo()
    inputTodo.value = ""
    

    }
   
})

// ADD DATE/TIME FUNTIONALITY

function datedisplay(){
    // CREATE DATE OBJECT
    // INITIALIZE
    let day = date.getDate()
    let month = date.getMonth()
    let monthsOfTheYear = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]
    let question = document.getElementById("question")
    let todaysDate = document.getElementById("date")
    const greeting = document.getElementById("Greeting")
    let dayTimes = document.getElementById("DayTimes");
    let hour = date.getHours()
    // CHECK MARIDIAM
    let maridiam = (hour >= 12) ? "PM" : "AM";
    // DATE/TIME OUTPUT TO DOM
    console.log(maridiam)
    todaysDate.innerHTML = ` ${monthsOfTheYear[month]}<br>${day}`

        if(maridiam === "PM"){
            
             dayTimes .textContent = "Good Afternoon!"
        }
    
        else{
            
            dayTimes.innerHTML = "Good Morning!"} 
}
    
    


datedisplay()

// DARK/LIGHT MODE THEME CHANGER
    // Declare the toggled variable outside the function to maintain its state
let toggled = false;

function toggletheme() {
    const themebtn = document.getElementById("toogleTheme");
    
    themebtn.addEventListener("click", () => {
        if (toggled) {
            document.body.classList.remove("dark-mode");
            themebtn.textContent = "🌑"; // Dark mode icon
        } else {
            document.body.classList.add("dark-mode");
            themebtn.textContent = "☀️"; // Light mode icon
        }

        toggled = !toggled; // Toggle the state
    });
}

toggletheme();


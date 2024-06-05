//Setting up elements from web
const todo_list = document.querySelector("#todo_container");
const add_task_button = document.querySelector("#add_task");
const todo_entry = document.querySelector("input");

//Setting up constants for Class and IDs
const TASKCLASS = "todo_item"
const DONECLASS = "done_item"


//Setting up localStorage - Do no overwrite previously set up arrays
if (localStorage.getItem("user_list") == null){
    let stored_array = {
        tasks: []
    }
    
    
    localStorage.setItem("user_list", JSON.stringify(stored_array));
}
else{
    setUpList();
}




//Add responsivness to buttons on the page
add_task_button.addEventListener("click", addTaskBttn);
//Allows user to submit by pressing the Enter Key
todo_entry.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        addTaskBttn();
    }
});


//Adds new tasks to the array in localStorage
// Calls helper function to add the task visually to the page
function addTaskBttn(){
    const stored = JSON.parse(localStorage.getItem("user_list"));

    addTasksToWeb(todo_entry.value, stored.tasks.length);

    stored.tasks.push(todo_entry.value);
    localStorage.setItem("user_list", JSON.stringify(stored)); 

    todo_entry.value=null;
}

//Marks tasks as complete by using taking advantage of different CSS styling for "incomplete" and "completed" tasks
function switchClass(event){
    if (event.target.className == TASKCLASS){
        event.target.className = DONECLASS
    }
    else if (event.target.className == DONECLASS){
        event.target.className = TASKCLASS
    }
    
}


//Deletes current task based on ID 
function deleteTasks(event){

    const to_delete = event.target.parentElement;

    //deletes the task from the localStorage array
    const index = parseInt(to_delete.id.split('_')[1]);
    const stored = JSON.parse(localStorage.getItem("user_list"));
    stored.tasks.splice(index,1);
    localStorage.setItem("user_list", JSON.stringify(stored)); 


    //deletes the element from the web
    to_delete.remove();
    
    //make sures HTML element have the proepr Index associated within the ID
    updateWebList()

}

//Updates the tasks id to match their position on the website/ the index in the array
function updateWebList(){
    
    const todo_all = todo_list.getElementsByTagName("ul");
    for (var i = 0; i < todo_all.length; i++){
        todo_all[i].setAttribute("id", "id_" + i);
    }
    
}

function setUpList(){
    const stored = JSON.parse(localStorage.getItem("user_list"));

    for (var i = 0; i< stored.tasks.length; i++){
        addTasksToWeb(stored.tasks[i], i);
    }

}

//Adds tasks to the website visually by creating HTML elements with the appropriate attributes
//Each task contains a ID that represents its index in the localStorage array
function addTasksToWeb(text, index){

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", deleteTasks);

    

    const newTask = document.createElement("ul");
    newTask.setAttribute("class", TASKCLASS);
    const taskText = document.createElement("span");
    taskText.setAttribute("class", "decorate");
    taskText.innerHTML = text;
    newTask.addEventListener("click", switchClass)


    newTask.setAttribute("id", "id_" + index);

    newTask.append(taskText);
    newTask.append(deleteButton);
    todo_list.appendChild(newTask);

    
}

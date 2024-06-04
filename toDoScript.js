const todo_list = document.querySelector("#todo_container");
const add_task_button = document.querySelector("#add_task");
const todo_entry = document.querySelector("input");

if (localStorage.getItem("user_list") == null){
    let stored_array = {
        tasks: []
    }
    
    
    localStorage.setItem("user_list", JSON.stringify(stored_array));
}
else{
    setUpList();
}


add_task_button.addEventListener("click", addTasks);

function addTasks(){

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", deleteTasks);

    const newTask = document.createElement("ul");
    newTask.setAttribute("class", "todo_item");
    newTask.innerHTML = todo_entry.value;

    const stored = JSON.parse(localStorage.getItem("user_list"));

    newTask.setAttribute("id", "id_" + stored.tasks.length);

    stored.tasks.push(todo_entry.value);
    localStorage.setItem("user_list", JSON.stringify(stored)); 

    newTask.append(deleteButton);
    todo_list.appendChild(newTask);
}


function deleteTasks(event){

    const to_delete = event.target.parentElement;
    const index = parseInt(to_delete.id.split('_')[1]);
    const stored = JSON.parse(localStorage.getItem("user_list"));


    stored.tasks.splice(index,1);
    
    localStorage.setItem("user_list", JSON.stringify(stored)); 
    to_delete.remove();
    
    updateWebList()

}

function updateWebList(){
    //TODO: REDO --> instead search for childelements to the container (the class will change for crossed out effect)
    const todo_all = document.querySelectorAll(".todo_item");
    for (var i = 0; i < todo_all.length; i++){
        todo_all[i].setAttribute("id", "id_" + i);
    }
    
}

function setUpList(){
    const stored = JSON.parse(localStorage.getItem("user_list"));

    for (var i = 0; i< stored.tasks.length; i++){
        addTasksPrivate(stored.tasks[i], i);
    }

}


function addTasksPrivate(text, index){

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", deleteTasks);

    const newTask = document.createElement("ul");
    newTask.setAttribute("class", "todo_item");
    newTask.innerHTML = text;


    newTask.setAttribute("id", "id_" + index);

    newTask.append(deleteButton);
    todo_list.appendChild(newTask);
}

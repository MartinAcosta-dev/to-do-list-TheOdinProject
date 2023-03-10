function clearForm(){
    let inputs = $("form input");

    inputs.val("");
    $("form textarea").val("");

}

function eligioProyecto(){
    if ($("#selectProjects").val() == "-------" ){
        return false
    }else{
        return true
    }
}

function colorearPrioridades(){
    let prioridades = $(".taskPriority");

    for(var i = 0; i <= prioridades.length; i++){
        let strPrioridad = prioridades.eq(i).text();

        strPrioridad = strPrioridad.split(" ")[1];
        numberPrioridad = parseInt(strPrioridad);
        
        if(numberPrioridad < 40){
            prioridades.eq(i).css("color","rgb(11, 225, 11)")
        }else if(numberPrioridad < 69){
            prioridades.eq(i).css("color","rgb(255,234,165)")
        }else{
            prioridades.eq(i).css("color","rgb(255,50,50)")
        }
    }
}


function clearList(){
    let lista = $("#list");
    lista.text("");

    let listHeader = `
    <div id="listHeader">Ordenar por prioridad: 
        <select name="" id="selectPriorityFilter">
            <option value="" selected>-</option>
            <option value="">De mayor a menor</option>
            <option value="">De menor a mayor</option>
        </select>
    </div>
    `;
    
    lista.append(listHeader);
}

function addTaskToStorage(id , titulo, descripcion, fechaFin, prioridad, proyecto){
    let arrayTask = [];
    arrayTask.push(titulo);
    arrayTask.push(descripcion);
    arrayTask.push(fechaFin);
    arrayTask.push(prioridad);
    arrayTask.push(proyecto);

    localStorage.setItem(id, arrayTask);
}

function deleteTaskFromStorage(key){
    localStorage.removeItem(key);
}

function editTask(id, titulo, descripcion, fechaFin, prioridad){
    let tarea = localStorage.setItem(parseInt(id), titulo+","+descripcion+","+fechaFin+","+prioridad+", Principal");
}

function listarTareas(proyecto){

    let lista = $("#list");
    
    clearList();

    if(proyecto==" "){
        for(let i = 1; i <= localStorage.length ; i++){
            let tarea = localStorage.getItem(i);
            tarea = tarea.split(",");
    
            if(tarea[0] !== 'proyecto'){
                let newTask = `
                <div class="task"> <div class="taskId" style="display: none"> ${i}  </div> <div class="taskTitle">${tarea[0]}</div> <div class="taskDesc">${tarea[1]}</div> <div class="taskDate">Fecha de fin: ${tarea[2]}</div> <i class="fa-solid fa-pencil"></i> <i class="fa-solid fa-trash"></i>  <div class="taskPriority">Prioridad: ${tarea[3]}</div> </div>
                `  ;
    
            
    
                lista.append(newTask);
                colorearPrioridades();
            }
        }
    }else{
        for(let i = 1; i <= localStorage.length ; i++){
            let tarea = localStorage.getItem(i);
            tarea = tarea.split(",");
    
            if(tarea[0] !== 'proyecto' && tarea[4] == proyecto){
                let newTask = `
                <div class="task"> <div class="taskId" style="display: none"> ${i}  </div> <div class="taskTitle">${tarea[0]}</div> <div class="taskDesc">${tarea[1]}</div> <div class="taskDate">Fecha de fin: ${tarea[2]}</div> <i class="fa-solid fa-pencil"></i> <i class="fa-solid fa-trash"></i>  <div class="taskPriority">Prioridad: ${tarea[3]}</div> </div>
                `  ;
    
            
    
                lista.append(newTask);
                colorearPrioridades();
            }
        }
    }
}

function listarProyectos(){
 
    
    let allProjects = `
        <option id="allProjects" selected>-------</option>
    `;

    let projects = $("#selectProjects");

    projects.text("");
    projects.append(allProjects);

    for(var i=1; i <= localStorage.length; i++){
        var proyecto = localStorage.getItem(i);
        esProyecto = proyecto.split(",")[0];
        proyecto = proyecto.split(",")[1];

        if(esProyecto == "proyecto"){
            let newProject = `<option>${proyecto}</option>`;
            projects.append(newProject);
        }
    }

    let AddNewProject = `
        <option>Add project...</option>
    `;

    projects.append(AddNewProject);
}
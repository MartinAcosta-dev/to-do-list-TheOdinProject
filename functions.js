function clearForm(){
    let inputs = $("form input");

    inputs.val("");
    $("form textarea").val("");

}



function colorearPrioridades(){
    let prioridades = $(".taskPriority");

    for(var i = 0; i <= prioridades.length; i++){
        let strPrioridad = prioridades.eq(i).text();

        strPrioridad = strPrioridad.split(" ")[1];
        numberPrioridad = parseInt(strPrioridad);
        
        if(numberPrioridad < 50){
            prioridades.eq(i).css("color","black")
        }else{
            prioridades.eq(i).css("color","red")
        }
    }
}

function addTaskToPage(nuevaTarea){
    let newTask = `
    <div class="task"> <div class="taskTitle"> > ${nuevaTarea.titulo}</div> <div class="taskDesc">(${nuevaTarea.descripcion})</div> <div class="taskDate">Fecha de fin: ${nuevaTarea.fechaFin}</div>  <div class="taskPriority">Prioridad: ${nuevaTarea.prioridad}</div> </div>
    `;

    let lista = $("#list");

    lista.append(newTask);
    colorearPrioridades();
}
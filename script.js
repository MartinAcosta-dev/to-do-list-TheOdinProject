$(document).ready(function(){
    let formulario = $("#formNewTask");
    formulario.hide();
   
    let btnAddTask = $("#btnAddTask");
    btnAddTask.button();
    btnAddTask.click(function(){

        if(formulario.css("display") == "none"){
            formulario.show("fast")
            btnAddTask.text("Cancelar");
            $("form input").eq(0).focus();
        }else{
            formulario.hide("fast")
            btnAddTask.text("+ Add Task");

            $("form input").val("");
            $("form textarea").val("");
        }    
    })

    let inputFechaFin = $("#fechaFin");
    inputFechaFin.datepicker();

    let selectProjects = $("#selectProjects");
    selectProjects.selectmenu();

    let btnAddTaskConfirm = $("#btnAddTaskConfirm");
    btnAddTaskConfirm.button();

    btnAddTaskConfirm.click(function (event) {
        event.preventDefault();
        
    });


});
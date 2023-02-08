$(document).ready(function(){

    listarTareas();
    colorearPrioridades();

    class Tarea{
        constructor(id, titulo, descripcion, fechaFin, prioridad, proyecto){
            this.id = id;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.fechaFin = fechaFin;
            this.prioridad = prioridad;
            this.proyecto = proyecto;
        }
    }

    let formulario = $("#formNewTask");
    formulario.hide();
   
    let btnAddTask = $("#btnAddTask");
    btnAddTask.button();
    let inputs = $("form input");

    btnAddTask.click(function(){
        if(formulario.css("display") == "none"){
            formulario.show("fast")
            btnAddTask.text("Cancelar");
            inputs.eq(0).focus();
        }else{
            formulario.hide("fast");
            btnAddTask.text("+ Add Task");

            clearForm();
        }    
    })

    let inputFechaFin = $("#fechaFin");
    inputFechaFin.datepicker();


    let btnAddTaskConfirm = $("#btnAddTaskConfirm");
    btnAddTaskConfirm.button();

    btnAddTaskConfirm.click(function (event) {
        event.preventDefault();
        let id = localStorage.length + 1;
        let titulo = inputs.eq(0).val();
        let descripcion = $("form textarea").val();
        let fechaFin = inputs.eq(1).val();
        let prioridad = $( "#custom-handle" ).text();
        let proyecto = "Principal";

        //Agregar nuevaTarea al localStorage o a algun array.

        addTaskToStorage(id, titulo, descripcion, fechaFin, prioridad, proyecto);

        listarTareas();

    });

    $("#slider").slider();
    var handle = $( "#custom-handle" );
    

    $( "#slider" ).slider({
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
        handle.css("color","rgb(255,255,255)");
        if(ui.value < 60){
            handle.css("backgroundColor","rgb("+( 0 + (ui.value ) )+","+ (0) +" ,"+( 255 - (ui.value) )+")");
        }else{
            handle.css("backgroundColor","rgb("+( 0 + (ui.value *2 ) )+","+ (0) +" ,"+( 255 - (ui.value * 3) )+")");
        }
      }
    });

    $("#list").sortable({
        items: ".task"
    });

    $("#listHeader").disableSelection();

    $("#list").on("click",".fa-trash",function(){
        var padre = $(this).parent();
        let taskId = padre.find(".taskId").text();

        console.log(taskId);
        padre.fadeOut();
        deleteTaskFromStorage(parseInt(taskId));
    })

    $("#list").on("click",".fa-pencil",function(){
        var padre = $(this).parent();
        let taskId = padre.find(".taskId").text();
        

        let titulo = padre.find(".taskTitle").text();
        let descripcion = padre.find(".taskDesc").text();
        let fechaFin = padre.find(".taskDate")
                            .text()
                            .split(": ")[1];
        let prioridad = padre.find(".taskPriority")
                             .text()
                             .split(" ")[1];   

        $("#dialogEditTask").dialog({
            draggable: false,
            closeOnEscape: true
        });

        $("#divEditId").text(taskId);
        $("#inputEditTitle").val(titulo);
        $("#editTask textarea").val(descripcion);
        $("#inputEditFecha").val(fechaFin);
        $("#inputEditPrioridad").val(prioridad);

    });

    let botonEditarConfirmar = $("#btnEditTaskConfirm");
    botonEditarConfirmar.button();
    botonEditarConfirmar.click(function(event){
        event.preventDefault();

        let id =  $("#divEditId").text();
        let nuevoTitulo =  $("#inputEditTitle").val();
        let nuevaDescripcion = $("#editTask textarea").val();
        let nuevaFechaFin = $("#inputEditFecha").val();
        let nuevaPrioridad = $("#inputEditPrioridad").val();

        editTask(id, nuevoTitulo, nuevaDescripcion, nuevaFechaFin, nuevaPrioridad);

        $("#dialogEditTask").dialog("close")

        listarTareas();
    });
                            
    
});
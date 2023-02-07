$(document).ready(function(){

    colorearPrioridades();

    class Tarea{
        constructor(titulo, descripcion, fechaFin, prioridad, proyecto){
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

    let selectProjects = $("#selectProjects");
    selectProjects.selectmenu();

    let btnAddTaskConfirm = $("#btnAddTaskConfirm");
    btnAddTaskConfirm.button();

    btnAddTaskConfirm.click(function (event) {
        event.preventDefault();
        let titulo = inputs.eq(0).val();
        let descripcion = $("form textarea").val();
        let fechaFin = inputs.eq(1).val();
        let prioridad = $( "#custom-handle" ).text();

        let nuevaTarea = new Tarea(titulo, descripcion, fechaFin, prioridad);

        //Agregar nuevaTarea al localStorage o a algun array.

        addTaskToPage(nuevaTarea);

        console.log(nuevaTarea)
        clearForm();

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

});
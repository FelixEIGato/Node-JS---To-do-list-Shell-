require('colors');

const inquirer = require('inquirer');
const { guardarBD, leerBD } = require('./db/guardarArchivo');
const { pause2, inquirerMenu, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helper/inquirer');
const { mostrarMenu, pausa } = require('./helper/mensajes');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async() => {
    // console.log('hola mundo');
    
    let opt = '';
    const tareas = new Tareas();

    const  tareasDB = leerBD(); 

    if( tareasDB ) {
        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    // await pause2();

    do {

        // Imprimir el menú
        opt = await inquirerMenu();
        // console.log({ opt });

        // const tareas = new Tareas();
        // const tarea = new Tarea('Comprar comida');
        // console.log(tarea);
        
        // tareas._listado[tarea.id] = tarea;

        // console.log(tareas)

        switch (opt) {
            case '1':
                
                const desc = await leerInput('Descripción:');
                // console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                // console.log(ids)
                tareas.toggleCompletadas( ids );

                break;
            
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    const ok = await confirmar('¿Estas seguro?'); 
                    
                    if( ok ) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                }
                break;
        
            default:
                break;
        }

        guardarBD( tareas.listadoArr );

        await pause2();

    }while( opt !== '0' )

    // pausa();
}

main();
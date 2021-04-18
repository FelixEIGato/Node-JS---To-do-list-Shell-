const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type : 'list',
        name : 'opcion',
        message : '¿Qué desea hacer?',
        choices : [
            {
                value : '1',
                name : ` ${'1.'.green}Crear tarea`
            },
            {
                value : '2',
                name : ` ${'2.'.green}Listar tareas`
            },
            {
                value : '3',
                name : ` ${'3.'.green}Listar tareas compleadas`
            },
            {
                value : '4',
                name : ` ${'4.'.green}Listar tareas pendientes`
            },
            {
                value : '5',
                name : ` ${'5.'.green}Completar tarea(s)`
            },
            {
                value : '6',
                name : ` ${'6.'.green}Borrar tarea`
            },
            {
                value : '0',
                name : ` ${'0.'.green} Salir`
            },
        ]
    }
];

const menu = [{
    type : 'input',
    name : 'option',
    message : `Presione ${ 'ENTER'.green } para continuar`,
}];

const inquirerMenu = async() => {

    console.clear();
    console.log('=============================='.green);
    console.log('   Seleccione una opcción '.white);
    console.log('==============================\n'.green);

    const { opcion }  = await inquirer.prompt(menuOpts);
    return opcion
}

const pause2 = async() => {
    
    console.log('\n');
    const { stop } = await inquirer.prompt(menu);
    return stop
}

const leerInput = async() => {

    const question = [
        {
            type : 'input',
            name : 'desc',
            validate( value ) {
                if(value.length === 0 ) {
                    return 'Ingrese un valor';
                }
                return true;
            } 
        }
    ];

    const {  desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => { 
        
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }

    });

    choices.unshift({
        value:'0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id }  = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async( msg ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: msg
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => { 
        
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }

    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids }  = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause2,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}